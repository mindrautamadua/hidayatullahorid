import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Quotes,
  Mosque,
  GraduationCap,
  Buildings,
  HandHeart,
} from "@phosphor-icons/react/dist/ssr";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { Reveal } from "@/components/Reveal";
import { ArticleCard } from "@/components/ArticleCard";
import {
  programPillars,
  impactStats,
  networkBodies,
  tawajjuhatLead,
  articleHref,
} from "@/lib/content";
import { getHomeData } from "@/lib/source";

const pillarIcon: Record<string, ComponentType<{ size?: number; weight?: "bold" | "fill" | "regular"; className?: string }>> = {
  dakwah: Mosque,
  pendidikan: GraduationCap,
  ekonomi: Buildings,
  sosial: HandHeart,
};

const topics = [
  { label: "Dakwah", href: "/tentang#program" },
  { label: "Pendidikan", href: "/tentang#program" },
  { label: "Ekonomi Umat", href: "/rubrik/ekonomi" },
  { label: "Sosial & Kemanusiaan", href: "/jaringan#bmh" },
  { label: "Antarbangsa", href: "/rubrik/antarbangsa" },
  { label: "Hikmah", href: "/rubrik/hikmah" },
];

function SectionHead({ eyebrow, title, href, cta = "Lihat semua" }: { eyebrow: string; title: string; href: string; cta?: string }) {
  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-end">
      <div>
        <span className="cat-tag">{eyebrow}</span>
        <h2 className="mt-3 font-serif text-[30px] font-semibold leading-[1.05] tracking-[-0.025em] md:text-[42px]">
          {title}
        </h2>
      </div>
      <Link href={href} className="group arrow-link text-[14.5px]">
        {cta}
        <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

export default async function Home() {
  const { lead, kabar, latest } = await getHomeData();
  const pool = [...latest, ...kabar].filter((a, i, arr) => arr.findIndex((b) => b.slug === a.slug) === i);
  const [feature, ...restNews] = pool;
  const grid = restNews.slice(0, 3);
  const [bmh, ...restBodies] = networkBodies;

  return (
    <>
      <Header />

      <main id="main-content">
        {/* ============ HERO — WEF-style institutional feature ============ */}
        <section className="mx-auto max-w-[1360px] px-5 pb-4 pt-14 md:px-8 md:pt-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-6">
              <span className="cat-tag">Situs Resmi · Sejak 1973</span>
              <h1 className="mt-5 font-serif text-[42px] font-semibold leading-[1.0] tracking-[-0.035em] md:text-[68px]">
                Membangun peradaban Islam, berkhidmat untuk umat
              </h1>
              <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ink-soft md:text-[18.5px]">
                Hidayatullah adalah gerakan dakwah dan pendidikan yang tumbuh dari
                Gunung Tembak, Balikpapan — kini berkhidmat lintas Nusantara melalui
                jaringan pesantren, lembaga sosial, dan amal usaha.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  href="/tentang"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-accent-ink transition-colors hover:bg-accent-hover active:scale-[0.98]"
                >
                  Tentang Hidayatullah
                  <ArrowRight size={17} weight="bold" />
                </Link>
                <Link href="/donasi" className="group arrow-link text-[15px]">
                  <HandHeart size={18} weight="fill" /> Tunaikan Donasi
                  <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[var(--radius-lg)] bg-line">
                {lead?.img && (
                  <Image
                    src={lead.img}
                    alt={lead.title ?? "Kiprah dan kegiatan Hidayatullah"}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ TOPIC RAIL ============ */}
        <section className="mx-auto max-w-[1360px] px-5 py-8 md:px-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3 border-y border-line py-5">
            <span className="mr-2 text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">Fokus Kami</span>
            {topics.map((t) => (
              <Link
                key={t.label}
                href={t.href}
                className="rounded-full border border-line-strong px-4 py-1.5 text-[13.5px] font-semibold text-ink-soft transition-colors hover:border-accent hover:bg-accent-tint hover:text-accent"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ============ SOROTAN — featured stories (WEF grid) ============ */}
        {feature && (
          <section id="berita" className="mx-auto max-w-[1360px] scroll-mt-28 px-5 py-14 md:px-8 md:py-20">
            <SectionHead eyebrow="Kabar Terkini" title="Sorotan" href="/rubrik/berita" cta="Semua berita" />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Big feature */}
              <Reveal className="lg:col-span-7">
                <article className="group">
                  <Link href={articleHref(feature)} className="block overflow-hidden rounded-[var(--radius-lg)]">
                    <div className="relative aspect-[16/10] w-full bg-line">
                      <Image src={feature.img} alt={feature.title} fill sizes="(max-width:1024px) 100vw, 58vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                    </div>
                  </Link>
                  <div className="pt-6">
                    <span className="cat-tag">{feature.rubrik}</span>
                    <h3 className="mt-3 font-serif text-[28px] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[38px]">
                      <Link href={articleHref(feature)} className="transition-colors hover:text-accent">{feature.title}</Link>
                    </h3>
                    {feature.excerpt && (
                      <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-soft">{feature.excerpt}</p>
                    )}
                    <p className="mt-4 text-[13px] text-ink-faint">{feature.time} · {feature.author}</p>
                  </div>
                </article>
              </Reveal>

              {/* Side grid */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
                {grid.map((a, i) => (
                  <Reveal key={a.slug} delay={0.05 + i * 0.05}>
                    <ArticleCard a={a} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============ CAPAIAN — clean impact (white, WEF) ============ */}
        <section className="mx-auto max-w-[1360px] border-t border-line px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <span className="cat-tag">Kiprah</span>
              <h2 className="mt-3 font-serif text-[30px] font-semibold leading-tight tracking-[-0.025em] md:text-[42px]">
                Setengah abad berkhidmat untuk umat dan bangsa
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {impactStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="border-t-2 border-accent pt-5">
                  <p className="tnums font-serif text-[46px] font-semibold leading-none tracking-[-0.02em] text-accent md:text-[60px]">
                    {s.value}
                  </p>
                  <p className="mt-3 text-[13.5px] font-medium text-ink-soft">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ BIDANG — what we do ============ */}
        <section className="mx-auto max-w-[1360px] px-5 py-16 md:px-8 md:py-24">
          <SectionHead eyebrow="Bidang Khidmat" title="Yang kami kerjakan" href="/tentang#program" cta="Program nasional" />
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {programPillars.map((p, i) => {
              const Icon = pillarIcon[p.key] ?? Mosque;
              return (
                <Reveal key={p.key} delay={(i % 4) * 0.06}>
                  <Link href={p.href} className="group block border-t-2 border-accent pt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-accent">
                        <Icon size={30} weight="fill" />
                      </span>
                      <span className="tnums font-serif text-[15px] font-semibold text-ink-faint">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-[22px] font-semibold leading-tight tracking-[-0.015em] transition-colors group-hover:text-accent">
                      {p.label}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">{p.desc}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ============ AMAL USAHA & JARINGAN ============ */}
        <section className="border-t border-line bg-paper-raised">
          <div className="mx-auto max-w-[1360px] px-5 py-16 md:px-8 md:py-24">
            <SectionHead eyebrow="Jaringan Lembaga" title="Amal usaha & jaringan" href="/jaringan" cta="Semua lembaga" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Featured — Laznas BMH */}
              <Reveal className="sm:col-span-2">
                <a
                  href={bmh.href ?? "/jaringan#bmh"}
                  target={bmh.href ? "_blank" : undefined}
                  rel={bmh.href ? "noopener noreferrer" : undefined}
                  className="group flex h-full flex-col justify-between rounded-[var(--radius-lg)] border border-accent/30 bg-accent-tint p-7 transition-all hover:shadow-[var(--shadow)] md:p-9"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="cat-tag">{bmh.kind} · Lembaga Unggulan</span>
                      <ArrowUpRight size={20} weight="bold" className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <h3 className="mt-4 font-serif text-[26px] font-semibold leading-tight tracking-[-0.015em] md:text-[30px]">{bmh.name}</h3>
                    <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">{bmh.desc}</p>
                  </div>
                  <span className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-accent">
                    Kunjungi bmh.or.id
                    <ArrowUpRight size={15} weight="bold" />
                  </span>
                </a>
              </Reveal>

              {restBodies.map((b, i) => {
                const inner = (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="cat-tag">{b.kind}</span>
                      {b.href && (
                        <ArrowUpRight size={16} weight="bold" className="text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      )}
                    </div>
                    <h3 className="mt-3 font-serif text-[19px] font-semibold leading-snug tracking-[-0.01em]">{b.name}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{b.desc}</p>
                  </>
                );
                const cls = "group flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow)]";
                return (
                  <Reveal key={b.id} delay={(i % 4) * 0.05}>
                    {b.href ? (
                      <a href={b.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                    ) : (
                      <Link href={`/jaringan#${b.id}`} className={cls}>{inner}</Link>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ TAWAJJUHAT — leadership quote ============ */}
        <section className="mx-auto max-w-[1360px] px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <figure className="mx-auto max-w-4xl">
              <Quotes size={40} weight="fill" className="text-accent/40" />
              <blockquote className="mt-6 font-serif text-[27px] font-medium leading-[1.32] tracking-[-0.02em] md:text-[40px]">
                {tawajjuhatLead.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="h-px w-12 bg-accent" />
                <span>
                  <span className="block font-serif text-[17px] font-semibold">{tawajjuhatLead.author}</span>
                  <span className="block text-[13.5px] text-ink-faint">{tawajjuhatLead.role}</span>
                </span>
                <Link href={tawajjuhatLead.href} className="group arrow-link ml-auto hidden text-[14px] sm:inline-flex">
                  Tawajjuhat
                  <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </Link>
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* ============ NEWSLETTER — WEF-style band ============ */}
        <section id="newsletter" className="band-emerald scroll-mt-28 text-accent-ink">
          <div className="mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-2">
            <Reveal>
              <span className="cat-tag" style={{ color: "var(--accent-ink)" }}>Buletin Pekanan</span>
              <h2 className="mt-3 font-serif text-[30px] font-semibold leading-tight tracking-[-0.025em] md:text-[40px]">
                Ikuti kiprah dan dakwah Hidayatullah
              </h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-accent-ink/85">
                Ringkasan kabar organisasi, hikmah, dan naskah khutbah, langsung ke email Anda setiap pekan.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-[var(--radius-lg)] bg-paper p-6 text-ink md:p-8">
                <Newsletter />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
