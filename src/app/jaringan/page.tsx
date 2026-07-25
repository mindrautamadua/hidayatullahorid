import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { networkBodies, networkPillars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Amal Usaha & Jaringan",
  description:
    "Lembaga dan badan otonom Hidayatullah yang berkhidmat di bidang dakwah, pendidikan, sosial-kemanusiaan, dan ekonomi umat.",
};

export default function JaringanPage() {
  const [bmh, ...rest] = networkBodies;

  return (
    <>
      <Header />
      <PageHero
        eyebrow="Jaringan"
        crumb="Jaringan"
        title="Amal Usaha & Jaringan Hidayatullah"
        description="Gerakan Hidayatullah bekerja melalui sejumlah lembaga dan badan otonom yang saling melengkapi — menopang dakwah, pendidikan integral, khidmat sosial-kemanusiaan, dan pemberdayaan ekonomi umat di seluruh Nusantara."
      />

      <main id="main-content" className="mx-auto max-w-[1360px] px-5 py-14 md:px-8 md:py-20">
        {/* Pillars */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line pb-8">
          <span className="cat-tag">Empat pilar khidmat</span>
          <div className="flex flex-wrap gap-2.5">
            {networkPillars.map((p) => (
              <span
                key={p}
                className="rounded-full border border-line-strong px-4 py-1.5 text-[13.5px] font-semibold text-ink-soft"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Featured — Laznas BMH */}
        <a
          id={bmh.id}
          href={bmh.href ?? "#"}
          target={bmh.href ? "_blank" : undefined}
          rel={bmh.href ? "noopener noreferrer" : undefined}
          className="group mt-12 flex scroll-mt-28 flex-col justify-between gap-6 rounded-[var(--radius-lg)] border border-accent/30 bg-accent-tint p-8 transition-all hover:shadow-[var(--shadow)] md:flex-row md:items-end md:p-10"
        >
          <div className="max-w-2xl">
            <span className="cat-tag">{bmh.kind} · Lembaga Unggulan</span>
            <h2 className="mt-4 font-serif text-[28px] font-semibold leading-tight tracking-[-0.02em] md:text-[36px]">
              {bmh.name}
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">{bmh.desc}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-[14px] font-semibold text-accent-ink transition-colors group-hover:bg-accent-hover">
            Kunjungi bmh.or.id
            <ArrowUpRight size={16} weight="bold" />
          </span>
        </a>

        {/* Other bodies */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((b) => (
            <article
              key={b.id}
              id={b.id}
              className="group flex scroll-mt-28 flex-col rounded-[var(--radius-lg)] border border-line bg-paper-raised p-6 transition-colors hover:border-accent/40"
            >
              <span className="cat-tag">{b.kind}</span>
              <h2 className="mt-3 font-serif text-[21px] font-semibold leading-snug tracking-[-0.01em]">
                {b.name}
              </h2>
              <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-soft">
                {b.desc}
              </p>
              {b.href && (
                <a
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent"
                >
                  Kunjungi situs
                  <ArrowUpRight
                    size={15}
                    weight="bold"
                    className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </a>
              )}
            </article>
          ))}
        </div>

        {/* Closing note */}
        <div className="mt-14 rounded-[var(--radius-lg)] border border-line bg-paper-raised p-8 md:p-10">
          <span className="cat-tag">Satu gerakan</span>
          <p className="mt-3 max-w-[760px] font-serif text-[20px] leading-[1.4] tracking-[-0.01em] text-ink md:text-[24px]">
            Seluruh amal usaha ini bergerak dalam satu tujuan: membangun peradaban
            Islam melalui khidmat yang nyata bagi umat dan bangsa.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
