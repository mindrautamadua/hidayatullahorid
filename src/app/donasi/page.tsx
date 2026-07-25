import type { Metadata } from "next";
import { ShieldCheck, FileText, Sparkle, Bank } from "@phosphor-icons/react/dist/ssr";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { DonasiForm } from "@/components/DonasiForm";
import { donasiPrograms, donasiRekening } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donasi",
  description:
    "Salurkan wakaf, sedekah, zakat, dan bantuan kemanusiaan melalui Baitul Maal Hidayatullah — amanah, transparan, dan tepat sasaran.",
};

const rupiah = (n: number) => `Rp${n.toLocaleString("id-ID")}`;

const trust = [
  { Icon: ShieldCheck, title: "Lembaga Resmi", desc: "Terdaftar & diawasi sesuai regulasi lembaga amil zakat." },
  { Icon: FileText, title: "Laporan Transparan", desc: "Laporan penyaluran dipublikasikan berkala." },
  { Icon: Sparkle, title: "Tepat Sasaran", desc: "Tersalur ke penerima manfaat di 34 provinsi." },
];

export default function DonasiPage() {
  return (
    <>
      <Header />
      <PageHero
        eyebrow="Laznas BMH · Baitul Maal Hidayatullah"
        title="Salurkan donasi terbaik Anda hari ini"
        description="Halaman resmi donasi Hidayatullah, disalurkan melalui Laznas BMH (Baitul Maal Hidayatullah). Wakaf, sedekah, zakat, hingga bantuan kemanusiaan — setiap kontribusi dikelola amanah dan transparan untuk memberdayakan umat."
      />

      <main id="main-content" className="mx-auto max-w-[1320px] px-5 py-12 md:px-6 md:py-16">
        {/* Trust strip */}
        <div className="grid gap-4 sm:grid-cols-3">
          {trust.map((t) => (
            <div
              key={t.title}
              className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-line bg-paper-raised p-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
                <t.Icon size={20} weight="bold" />
              </span>
              <div>
                <h3 className="text-[14.5px] font-semibold">{t.title}</h3>
                <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Programs */}
          <div className="lg:col-span-7">
            <h2 className="rule-accent font-serif text-[26px] font-semibold tracking-[-0.02em] md:text-[30px]">
              Program Pilihan
            </h2>
            <p className="mt-4 max-w-[560px] text-[14px] leading-relaxed text-ink-soft">
              Seluruh program dihimpun dan disalurkan melalui Laznas BMH (Baitul
              Maal Hidayatullah) — lembaga amil zakat nasional milik Hidayatullah.
            </p>
            <div className="mt-8 flex flex-col gap-5">
              {donasiPrograms.map((p) => {
                const pct = Math.min(100, Math.round((p.raised / p.target) * 100));
                return (
                  <article
                    key={p.slug}
                    className="rounded-[var(--radius-lg)] border border-line p-5 transition-colors hover:border-accent/40 md:p-6"
                  >
                    <h3 className="font-serif text-[19px] font-semibold leading-snug">{p.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{p.desc}</p>
                    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-line">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-2 text-[13px]">
                      <span>
                        <strong className="text-[15px] text-ink">{rupiah(p.raised)}</strong>{" "}
                        <span className="text-ink-faint">terkumpul dari {rupiah(p.target)}</span>
                      </span>
                      <span className="font-semibold text-accent">
                        {p.donors.toLocaleString("id-ID")} donatur
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Rekening */}
            <h2 className="rule-accent mt-12 font-serif text-[26px] font-semibold tracking-[-0.02em] md:text-[30px]">
              Transfer Manual
            </h2>
            <div className="mt-8 flex flex-col gap-3">
              {donasiRekening.map((r) => (
                <div
                  key={r.bank}
                  className="flex items-center gap-4 rounded-[var(--radius-lg)] border border-line bg-paper-raised p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
                    <Bank size={20} weight="bold" />
                  </span>
                  <div>
                    <p className="text-[13px] text-ink-soft">{r.bank}</p>
                    <p className="font-serif text-[19px] font-semibold tracking-wide text-ink">
                      {r.norek}
                    </p>
                    <p className="text-[12.5px] text-ink-faint">a.n. {r.an}</p>
                  </div>
                </div>
              ))}
              <p className="text-[12.5px] text-ink-faint">
                Konfirmasi transfer melalui WhatsApp resmi agar donasi tercatat dan
                mendapat laporan penyaluran.
              </p>
            </div>
          </div>

          {/* Form (sticky) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <DonasiForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
