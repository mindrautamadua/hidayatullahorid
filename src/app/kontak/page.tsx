import type { Metadata } from "next";
import {
  MapPin,
  EnvelopeSimple,
  Phone,
  WhatsappLogo,
  Megaphone,
} from "@phosphor-icons/react/dist/ssr";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Sekretariat DPP Hidayatullah — alamat, email, telepon, dan kanal kerja sama.",
};

const channels = [
  { Icon: EnvelopeSimple, label: "Email Redaksi", value: "redaksi@hidayatullah.or.id" },
  { Icon: WhatsappLogo, label: "WhatsApp", value: "+62 811-1900-000" },
  { Icon: Phone, label: "Telepon Sekretariat", value: "(021) 8779 6000" },
  { Icon: Megaphone, label: "Kerja Sama & Kemitraan", value: "humas@hidayatullah.or.id" },
];

export default function KontakPage() {
  return (
    <>
      <Header />
      <PageHero
        eyebrow="Hubungi Kami"
        title="Sekretariat DPP Hidayatullah"
        description="Punya pertanyaan, usulan kerja sama, atau ingin bergabung dalam khidmat? Sekretariat Dewan Pengurus Pusat Hidayatullah siap melayani Anda."
      />

      <main id="main-content" className="mx-auto max-w-[1320px] px-5 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Channels */}
          <div className="lg:col-span-5">
            <div className="flex items-start gap-4 rounded-[var(--radius-lg)] border border-line p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
                <MapPin size={22} weight="bold" />
              </span>
              <div>
                <h3 className="text-[14.5px] font-semibold">Kantor Sekretariat DPP</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">
                  Gedung Pusat Dakwah Hidayatullah, Jl. Cipinang Cempedak I No. 14,
                  Jatinegara, Jakarta Timur, DKI Jakarta 13340, Indonesia.
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {channels.map((c) => (
                <div key={c.label} className="rounded-[var(--radius-lg)] border border-line p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-tint text-accent">
                    <c.Icon size={19} weight="bold" />
                  </span>
                  <p className="mt-3 text-[12.5px] text-ink-faint">{c.label}</p>
                  <p className="text-[14.5px] font-semibold text-ink">{c.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[var(--radius-lg)] border border-line bg-paper-raised p-6 md:p-8">
              <h2 className="font-serif text-[24px] font-semibold tracking-[-0.02em]">Kirim Pesan</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-ink-soft">
                  Nama
                  <input
                    type="text"
                    placeholder="Nama lengkap"
                    className="rounded-[var(--radius)] border border-line bg-paper px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-ink-soft">
                  Email
                  <input
                    type="email"
                    placeholder="email@contoh.co.id"
                    className="rounded-[var(--radius)] border border-line bg-paper px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-accent"
                  />
                </label>
              </div>
              <label className="mt-4 flex flex-col gap-1.5 text-[13px] font-semibold text-ink-soft">
                Subjek
                <input
                  type="text"
                  placeholder="Perihal pesan"
                  className="rounded-[var(--radius)] border border-line bg-paper px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-accent"
                />
              </label>
              <label className="mt-4 flex flex-col gap-1.5 text-[13px] font-semibold text-ink-soft">
                Pesan
                <textarea
                  rows={5}
                  placeholder="Tulis pesan Anda…"
                  className="resize-none rounded-[var(--radius)] border border-line bg-paper px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-accent"
                />
              </label>
              <button className="mt-5 rounded-full bg-accent px-6 py-3 text-[14.5px] font-semibold text-accent-ink transition-colors hover:bg-accent-hover">
                Kirim Pesan
              </button>
              <p className="mt-3 text-[12px] text-ink-faint">
                Formulir simulasi — belum terhubung ke backend pengiriman.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
