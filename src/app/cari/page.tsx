import Link from "next/link";
import type { Metadata } from "next";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ArticleCard } from "@/components/ArticleCard";
import { SearchBox } from "@/components/SearchBox";
import { searchArticles } from "@/lib/source";
import { rubrikHref } from "@/lib/content";

export const metadata: Metadata = { title: "Pencarian" };

const suggestions = ["Palestina", "Zakat", "Kajian", "Fiqih", "Sejarah", "Khutbah"];

export default async function CariPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const term = q.trim();
  const results = term ? await searchArticles(term) : [];

  return (
    <>
      <Header />

      <main id="main-content" className="mx-auto max-w-[1320px] px-5 md:px-6">
        <section className="border-b border-line py-12 md:py-16">
          <Reveal>
            <h1 className="font-serif text-[34px] font-semibold leading-none tracking-[-0.02em] md:text-[48px]">
              Pencarian
            </h1>
            <p className="mb-8 mt-3 text-[16px] text-ink-soft">
              Telusuri seluruh berita, kajian, dan artikel Hidayatullah.
            </p>
            <div className="max-w-2xl">
              <SearchBox initial={term} />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-[13px] text-ink-faint">Populer:</span>
              {suggestions.map((s) => (
                <Link
                  key={s}
                  href={`/cari?q=${encodeURIComponent(s)}`}
                  className="rounded-full border border-line px-3 py-1 text-[13px] font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent"
                >
                  {s}
                </Link>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="py-12 md:py-14">
          {!term ? (
            <div className="py-16 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-tint text-accent">
                <MagnifyingGlass size={24} weight="bold" />
              </span>
              <p className="mt-5 font-serif text-[20px] text-ink-soft">
                Ketik kata kunci untuk mulai mencari.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-serif text-[22px]">
                Tidak ada hasil untuk <span className="text-accent">&ldquo;{term}&rdquo;</span>
              </p>
              <p className="mx-auto mt-3 max-w-md text-[15px] text-ink-soft">
                Coba kata kunci lain atau jelajahi rubrik pilihan kami.
              </p>
              <Link
                href={rubrikHref("Kajian")}
                className="mt-6 inline-block rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
              >
                Jelajahi rubrik
              </Link>
            </div>
          ) : (
            <>
              <p className="mb-8 text-[14px] text-ink-soft">
                Menampilkan <span className="font-semibold text-ink">{results.length}</span> hasil untuk{" "}
                <span className="font-semibold text-ink">&ldquo;{term}&rdquo;</span>
              </p>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((a, i) => (
                  <Reveal key={a.slug} delay={(i % 3) * 0.05}>
                    <ArticleCard a={a} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
