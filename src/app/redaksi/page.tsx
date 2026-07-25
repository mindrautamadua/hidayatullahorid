import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Redaksi",
  description:
    "Susunan redaksi Hidayatullah Media Network beserta pedoman peliputan dan tim editorial.",
};

const board = [
  { role: "Pemimpin Umum", name: "H. Abdul Ghofur" },
  { role: "Pemimpin Redaksi", name: "Mahladi Murni" },
  { role: "Redaktur Pelaksana", name: "Ainuddin Chalik" },
  { role: "Redaktur Senior", name: "Bambang Subagyo" },
  { role: "Redaktur Antarbangsa", name: "Zulkifli Anwar" },
  { role: "Sekretaris Redaksi", name: "Siti Aisyah" },
  { role: "Manajer Digital", name: "Rahmat Hidayat" },
  { role: "Koordinator Multimedia", name: "Salman Alfarisi" },
];

const desks = [
  "Nasional & Kabar Hidayatullah",
  "Antarbangsa & Dunia Islam",
  "Kajian & Hikmah",
  "Kolom & Opini",
  "Ekonomi Umat",
  "Multimedia & Video",
];

export default function RedaksiPage() {
  return (
    <>
      <Header />
      <PageHero
        eyebrow="Editorial Board"
        title="Susunan Redaksi"
        description="Tim editorial Hidayatullah Media Network yang menjaga kualitas, akurasi, dan adab peliputan di seluruh kanal media dakwah."
      />

      <main id="main-content" className="mx-auto max-w-[1320px] px-5 py-12 md:px-6 md:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {board.map((m) => (
            <div key={m.role} className="rounded-[var(--radius-lg)] border border-line p-6">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-accent-ink font-serif text-[18px] font-semibold">
                  {m.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-wide text-accent">{m.role}</p>
                  <p className="font-serif text-[18px] font-semibold">{m.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="rule-accent mt-14 font-serif text-[26px] font-semibold tracking-[-0.02em] md:text-[30px]">
          Desk Peliputan
        </h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {desks.map((d) => (
            <span key={d} className="rounded-full border border-line px-4 py-2 text-[14px] text-ink-soft">
              {d}
            </span>
          ))}
        </div>

        <div className="mt-14 rounded-[var(--radius-lg)] bg-paper-raised border border-line p-8 md:p-10">
          <h2 className="font-serif text-[22px] font-semibold tracking-[-0.02em]">Pedoman Peliputan</h2>
          <p className="mt-3 max-w-[760px] text-[15px] leading-relaxed text-ink-soft">
            Seluruh karya jurnalistik Hidayatullah Media Network tunduk pada Kode
            Etik Jurnalistik dan Pedoman Pemberitaan Media Siber. Kami berkomitmen
            melakukan verifikasi, menjaga keberimbangan, serta melayani hak jawab
            dan hak koreksi sesuai ketentuan yang berlaku.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
