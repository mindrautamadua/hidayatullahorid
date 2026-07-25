import Link from "next/link";
import { HandHeart, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { donasiPrograms } from "@/lib/content";

const rupiahShort = (n: number) => {
  if (n >= 1_000_000_000) return `Rp${(n / 1_000_000_000).toFixed(1)} M`;
  if (n >= 1_000_000) return `Rp${Math.round(n / 1_000_000)} jt`;
  return `Rp${n.toLocaleString("id-ID")}`;
};

export function DonationBand() {
  return (
    <section className="band-emerald text-accent-ink">
      <div className="mx-auto max-w-[1320px] px-5 py-14 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Pitch */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-ink/10 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em]">
              <HandHeart size={15} weight="fill" /> Baitul Maal Hidayatullah
            </span>
            <h2 className="mt-5 font-serif text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[38px]">
              Sedekah terbaik hari ini, untuk umat yang lebih berdaya
            </h2>
            <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-accent-ink/85">
              Wakaf, beasiswa santri, hingga kemanusiaan Palestina. Setiap rupiah
              tersalur amanah dan transparan.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/donasi"
                className="inline-flex items-center gap-2 rounded-full bg-accent-ink px-5 py-3 text-[14.5px] font-semibold text-accent transition-transform hover:-translate-y-0.5"
              >
                <HandHeart size={18} weight="fill" /> Donasi Sekarang
              </Link>
              <Link
                href="/donasi"
                className="inline-flex items-center gap-1.5 rounded-full border border-accent-ink/30 px-5 py-3 text-[14.5px] font-semibold transition-colors hover:bg-accent-ink/10"
              >
                Semua program <ArrowRight size={15} weight="bold" />
              </Link>
            </div>
          </div>

          {/* Program progress */}
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {donasiPrograms.map((p) => {
              const pct = Math.min(100, Math.round((p.raised / p.target) * 100));
              return (
                <Link
                  key={p.slug}
                  href="/donasi"
                  className="group flex flex-col rounded-[var(--radius-lg)] bg-accent-ink/[0.07] p-4 ring-1 ring-inset ring-accent-ink/10 transition-colors hover:bg-accent-ink/[0.12]"
                >
                  <h3 className="text-[14.5px] font-semibold leading-snug">{p.title}</h3>
                  <div className="mt-auto pt-4">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-accent-ink/15">
                      <div
                        className="h-full rounded-full bg-accent-ink"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="mt-2 flex items-baseline justify-between text-[12.5px]">
                      <span className="font-bold">{rupiahShort(p.raised)}</span>
                      <span className="text-accent-ink/70">{pct}%</span>
                    </div>
                    <p className="mt-1 text-[11.5px] text-accent-ink/70">
                      {p.donors.toLocaleString("id-ID")} donatur
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
