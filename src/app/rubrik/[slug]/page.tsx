import Link from "next/link";
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ArticleCard } from "@/components/ArticleCard";
import { rubrikLabels, rubrikHref } from "@/lib/content";
import { getByRubrik } from "@/lib/source";

function labelFor(slug: string): string {
  if (rubrikLabels[slug]) return rubrikLabels[slug];
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  return [
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
  ].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Rubrik ${labelFor(slug)}` };
}

export default async function RubrikPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const label = labelFor(slug);
  const articles = await getByRubrik(slug);
  const [featured, ...rest] = articles;

  const others = Object.entries(rubrikLabels)
    .filter(([s]) => s !== slug)
    .slice(0, 8);

  return (
    <>
      <Header />

      <main id="main-content" className="mx-auto max-w-[1320px] px-5 md:px-6">
        {/* Rubrik masthead */}
        <header className="border-b border-line py-12 md:py-16">
          <nav className="mb-5 flex items-center gap-2 text-[13px] text-ink-faint">
            <Link href="/" className="hover:text-accent">Beranda</Link>
            <span>/</span>
            <span className="text-ink">Rubrik</span>
          </nav>
          <Reveal>
            <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.16em] text-accent">Rubrik</p>
            <h1 className="font-serif text-[40px] font-semibold leading-none tracking-[-0.02em] md:text-[60px]">
              {label}
            </h1>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-soft">
              Kumpulan berita, analisis, dan liputan pilihan dalam rubrik {label} dari redaksi Hidayatullah.
            </p>
          </Reveal>
        </header>

        {articles.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-[22px] text-ink-soft">Belum ada artikel pada rubrik ini.</p>
            <Link href="/" className="mt-5 inline-block font-semibold text-accent hover:underline">
              Kembali ke beranda
            </Link>
          </div>
        ) : (
          <section className="py-12 md:py-14">
            {/* Featured */}
            {featured && (
              <Reveal>
                <Link
                  href={`/artikel/${featured.slug}`}
                  className="group grid grid-cols-1 gap-8 border-b border-line pb-12 lg:grid-cols-2 lg:items-center lg:gap-12"
                >
                  <div className="overflow-hidden rounded-[var(--radius-lg)]">
                    <div className="relative aspect-[16/10] w-full bg-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featured.img}
                        alt={featured.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[12.5px] font-semibold uppercase tracking-wide text-accent">
                      {featured.time} · {featured.readTime} mnt baca
                    </p>
                    <h2 className="mt-3 font-serif text-[28px] font-semibold leading-[1.14] tracking-[-0.02em] md:text-[36px]">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">{featured.excerpt}</p>
                    )}
                    <p className="mt-4 text-[13px] text-ink-faint">Oleh {featured.author}</p>
                  </div>
                </Link>
              </Reveal>
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((a, i) => (
                  <Reveal key={a.slug} delay={(i % 3) * 0.06}>
                    <ArticleCard a={a} />
                  </Reveal>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Other rubriks */}
        <section className="border-t border-line py-12 md:py-14">
          <h2 className="mb-6 text-[13px] font-bold uppercase tracking-[0.14em] text-ink-soft">
            Rubrik Lainnya
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {others.map(([s, l]) => (
              <Link
                key={s}
                href={rubrikHref(l)}
                className="rounded-full border border-line px-4 py-2 text-[14px] font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent"
              >
                {l}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
