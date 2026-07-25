import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { LeaderAvatar } from "@/components/LeaderAvatar";

export const metadata: Metadata = {
  title: "Tentang Hidayatullah",
  description:
    "Profil Hidayatullah — organisasi massa Islam yang lahir dari pesantren di Gunung Tembak, Balikpapan, dan berkhidmat di bidang dakwah, pendidikan, sosial, dan ekonomi umat.",
};

const stats = [
  { value: "1973", label: "Berdiri di Balikpapan" },
  { value: "34", label: "Provinsi jaringan" },
  { value: "300+", label: "Kabupaten/kota" },
  { value: "4", label: "Pilar khidmat" },
];

// Susunan Dewan Pengurus Pusat (DPP) Hidayatullah periode 2025–2030,
// hasil Munas VI (22 Oktober 2025). Taruh foto di public/pengurus/<slug>.jpg —
// kartu otomatis menampilkan inisial selama foto belum ada.
const leaders = [
  { role: "Ketua Umum", name: "KH. Naspi Arsyad, Lc.", photo: "/pengurus/naspi-arsyad.jpg" },
  { role: "Sekretaris Jenderal", name: "Dr. Nanang Noerpatria, S.Pd., M.Pd.I", photo: "/pengurus/nanang-noerpatria.jpg" },
  { role: "Bendahara Umum", name: "Suwito Abdul Fatah, S.Pd., M.M", photo: "/pengurus/suwito-abdul-fatah.jpg" },
  { role: "Ketua Bidang Pelayanan Ummat", name: "Shohibul Anwar, S.Pd., M.H.I", photo: "/pengurus/shohibul-anwar.jpg" },
  { role: "Ketua Bidang Organisasi", name: "Dr. Dudung Amadung Abdullah, S.H., M.H", photo: "/pengurus/dudung-amadung-abdullah.jpg" },
  { role: "Ketua Bidang Perkaderan & Pembinaan Anggota", name: "Dr. Abdul Ghofar Hadi, S.Sos.I., M.S.I", photo: "/pengurus/abdul-ghofar-hadi.jpg" },
  { role: "Ketua Bidang Pendidikan", name: "Muzakkir Usman, M.Pd., Ph.D", photo: "/pengurus/muzakkir-usman.jpg" },
  { role: "Ketua Bidang Ekonomi", name: "Drs. H. Wahyu Rahman, M.E", photo: "/pengurus/wahyu-rahman.jpg" },
];

const programs = [
  {
    title: "Dakwah & Kaderisasi",
    desc: "Menyiapkan dai tangguh dan pos dakwah hingga ke pelosok, pulau terluar, serta wilayah 3T di seluruh Nusantara.",
  },
  {
    title: "Pendidikan Integral & Pesantren",
    desc: "Jaringan pesantren dan sekolah integral berbasis tauhid — dari PAUD hingga perguruan tinggi — yang menyatukan ilmu dan iman.",
  },
  {
    title: "Sosial-Kemanusiaan",
    desc: "Khidmat kemanusiaan melalui Laznas BMH, Islamic Medical Service, dan tim SAR Hidayatullah untuk respons bencana dan pemberdayaan dhuafa.",
  },
  {
    title: "Ekonomi Umat & Wakaf",
    desc: "Menggerakkan wakaf produktif dan kemandirian ekonomi pesantren agar umat berdikari dan bermartabat.",
  },
];

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <>
      <p className="kicker mb-3 text-accent">{kicker}</p>
      <h2 className="rule-accent font-serif text-[27px] font-semibold tracking-[-0.02em] md:text-[33px]">
        {title}
      </h2>
    </>
  );
}

export default function TentangPage() {
  return (
    <>
      <Header />
      <PageHero
        eyebrow="Tentang Kami"
        title="Membangun peradaban Islam, berkhidmat untuk umat"
        description="Hidayatullah adalah organisasi massa Islam yang bergerak di bidang dakwah, pendidikan, sosial, dan ekonomi — tumbuh dari sebuah pesantren di Kalimantan Timur menjadi gerakan yang hadir di seluruh penjuru Nusantara."
      />

      <main id="main-content" className="mx-auto max-w-[1320px] px-5 py-12 md:px-6 md:py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[var(--radius-lg)] border border-line bg-paper-raised p-6 text-center"
            >
              <p className="font-serif text-[34px] font-semibold tracking-tight text-accent">
                {s.value}
              </p>
              <p className="mt-1 text-[13px] text-ink-soft">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Sejarah */}
        <section id="sejarah" className="mt-16 scroll-mt-28">
          <SectionTitle kicker="Sejarah" title="Dari Gunung Tembak ke Nusantara" />
          <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="prose-hid max-w-[760px] space-y-4 text-[16px] leading-relaxed text-ink-soft lg:col-span-7">
              <p>
                Hidayatullah lahir pada tahun 1973 sebagai sebuah pesantren di
                Gunung Tembak, Balikpapan, Kalimantan Timur, yang dirintis oleh
                Ustadz Abdullah Said bersama sekelompok kecil santri. Dari lahan
                yang semula tandus, tumbuh sebuah model pendidikan dan
                pembinaan yang memadukan tarbiyah, kemandirian, dan dakwah.
              </p>
              <p>
                Seiring waktu, gerakan ini berkembang melampaui batas pesantren
                dan bertransformasi menjadi organisasi massa Islam berskala
                nasional. Cabang dan perwakilannya kini tersebar di 34 provinsi,
                menaungi ribuan kader, dai, pendidik, dan relawan yang berkhidmat
                di berbagai medan pengabdian.
              </p>
              <p>
                Menjelang satu abad perjalanannya, Hidayatullah meneguhkan diri
                sebagai gerakan tarbiyah dan dakwah yang berakar pada nilai
                tauhid, dengan cita-cita membangun peradaban Islam dari bawah —
                dari keluarga, masjid, dan pesantren, menuju kemaslahatan umat
                dan bangsa.
              </p>
            </div>
            <aside className="lg:col-span-5">
              <div className="rounded-[var(--radius-lg)] border border-line bg-paper-raised p-7">
                <p className="kicker text-accent">Pendiri</p>
                <p className="mt-2 font-serif text-[22px] font-semibold tracking-[-0.01em]">
                  Ustadz Abdullah Said
                </p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
                  Perintis gerakan yang menanamkan ruh perjuangan, kemandirian,
                  dan keikhlasan sebagai warisan abadi bagi para kader
                  Hidayatullah.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* Visi & Misi */}
        <section id="visi" className="mt-16 scroll-mt-28">
          <SectionTitle kicker="Arah Gerakan" title="Visi & Misi" />
          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="rounded-[var(--radius-lg)] bg-accent p-7 text-accent-ink lg:col-span-5">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] opacity-80">
                Visi
              </h3>
              <p className="mt-3 font-serif text-[21px] leading-snug">
                Terwujudnya peradaban Islam yang rahmatan lil ‘alamin melalui
                dakwah, pendidikan, dan pemberdayaan umat.
              </p>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-line p-7 lg:col-span-7">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-accent">
                Misi
              </h3>
              <ul className="mt-4 space-y-3 text-[15.5px] leading-relaxed text-ink-soft">
                <li>— Menegakkan dakwah dan kaderisasi yang berkesinambungan.</li>
                <li>— Menyelenggarakan pendidikan integral berbasis tauhid.</li>
                <li>— Menghadirkan khidmat sosial-kemanusiaan bagi umat dan bangsa.</li>
                <li>— Membangun kemandirian dan pemberdayaan ekonomi umat.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Kepemimpinan */}
        <section id="kepemimpinan" className="mt-16 scroll-mt-28">
          <SectionTitle kicker="Kepemimpinan" title="Dewan Pengurus Pusat" />
          <p className="mt-6 max-w-[760px] text-[16px] leading-relaxed text-ink-soft">
            Kepemimpinan Hidayatullah dijalankan secara kolektif melalui Dewan
            Pengurus Pusat (DPP) periode 2025–2030, di bawah bimbingan Rais &lsquo;Aam
            dan Majelis Syura sebagai penjaga arah gerakan.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((m) => (
              <div
                key={m.role}
                className="rounded-[var(--radius-lg)] border border-line p-6"
              >
                <div className="flex items-center gap-4">
                  <LeaderAvatar name={m.name} photo={m.photo} />
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-wide text-accent">
                      {m.role}
                    </p>
                    <p className="font-serif text-[16.5px] font-semibold leading-snug">
                      {m.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Program Nasional */}
        <section id="program" className="mt-16 scroll-mt-28">
          <SectionTitle kicker="Khidmat" title="Program Nasional" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {programs.map((p) => (
              <div
                key={p.title}
                className="rounded-[var(--radius-lg)] border border-line bg-paper-raised p-7"
              >
                <h3 className="font-serif text-[20px] font-semibold tracking-[-0.01em]">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Karier */}
        <section
          id="karier"
          className="mt-16 flex scroll-mt-28 flex-col items-start justify-between gap-6 rounded-[var(--radius-lg)] border border-line bg-paper-raised p-8 md:flex-row md:items-center md:p-10"
        >
          <div className="max-w-xl">
            <p className="kicker mb-3 text-accent">Karier</p>
            <h2 className="font-serif text-[24px] font-semibold tracking-[-0.02em] md:text-[28px]">
              Berkhidmat bersama Hidayatullah
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              Kami membuka kesempatan bagi dai, pendidik, relawan, dan talenta
              profesional yang ingin mengabdikan diri untuk umat melalui jaringan
              Hidayatullah.
            </p>
          </div>
          <Link
            href="/kontak"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-3 text-[14px] font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Hubungi Sekretariat <ArrowRight size={15} weight="bold" />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
