import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllArticles } from "@/lib/source";

const RUBRIKS = [
  "nasional",
  "antarbangsa",
  "daerah",
  "kabar-hidayatullah",
  "ekonomi",
  "berita-video",
  "hikmah",
  "kajian-islam",
  "inspirasi",
  "khutbah",
  "figur",
  "kajian-dan-opini",
  "keindonesiaan",
  "dakwah",
];

const STATIC = [
  "",
  "tentang",
  "jaringan",
  "tawajjuhat",
  "redaksi",
  "kontak",
  "donasi",
  "kebijakan-privasi",
  "syarat-penggunaan",
  "disclaimer",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC.map((path) => ({
    url: `${SITE_URL}/${path}`.replace(/\/$/, "") || SITE_URL,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));

  const rubrikEntries: MetadataRoute.Sitemap = RUBRIKS.map((slug) => ({
    url: `${SITE_URL}/rubrik/${slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const articles = await getAllArticles(60);
    articleEntries = articles.map((a) => ({
      url: `${SITE_URL}/artikel/${a.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    /* live source unavailable — ship static + rubrik only */
  }

  return [...staticEntries, ...rubrikEntries, ...articleEntries];
}
