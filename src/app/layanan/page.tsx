import type { ComponentType } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Mosque,
  UsersThree,
  Television,
  Storefront,
  Briefcase,
  Sparkle,
  ArrowUpRight,
  ArrowRight,
  Info,
} from "@phosphor-icons/react/dist/ssr";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { serviceCatalog, type DigitalService } from "@/lib/content";

export const metadata: Metadata = {
  title: "Katalog Layanan Digital",
  description:
    "Satu pintu menuju seluruh ekosistem digital Hidayatullah — belajar, beribadah, bergabung, media, ekonomi, dan layanan organisasi. Sebagian aktif, sebagian dalam pengembangan.",
};

type IconType = ComponentType<{ size?: number; weight?: "bold" | "fill" | "regular"; className?: string }>;

const capIcon: Record<string, IconType> = {
  GraduationCap,
  Mosque,
  UsersThree,
  Television,
  Storefront,
  Briefcase,
  Sparkle,
};

function StatusBadge({ status }: { status: DigitalService["status"] }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Aktif
      </span>
    );
  }
  const label = status === "soon" ? "Segera" : "Internal";
  return (
    <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-ink-faint">
      {label}
    </span>
  );
}

function ServiceCard({ s }: { s: DigitalService }) {
  const clickable = s.status === "live" && !!s.href;

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-[18px] font-semibold leading-snug tracking-[-0.015em]">
          {s.name}
        </h3>
        {clickable ? (
          s.external ? (
            <ArrowUpRight size={17} weight="bold" className="mt-0.5 shrink-0 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          ) : (
            <ArrowRight size={17} weight="bold" className="mt-0.5 shrink-0 text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          )
        ) : null}
      </div>
      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-soft">{s.desc}</p>
      <div className="mt-4">
        <StatusBadge status={s.status} />
      </div>
    </>
  );

  const base = "flex h-full flex-col rounded-[var(--radius-lg)] border p-5";

  if (clickable) {
    const cls = `group ${base} border-line bg-paper transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow)]`;
    return s.external ? (
      <a href={s.href} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
    ) : (
      <Link href={s.href!} className={cls}>{body}</Link>
    );
  }
  return <div className={`${base} border-dashed border-line bg-paper-raised/60`}>{body}</div>;
}

export default function LayananPage() {
  const liveCount = serviceCatalog.reduce(
    (n, g) => n + g.services.filter((s) => s.status === "live").length,
    0,
  );
  const totalCount = serviceCatalog.reduce((n, g) => n + g.services.length, 0);

  return (
    <>
      <Header />
      <PageHero
        eyebrow="Ekosistem Digital"
        crumb="Layanan"
        title="Katalog Layanan Digital"
        description="Satu pintu menuju seluruh layanan digital Hidayatullah — dikelompokkan menurut kebutuhan Anda, bukan nama aplikasi. Sebagian sudah aktif, sebagian sedang kami kembangkan."
      />

      <main id="main-content" className="mx-auto max-w-[1360px] px-5 py-14 md:px-8 md:py-20">
        {/* Legend + counter */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Aktif
            </span>
            <span className="inline-flex items-center gap-1.5 text-ink-faint">
              <span className="rounded-full border border-line-strong px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]">Segera</span>
              Dalam pengembangan
            </span>
            <span className="inline-flex items-center gap-1.5 text-ink-faint">
              <span className="rounded-full border border-line-strong px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]">Internal</span>
              Khusus pengurus
            </span>
          </div>
          <p className="text-[13px] text-ink-faint">
            <span className="font-semibold text-ink">{liveCount}</span> aktif dari {totalCount} layanan
          </p>
        </div>

        {/* Capability groups */}
        <div className="mt-4 flex flex-col divide-y divide-line">
          {serviceCatalog.map((g) => {
            const Icon = capIcon[g.icon] ?? Sparkle;
            return (
              <section key={g.id} id={g.id} className="scroll-mt-28 py-12 md:py-14">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                  {/* Group header */}
                  <div className="lg:col-span-4">
                    <span className="grid h-12 w-12 place-items-center rounded-[var(--radius)] bg-accent-tint text-accent">
                      <Icon size={24} weight="fill" />
                    </span>
                    <h2 className="mt-4 font-serif text-[26px] font-semibold leading-tight tracking-[-0.02em] md:text-[32px]">
                      {g.title}
                    </h2>
                    <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-ink-soft">{g.tagline}</p>
                    {g.note && (
                      <p className="mt-4 flex gap-2 rounded-[var(--radius)] bg-accent-tint/60 p-3 text-[12.5px] leading-relaxed text-ink-soft">
                        <Info size={16} weight="bold" className="mt-0.5 shrink-0 text-accent" />
                        {g.note}
                      </p>
                    )}
                  </div>

                  {/* Services */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
                    {g.services.map((s) => (
                      <ServiceCard key={s.name} s={s} />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Vision / partnership close */}
        <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-lg)] border border-line bg-paper-raised p-8 md:flex-row md:items-center md:p-10">
          <div className="max-w-2xl">
            <span className="cat-tag">Menuju satu platform</span>
            <h2 className="mt-3 font-serif text-[22px] font-semibold leading-tight tracking-[-0.015em] md:text-[27px]">
              Seluruh layanan ini sedang kami satukan dalam satu gerbang digital
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
              Ke depan, cukup satu akun untuk mengakses pendidikan, donasi, keanggotaan,
              media, dan layanan organisasi. Punya gagasan atau ingin berkolaborasi?
            </p>
          </div>
          <Link
            href="/kontak"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-accent-ink transition-colors hover:bg-accent-hover active:scale-[0.98]"
          >
            Ajukan kolaborasi
            <ArrowRight size={17} weight="bold" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
