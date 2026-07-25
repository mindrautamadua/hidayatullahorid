import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Tawajjuhat",
  description:
    "Arahan dan tausiyah dari Ketua Umum dan Dewan Pengurus Pusat Hidayatullah — panduan spiritual dan langkah gerakan bagi kader dan umat.",
};

type Directive = {
  date: string;
  title: string;
  excerpt: string;
  author: string;
};

const directives: Directive[] = [
  {
    date: "20 Juli 2026",
    title: "Merawat Niat, Meneguhkan Langkah di Tahun Konsolidasi",
    excerpt:
      "Setiap khidmat yang kita tunaikan hanya bernilai jika lahir dari niat yang lurus karena Allah. Mari kita perbarui niat, kuatkan barisan, dan pastikan setiap program membumi hingga ke pelosok Nusantara. Kaderisasi bukan sekadar menambah jumlah, melainkan mewariskan ruh perjuangan.",
    author: "Dr. Nashirul Haq — Ketua Umum DPP Hidayatullah",
  },
  {
    date: "6 Juli 2026",
    title: "Kemandirian Umat Bermula dari Kemandirian Diri",
    excerpt:
      "Umat tidak akan mandiri jika para kadernya masih bergantung pada kenyamanan. Didiklah diri untuk berkorban, bekerja keras, dan hidup sederhana. Dari keteladanan pribadi itulah lahir gerakan pemberdayaan ekonomi yang kokoh dan bermartabat.",
    author: "Dewan Mudir Hidayatullah",
  },
  {
    date: "23 Juni 2026",
    title: "Dakwah adalah Kerja Cinta, Bukan Sekadar Kewajiban",
    excerpt:
      "Sampaikan kebenaran dengan hikmah dan kelembutan. Para dai yang berkhidmat di perbatasan dan pulau terluar mengajarkan kita bahwa kesabaran adalah bahasa dakwah yang paling menyentuh. Rawatlah mereka, doakan mereka, dan hadirkan mereka dalam prioritas kita.",
    author: "Dr. Nashirul Haq — Ketua Umum DPP Hidayatullah",
  },
  {
    date: "9 Juni 2026",
    title: "Pendidikan Integral: Menyatukan Ilmu dan Iman",
    excerpt:
      "Cita-cita pendidikan kita adalah melahirkan generasi yang berilmu sekaligus bertakwa. Jangan pisahkan ruang kelas dari masjid, jangan ceraikan akal dari wahyu. Pesantren dan sekolah integral kita harus menjadi mata air peradaban.",
    author: "Dewan Mudir Hidayatullah",
  },
  {
    date: "26 Mei 2026",
    title: "Menyucikan Jiwa Sebelum Membangun Zaman",
    excerpt:
      "Perbaikan besar selalu dimulai dari dalam. Tazkiyatun nafs bukan kemewahan spiritual, melainkan fondasi bagi setiap amal yang hendak kita persembahkan. Kader yang hatinya bersih akan menuntun umat dengan cahaya, bukan dengan hawa nafsu.",
    author: "Dr. Nashirul Haq — Ketua Umum DPP Hidayatullah",
  },
  {
    date: "12 Mei 2026",
    title: "Menjaga Ukhuwah di Tengah Perbedaan",
    excerpt:
      "Perbedaan pandangan adalah keniscayaan, namun persatuan hati adalah pilihan. Jadikan musyawarah sebagai adab, bukan sekadar prosedur. Barisan yang rapat dan hati yang lapang adalah modal terbesar gerakan menuju satu abad khidmat.",
    author: "Dewan Mudir Hidayatullah",
  },
];

export default function TawajjuhatPage() {
  return (
    <>
      <Header />
      <PageHero
        eyebrow="Arahan Pimpinan"
        title="Tawajjuhat"
        description="Himpunan arahan dan tausiyah dari Ketua Umum dan Dewan Pengurus Pusat Hidayatullah — bimbingan spiritual sekaligus haluan gerakan yang menjadi pegangan kader dan umat dalam menapaki setiap fase perjuangan."
      />

      <main id="main-content" className="mx-auto max-w-[1320px] px-5 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-[860px]">
          <ul className="flex flex-col">
            {directives.map((d) => (
              <li
                key={d.title}
                className="group border-b border-line py-8 first:pt-0 last:border-0"
              >
                <p className="kicker text-accent">{d.date}</p>
                <h2 className="mt-2.5 font-serif text-[24px] font-semibold leading-snug tracking-[-0.015em] md:text-[28px]">
                  {d.title}
                </h2>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
                  {d.excerpt}
                </p>
                <p className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-ink-faint">
                  <ArrowRight size={14} weight="bold" className="text-accent" />
                  {d.author}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
