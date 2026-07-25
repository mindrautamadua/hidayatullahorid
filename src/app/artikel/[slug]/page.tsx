import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Clock,
  CalendarBlank,
} from "@phosphor-icons/react/dist/ssr";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ArticleCard } from "@/components/ArticleCard";
import { ShareBar } from "@/components/ShareBar";
import { rubrikHref, authorHref } from "@/lib/content";
import { getAllArticles, getArticle, getRelatedArticles } from "@/lib/source";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export async function generateStaticParams() {
  const all = await getAllArticles();
  return all.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return { title: "Artikel tidak ditemukan" };
  return {
    title: a.title,
    description: a.excerpt ?? a.title,
    openGraph: { title: a.title, description: a.excerpt ?? a.title, images: [a.img], type: "article" },
  };
}

export default async function ArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();

  const related = await getRelatedArticles(a.slug, a.rubrikSlug ?? a.rubrik, 3);
  const rubrikLabel = a.rubrik.split("·")[0].trim();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title,
    description: a.excerpt ?? a.title,
    image: [a.img],
    datePublished: a.dateISO,
    dateModified: a.dateISO,
    articleSection: rubrikLabel,
    author: { "@type": "Person", name: a.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-hidayatullah.png` },
    },
    mainEntityOfPage: `${SITE_URL}/artikel/${a.slug}`,
    inLanguage: "id-ID",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />

      <main id="main-content">
        <div className="article-shell px-5 pt-10 md:px-6 md:pt-14">
        {/* Broadsheet side rail — sticky folio + vertical share (desktop only) */}
        <aside className="article-rail">
          <div className="rail-folio">{rubrikLabel}</div>
          <div className="rule-gold mt-3" />
          <p className="mt-4 flex items-center gap-1.5 text-[12.5px] text-ink-faint">
            <Clock size={13} weight="bold" /> {a.readTime} mnt baca
          </p>
          <p className="mt-1 text-[12.5px] text-ink-faint">{a.time}</p>
          <div className="mt-6">
            <p className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-faint">
              Bagikan
            </p>
            <ShareBar title={a.title} vertical />
          </div>
        </aside>

        <article>
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-[13px] text-ink-faint">
            <Link href="/" className="hover:text-accent">Beranda</Link>
            <span>/</span>
            <Link href={rubrikHref(a)} className="hover:text-accent">{rubrikLabel}</Link>
          </nav>

          <Reveal>
            <Link
              href={rubrikHref(a)}
              className="text-[13px] font-bold uppercase tracking-[0.14em] text-accent"
            >
              {rubrikLabel}
            </Link>
            <h1 className="mt-3 font-serif text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] md:text-[46px]">
              {a.title}
            </h1>
            {a.excerpt && (
              <p className="mt-5 font-serif text-[19px] italic leading-relaxed text-ink-soft">
                {a.excerpt}
              </p>
            )}

            {/* Byline */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
              <div className="flex items-center gap-3">
                <Link href={authorHref(a.author)} className="grid h-11 w-11 place-items-center rounded-full bg-accent-tint font-serif text-[17px] font-semibold text-accent transition-transform hover:scale-105">
                  {a.author.charAt(0)}
                </Link>
                <div>
                  <Link href={authorHref(a.author)} className="text-[14.5px] font-semibold hover:text-accent">
                    {a.author}
                  </Link>
                  <div className="flex items-center gap-3 text-[12.5px] text-ink-faint">
                    <span className="flex items-center gap-1">
                      <CalendarBlank size={13} weight="bold" /> {a.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} weight="bold" /> {a.readTime} mnt baca
                    </span>
                  </div>
                </div>
              </div>
              <ShareBar title={a.title} />
            </div>
          </Reveal>

          {/* Hero image */}
          <Reveal delay={0.05}>
            <figure className="mt-8 overflow-hidden rounded-[var(--radius-lg)]">
              <div className="relative aspect-[16/9] w-full bg-line">
                <Image src={a.img} alt={a.title} fill priority sizes="(max-width: 768px) 100vw, 760px" className="object-cover" />
              </div>
              <figcaption className="mt-2.5 text-[12.5px] text-ink-faint">
                {rubrikLabel} · Hidayatullah
              </figcaption>
            </figure>
          </Reveal>

          {/* Body */}
          {a.bodyHtml ? (
            <div
              className="prose-hid dropcap mt-9"
              dangerouslySetInnerHTML={{ __html: a.bodyHtml }}
            />
          ) : (
            <div className="dropcap mt-9 font-serif text-[19px] leading-[1.75] text-ink [&>p]:mb-6 [&>p]:tracking-[-0.003em]">
              {(a.bodyParagraphs ?? []).map((p, i) =>
                p.startsWith('"') ? (
                  <blockquote
                    key={i}
                    className="my-8 border-l-[3px] border-accent bg-accent-tint/40 py-3 pl-6 pr-4 text-[21px] italic leading-relaxed text-ink"
                  >
                    {p}
                  </blockquote>
                ) : (
                  <p key={i}>{p}</p>
                ),
              )}
            </div>
          )}

          {/* Tags + back */}
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-6">
            {[rubrikLabel, "Islam", "Umat", "Indonesia"].map((t) => (
              <span key={t} className="rounded-full bg-paper-raised px-3.5 py-1.5 text-[13px] font-medium text-ink-soft">
                #{t.toLowerCase().replace(/\s+/g, "")}
              </span>
            ))}
          </div>
        </article>
        </div>

        {/* Related */}
        <section className="mx-auto mt-16 max-w-[1320px] border-t border-line px-5 py-14 md:px-6 md:py-16">
          <h2 className="rule-accent mb-8 font-serif text-[28px] font-semibold leading-none tracking-[-0.02em] md:text-[32px]">
            Artikel Terkait
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.07}>
                <ArticleCard a={r} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/" className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-accent">
              <ArrowLeft size={16} weight="bold" className="transition-transform group-hover:-translate-x-1" />
              Kembali ke beranda
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
