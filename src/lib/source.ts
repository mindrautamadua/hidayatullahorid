// ============================================================
// Content source — live WordPress data layer for the
// Hidayatullah (hidayatullah.or.id).
//
// Defaults to the live or.id WP REST API so the clone is populated
// with real content out of the box. Override with WORDPRESS_API_URL.
// Every getter falls back to the bundled sample (src/lib/content.ts)
// on any network/parse error so the site always renders.
// ============================================================

import {
  type Article,
  allArticles as sampleArticles,
  lead as sampleLead,
  secondaryLead as sampleSecondary,
  latest as sampleLatest,
  popular as samplePopular,
  kajian as sampleKajian,
  kajianSub as sampleKajianSub,
  antarbangsa as sampleAntarbangsa,
  columns as sampleColumns,
  khutbah as sampleKhutbah,
  tickerFallback,
  getArticleBySlug,
  getArticlesByRubrik as sampleByRubrik,
  getRelated as sampleRelated,
  getArticleBody,
  slugifyRubrik,
  slugifyAuthor,
} from "./content";

const WP =
  process.env.WORDPRESS_API_URL?.replace(/\/$/, "") ||
  "https://hidayatullah.or.id/wp-json/wp/v2";
const REVALIDATE = 600; // ISR window for posts (seconds)
const TAXONOMY_TTL = 86_400; // category-id lookups rarely change

// Category slugs that are structural, not editorial rubrics.
const GENERIC = new Set(["headline", "featured", "unggulan", "uncategorized", "sticky", "berita"]);

const khutbahAsArticle: Article = {
  slug: sampleKhutbah.slug,
  title: sampleKhutbah.title,
  excerpt: sampleKhutbah.excerpt,
  rubrik: "Khutbah",
  rubrikSlug: "khutbah",
  author: sampleKhutbah.author,
  readTime: 9,
  time: "Kamis ini",
  img: sampleKhutbah.img,
};

export type FullArticle = Article & {
  bodyHtml?: string;
  bodyParagraphs?: string[];
};

export type HomeData = {
  lead: Article;
  secondary: Article[];
  latest: Article[];
  popular: Article[];
  hikmahLead: Article;
  hikmahSub: Article[];
  antarbangsa: Article[];
  daerah: Article[];
  figur: Article[];
  khutbah: Article;
  kabar: Article[];
  columns: typeof sampleColumns;
  ticker: string[];
};

// ---------- WordPress types + mapping ----------

type WpTerm = { name: string; slug: string; taxonomy?: string };
type WpPost = {
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  _embedded?: {
    author?: { name: string }[];
    "wp:featuredmedia"?: { source_url?: string; media_details?: unknown }[];
    "wp:term"?: WpTerm[][];
  };
};

function decode(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#8217;|&#8216;|&#039;|&#39;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;|&#8212;/g, "–")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&laquo;|&raquo;/g, '"')
    .replace(/\[&hellip;\]/g, "…")
    .trim();
}

function readingTime(html: string): number {
  const words = decode(html).split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const h = Math.floor(diff / 3.6e6);
  if (h < 1) return "Baru saja";
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  if (d === 1) return "Kemarin";
  if (d < 7) return `${d} hari lalu`;
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function pickTerm(post: WpPost): WpTerm | undefined {
  const cats = (post._embedded?.["wp:term"] ?? [])
    .flat()
    .filter((t) => (t.taxonomy ?? "category") === "category");
  const meaningful = cats.filter((t) => !GENERIC.has(t.slug));
  return (
    meaningful.find((t) => t.slug !== "daerah") ?? meaningful[0] ?? cats[0]
  );
}

function mapPost(p: WpPost): FullArticle {
  const media = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const term = pickTerm(p);
  return {
    slug: p.slug,
    title: decode(p.title.rendered),
    excerpt: decode(p.excerpt?.rendered ?? "").slice(0, 240),
    rubrik: term ? decode(term.name) : "Berita",
    rubrikSlug: term?.slug,
    author: p._embedded?.author?.[0]?.name ?? "Redaksi",
    readTime: readingTime(p.content?.rendered ?? p.excerpt?.rendered ?? ""),
    time: relativeTime(p.date),
    dateISO: p.date,
    img: media ?? `https://picsum.photos/seed/hid-${p.slug}/1200/800`,
    bodyHtml: p.content?.rendered,
  };
}

async function wpGet<T>(path: string, revalidate = REVALIDATE): Promise<T> {
  const res = await fetch(`${WP}${path}`, { next: { revalidate } });
  if (!res.ok) throw new Error(`WP ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

// Resolve a category slug to its numeric id (long-cached).
async function categoryId(slug: string): Promise<number | null> {
  try {
    const cats = await wpGet<{ id: number }[]>(
      `/categories?slug=${encodeURIComponent(slug)}&_fields=id`,
      TAXONOMY_TTL,
    );
    return cats[0]?.id ?? null;
  } catch {
    return null;
  }
}

async function postsByCategory(slug: string, n = 6): Promise<Article[]> {
  const id = await categoryId(slug);
  if (!id) return [];
  try {
    const posts = await wpGet<WpPost[]>(
      `/posts?categories=${id}&per_page=${n}&_embed=1`,
    );
    return posts.map(mapPost);
  } catch {
    return [];
  }
}

async function latestPosts(n = 12): Promise<Article[]> {
  try {
    const posts = await wpGet<WpPost[]>(`/posts?per_page=${n}&_embed=1`);
    return posts.map(mapPost);
  } catch {
    return [];
  }
}

// ---------- Public API ----------

export async function getAllArticles(n = 24): Promise<Article[]> {
  const live = await latestPosts(n);
  return live.length ? live : sampleArticles;
}

export async function getArticle(slug: string): Promise<FullArticle | undefined> {
  try {
    const posts = await wpGet<WpPost[]>(
      `/posts?slug=${encodeURIComponent(slug)}&_embed=1`,
    );
    if (posts[0]) return mapPost(posts[0]);
  } catch {
    /* fall through */
  }
  const a = getArticleBySlug(slug);
  return a ? { ...a, bodyParagraphs: getArticleBody(a) } : undefined;
}

export async function getByRubrik(rubrikSlug: string): Promise<Article[]> {
  const live = await postsByCategory(rubrikSlug, 18);
  return live.length ? live : sampleByRubrik(rubrikSlug);
}

export async function getRelatedArticles(
  slug: string,
  rubrik: string,
  n = 3,
): Promise<Article[]> {
  const base = slugifyRubrik(rubrik);
  const pool = await postsByCategory(base, n + 2);
  const filtered = pool.filter((a) => a.slug !== slug).slice(0, n);
  if (filtered.length >= n) return filtered;
  return sampleRelated(slug, rubrik, n);
}

export async function getByAuthor(authorSlug: string): Promise<Article[]> {
  try {
    const users = await wpGet<{ id: number; name: string }[]>(
      `/users?slug=${encodeURIComponent(authorSlug)}&_fields=id,name`,
      TAXONOMY_TTL,
    );
    if (users[0]) {
      const posts = await wpGet<WpPost[]>(
        `/posts?author=${users[0].id}&per_page=18&_embed=1`,
      );
      if (posts.length) return posts.map(mapPost);
    }
  } catch {
    /* fall through */
  }
  const all = await getAllArticles(40);
  return all.filter((a) => slugifyAuthor(a.author) === authorSlug);
}

export async function searchArticles(q: string): Promise<Article[]> {
  const term = q.trim();
  if (!term) return [];
  try {
    const posts = await wpGet<WpPost[]>(
      `/posts?search=${encodeURIComponent(term)}&per_page=20&_embed=1`,
    );
    if (posts.length) return posts.map(mapPost);
  } catch {
    /* fall through */
  }
  const all = await getAllArticles(40);
  const t = term.toLowerCase();
  return all.filter(
    (a) =>
      a.title.toLowerCase().includes(t) ||
      a.rubrik.toLowerCase().includes(t) ||
      a.author.toLowerCase().includes(t) ||
      (a.excerpt ?? "").toLowerCase().includes(t),
  );
}

const sampleHome: HomeData = {
  lead: sampleLead,
  secondary: sampleSecondary,
  latest: sampleLatest,
  popular: samplePopular,
  hikmahLead: sampleKajian,
  hikmahSub: sampleKajianSub,
  antarbangsa: sampleAntarbangsa,
  daerah: sampleLatest.slice(0, 4),
  figur: samplePopular.slice(1, 4),
  khutbah: khutbahAsArticle,
  kabar: sampleLatest.slice(0, 3),
  columns: sampleColumns,
  ticker: tickerFallback,
};

export async function getHomeData(): Promise<HomeData> {
  try {
    const [headlinePool, beritaPool, hikmahPool, antarbangsa, daerah, figur, khutbahPool, kabar] =
      await Promise.all([
        postsByCategory("berita-utama", 5),
        latestPosts(14),
        postsByCategory("hikmah", 4),
        postsByCategory("antarbangsa", 3),
        postsByCategory("daerah", 4),
        postsByCategory("figur", 3),
        postsByCategory("khutbah", 1),
        postsByCategory("kabar-hidayatullah", 4),
      ]);

    // Assemble the lead deck from the strongest available pool.
    const headline = headlinePool.length >= 3 ? headlinePool : beritaPool;
    if (!headline.length) return sampleHome;

    const usedSlugs = new Set<string>();
    const take = (arr: Article[], n: number) => {
      const out: Article[] = [];
      for (const a of arr) {
        if (usedSlugs.has(a.slug)) continue;
        usedSlugs.add(a.slug);
        out.push(a);
        if (out.length >= n) break;
      }
      return out;
    };

    const lead = take(headline, 1)[0];
    const secondary = take(headline.length > 3 ? headline : beritaPool, 2);
    const latest = take(beritaPool, 6);
    const popular = take(beritaPool, 5);

    return {
      lead,
      secondary,
      latest,
      popular,
      hikmahLead: hikmahPool[0] ?? sampleKajian,
      hikmahSub: hikmahPool.slice(1, 4).length ? hikmahPool.slice(1, 4) : sampleKajianSub,
      antarbangsa: antarbangsa.length ? antarbangsa : sampleAntarbangsa,
      daerah: daerah.length ? daerah : sampleLatest.slice(0, 4),
      figur: figur.length ? figur : samplePopular.slice(1, 4),
      khutbah: khutbahPool[0] ?? khutbahAsArticle,
      kabar: kabar.length ? kabar : sampleLatest.slice(0, 3),
      columns: sampleColumns,
      ticker: (beritaPool.length ? beritaPool : sampleArticles)
        .slice(0, 6)
        .map((a) => a.title),
    };
  } catch {
    return sampleHome;
  }
}
