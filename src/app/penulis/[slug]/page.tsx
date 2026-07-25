import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Article as ArticleIcon } from "@phosphor-icons/react/dist/ssr";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ArticleCard } from "@/components/ArticleCard";
import { slugifyAuthor } from "@/lib/content";
import { getAllArticles, getByAuthor } from "@/lib/source";

export async function generateStaticParams() {
  const all = await getAllArticles();
  const seen = new Set<string>();
  for (const a of all) seen.add(slugifyAuthor(a.author));
  return [...seen].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getByAuthor(slug);
  const name = articles[0]?.author ?? "Penulis";
  return { title: `${name} — Penulis` };
}

export default async function PenulisPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getByAuthor(slug);
  if (articles.length === 0) notFound();

  const name = articles[0].author;
  const rubriks = [...new Set(articles.map((a) => a.rubrik.split("·")[0].trim()))].slice(0, 5);

  return (
    <>
      <Header />

      <main id="main-content" className="mx-auto max-w-[1320px] px-5 md:px-6">
        {/* Author masthead */}
        <header className="border-b border-line py-12 md:py-16">
          <nav className="mb-6 flex items-center gap-2 text-[13px] text-ink-faint">
            <Link href="/" className="hover:text-accent">Beranda</Link>
            <span>/</span>
            <span className="text-ink">Penulis</span>
          </nav>
          <Reveal>
            <div className="flex items-center gap-5">
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-accent-tint font-serif text-[34px] font-semibold text-accent">
                {name.charAt(0)}
              </span>
              <div>
                <h1 className="font-serif text-[32px] font-semibold leading-none tracking-[-0.02em] md:text-[44px]">
                  {name}
                </h1>
                <p className="mt-3 flex items-center gap-2 text-[14px] text-ink-soft">
                  <ArticleIcon size={15} weight="bold" />
                  {articles.length} artikel · {rubriks.join(", ")}
                </p>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Articles */}
        <section className="py-12 md:py-14">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.06}>
                <ArticleCard a={a} />
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
