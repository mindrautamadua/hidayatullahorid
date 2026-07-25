// ============================================================
// Information architecture + fallback content for the
// Hidayatullah (hidayatullah.or.id) — official organization site rebuild.
//
// Live content is pulled from the or.id WordPress REST API via
// src/lib/source.ts. The sample data below is a graceful fallback
// so the site always renders (build, offline, API outage).
// ============================================================

export type Article = {
  slug: string;
  title: string;
  excerpt?: string;
  rubrik: string;
  rubrikSlug?: string; // authoritative category slug (from WP)
  author: string;
  readTime: number; // minutes
  time: string; // relative label
  dateISO?: string; // ISO published date (from WP), for schema/SEO
  img: string;
};

const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/hid-${seed}/${w}/${h}`;

/* ============================================================
   Slug + href helpers
   ============================================================ */

export function slugifyRubrik(rubrik: string): string {
  return rubrik
    .split("·")[0]
    .trim()
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function slugifyAuthor(author: string): string {
  return author
    .toLowerCase()
    .replace(/^(dr|prof|ust|ustadz|ustadzah|kh|hj?|tim|redaksi)\.?\s+/i, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function articleHref(a: Pick<Article, "slug">): string {
  return `/artikel/${a.slug}`;
}
export function authorHref(author: string): string {
  return `/penulis/${slugifyAuthor(author)}`;
}
export function rubrikHref(a: string | Pick<Article, "rubrik" | "rubrikSlug">): string {
  if (typeof a === "string") return `/rubrik/${slugifyRubrik(a)}`;
  return `/rubrik/${a.rubrikSlug ?? slugifyRubrik(a.rubrik)}`;
}

/* ============================================================
   Primary navigation — institutional mega-menu.
   Mirrors the or.id domains: Tentang, Berita, Hikmah,
   Pendapat, Jaringan, Tawajjuhat.
   ============================================================ */

export type NavChild = { label: string; href: string; desc?: string; soon?: boolean; external?: boolean };
export type NavGroup = { label: string; href: string; items?: NavChild[] };

// Faithful mirror of the live hidayatullah.or.id primary menu, mapped to
// this app's routes. Also the fallback when the live menu (getMenu) can't
// be parsed. Items with `external` open the source or.id page.
export const mainNav: NavGroup[] = [
  {
    label: "Tentang",
    href: "/tentang",
    items: [
      { label: "Sejarah", href: "/tentang#sejarah", desc: "Dari Gunung Tembak ke Nusantara" },
      { label: "Visi dan Misi", href: "/tentang#visi", desc: "Cita-cita peradaban Islam" },
      { label: "Kepengurusan", href: "/tentang#kepemimpinan", desc: "Majelis Syura & DPP" },
      { label: "Program Nasional", href: "/tentang#program", desc: "Dakwah, pendidikan, ekonomi" },
      { label: "Amal & Badan Usaha", href: "/jaringan", desc: "BMH, SAR, IMS, Baitul Wakaf" },
      { label: "Organisasi Pendukung", href: "/jaringan#pemuda", desc: "Pemuda & Muslimat Hidayatullah" },
      { label: "Kultur Gerakan", href: "/tentang#sejarah", desc: "Jati diri & Piagam Gunung Tembak" },
    ],
  },
  {
    label: "Berita",
    href: "/rubrik/berita",
    items: [
      { label: "Antarbangsa", href: "/rubrik/antarbangsa", desc: "Dunia Islam & geopolitik" },
      { label: "Nasional", href: "/rubrik/nasional", desc: "Kabar dari seluruh Indonesia" },
      { label: "Wilayah", href: "/rubrik/daerah", desc: "Jaringan wilayah & cabang" },
      { label: "Daerah", href: "/rubrik/daerah", desc: "Liputan daerah" },
      { label: "Semua Berita", href: "/rubrik/berita", desc: "Seluruh warta terbaru" },
    ],
  },
  {
    label: "Hikmah",
    href: "/rubrik/hikmah",
    items: [
      { label: "Tazkiyatun Nafs", href: "/rubrik/hikmah", desc: "Penyucian jiwa" },
      { label: "Refleksi", href: "/rubrik/inspirasi", desc: "Renungan & inspirasi" },
      { label: "Khutbah Jumat", href: "/rubrik/khutbah", desc: "Naskah siap baca" },
      { label: "Semua Hikmah", href: "/rubrik/hikmah", desc: "Seluruh rubrik hikmah" },
    ],
  },
  { label: "Pendapat", href: "/rubrik/kajian-dan-opini" },
  { label: "Jaringan", href: "/jaringan" },
  {
    label: "Layanan",
    href: "/layanan",
    items: [
      { label: "Belajar", href: "/layanan#belajar", desc: "Kampus, LMS, pustaka" },
      { label: "Beribadah", href: "/layanan#beribadah", desc: "Zakat, wakaf, kajian" },
      { label: "Bergabung", href: "/layanan#bergabung", desc: "Anggota, relawan, cabang" },
      { label: "Media & Informasi", href: "/layanan#media", desc: "Berita, TV, podcast" },
      { label: "Ekonomi Umat", href: "/layanan#ekonomi", desc: "Marketplace, koperasi" },
      { label: "Katalog Lengkap", href: "/layanan", desc: "Semua layanan digital" },
    ],
  },
  { label: "Tawajjuhat", href: "/tawajjuhat" },
];

/* ============================================================
   Digital network — or.id is the official node ("Situs Resmi"),
   alongside the media portal, the zakat institution, and the
   community platform.
   ============================================================ */

export type EcosystemNode = {
  key: string;
  name: string;
  role: string;
  desc: string;
  href: string;
  current: boolean;
  external: boolean;
};

export const ecosystem: EcosystemNode[] = [
  {
    key: "orid",
    name: "hidayatullah.or.id",
    role: "Situs Resmi",
    desc: "Organisasi, program, dan kepemimpinan",
    href: "/",
    current: true,
    external: false,
  },
  {
    key: "com",
    name: "hidayatullah.com",
    role: "Media Digital",
    desc: "Jurnalisme, berita, dan multimedia",
    href: "https://hidayatullah.com",
    current: false,
    external: true,
  },
  {
    key: "bmh",
    name: "bmh.or.id",
    role: "Laznas Zakat",
    desc: "Baitul Maal Hidayatullah",
    href: "https://bmh.or.id",
    current: false,
    external: true,
  },
  {
    key: "jamaah",
    name: "jamaah.net",
    role: "Platform Komunitas",
    desc: "Keanggotaan & kolaborasi",
    href: "https://jamaah.net",
    current: false,
    external: true,
  },
];

// The four institutional pillars.
export const networkPillars = ["Dakwah", "Pendidikan", "Sosial", "Ekonomi"];

/* ============================================================
   Organisation profile — pillars, impact, leadership.
   This is an ORGANISATION site (not a news portal); these
   drive the institutional homepage.
   ============================================================ */

export type Pillar = { key: string; label: string; desc: string; href: string };

export const programPillars: Pillar[] = [
  {
    key: "dakwah",
    label: "Dakwah & Kaderisasi",
    desc: "Menghadirkan dai tangguh hingga pelosok Nusantara, membina umat, dan menegakkan syiar Islam.",
    href: "/tentang#program",
  },
  {
    key: "pendidikan",
    label: "Pendidikan Integral",
    desc: "Jaringan pesantren dan sekolah integral berbasis tauhid, dari PAUD hingga perguruan tinggi.",
    href: "/tentang#program",
  },
  {
    key: "ekonomi",
    label: "Ekonomi Umat",
    desc: "Wakaf produktif, baitut tamwil, dan kemandirian ekonomi jamaah serta pesantren.",
    href: "/tentang#program",
  },
  {
    key: "sosial",
    label: "Sosial & Kemanusiaan",
    desc: "Zakat, tanggap bencana, layanan kesehatan, dan pemberdayaan dhuafa melalui Laznas BMH.",
    href: "/jaringan#bmh",
  },
];

export type Stat = { value: string; label: string };

export const impactStats: Stat[] = [
  { value: "1973", label: "Berdiri di Gunung Tembak" },
  { value: "34", label: "Provinsi terjangkau" },
  { value: "600+", label: "Cabang & perwakilan" },
  { value: "Ribuan", label: "Dai & pesantren" },
];

// A leadership directive surfaced on the homepage (Tawajjuhat teaser).
export const tawajjuhatLead = {
  quote:
    "Hidayatullah lahir bukan untuk menjadi besar, melainkan untuk menjadi bermanfaat. Besarnya sebuah gerakan diukur dari seberapa luas kebaikan yang ia tebarkan bagi umat dan bangsa.",
  author: "Dr. Nashirul Haq",
  role: "Ketua Umum DPP Hidayatullah",
  href: "/tawajjuhat",
};

/* ============================================================
   Digital Capability Catalog (Fase A of the DXP vision).
   Grouped by user intent, not by app name. Honest about what
   is live vs. still in development — no vaporware.
   ============================================================ */

export type ServiceStatus = "live" | "soon" | "internal";

export type DigitalService = {
  name: string;
  desc: string;
  href?: string;
  status: ServiceStatus;
  external?: boolean;
};

export type CapabilityGroup = {
  id: string;
  title: string;
  tagline: string;
  icon: string; // maps to a Phosphor icon in the page
  note?: string;
  services: DigitalService[];
};

export const serviceCatalog: CapabilityGroup[] = [
  {
    id: "belajar",
    title: "Belajar",
    tagline: "Menuntut ilmu, dari pesantren hingga layar",
    icon: "GraduationCap",
    services: [
      { name: "Video Dakwah", desc: "Kanal ceramah, kajian, dan dokumenter Islami.", href: "/rubrik/berita-video", status: "live" },
      { name: "Kampus Digital", desc: "Perkuliahan daring & profil perguruan tinggi Hidayatullah.", status: "soon" },
      { name: "LMS — Learning Center", desc: "Kelas, modul, dan sertifikasi kader & santri.", status: "soon" },
      { name: "Perpustakaan Digital", desc: "E-book, jurnal, dan kitab dalam satu pustaka.", status: "soon" },
    ],
  },
  {
    id: "beribadah",
    title: "Beribadah",
    tagline: "Menyempurnakan amal dan menunaikan hak harta",
    icon: "Mosque",
    services: [
      { name: "Zakat, Infak & Sedekah", desc: "Tunaikan ZIS amanah melalui Laznas BMH.", href: "/donasi", status: "live" },
      { name: "Wakaf Produktif", desc: "Wakaf uang & aset melalui Baitul Wakaf Hidayatullah.", href: "https://bmh.or.id", status: "live", external: true },
      { name: "Jadwal Kajian", desc: "Agenda kajian & majelis di masjid jaringan.", status: "soon" },
      { name: "Direktori Masjid", desc: "Temukan masjid & musala binaan terdekat.", status: "soon" },
    ],
  },
  {
    id: "bergabung",
    title: "Bergabung",
    tagline: "Menjadi bagian dari gerakan",
    icon: "UsersThree",
    services: [
      { name: "Keanggotaan (Jamaah)", desc: "Platform komunitas & identitas digital jamaah.", href: "https://jamaah.net", status: "live", external: true },
      { name: "Relawan & SAR", desc: "Bergabung dalam tim tanggap darurat & kemanusiaan.", href: "/jaringan#sar", status: "live" },
      { name: "Komunitas", desc: "Halaqah, majelis, dan komunitas minat.", status: "soon" },
      { name: "Direktori Cabang", desc: "Peta cabang & perwakilan di 34 provinsi.", status: "soon" },
    ],
  },
  {
    id: "media",
    title: "Media & Informasi",
    tagline: "Kabar dan syiar dari sumber tepercaya",
    icon: "Television",
    services: [
      { name: "Berita Resmi", desc: "Kabar organisasi, nasional, dan antarbangsa.", href: "/rubrik/berita", status: "live" },
      { name: "Portal Media Hidayatullah", desc: "Jurnalisme & liputan mendalam dunia Islam.", href: "https://hidayatullah.com", status: "live", external: true },
      { name: "Hidayatullah TV", desc: "Kanal video dakwah & dokumenter.", href: "https://www.youtube.com/@hidayatullahtv", status: "live", external: true },
      { name: "Podcast & Radio", desc: "Kajian audio untuk didengar di mana saja.", status: "soon" },
    ],
  },
  {
    id: "ekonomi",
    title: "Ekonomi Umat",
    tagline: "Kemandirian dan pemberdayaan ekonomi",
    icon: "Storefront",
    services: [
      { name: "Baitut Tamwil", desc: "Koperasi & lembaga keuangan mikro syariah.", status: "soon" },
      { name: "Marketplace Umat", desc: "Etalase produk pesantren, UMKM, & mitra.", status: "soon" },
      { name: "UMKM & Wirausaha", desc: "Pembinaan dan jejaring wirausaha jamaah.", status: "soon" },
    ],
  },
  {
    id: "organisasi",
    title: "Mengelola Organisasi",
    tagline: "Layanan internal pengurus & lembaga",
    icon: "Briefcase",
    services: [
      { name: "HRIS / Kepegawaian", desc: "Data SDM, kehadiran, dan pengembangan talenta.", status: "internal" },
      { name: "Keuangan", desc: "Anggaran, pelaporan, dan konsolidasi lembaga.", status: "internal" },
      { name: "Persuratan Digital", desc: "Disposisi & arsip surat lintas unit.", status: "internal" },
      { name: "Manajemen Aset", desc: "Inventaris tanah, bangunan, dan sarana.", status: "internal" },
    ],
  },
  {
    id: "kecerdasan",
    title: "Kecerdasan (AI)",
    tagline: "Asisten cerdas berbasis sumber tepercaya",
    icon: "Sparkle",
    note: "Layanan berbasis AI akan hadir dengan pengawasan dewan syariah — setiap jawaban keagamaan dirujuk ke sumber dan ulama, bukan keluaran mesin semata.",
    services: [
      { name: "AI Da'i", desc: "Asisten materi dakwah & khutbah.", status: "soon" },
      { name: "AI Qur'an", desc: "Pencarian ayat, tafsir, dan tematik.", status: "soon" },
      { name: "AI Konsultasi Syariah", desc: "Tanya-jawab dengan verifikasi ulama.", status: "soon" },
    ],
  },
];

/* ============================================================
   Jaringan / Amal Usaha — the autonomous bodies of the org.
   ============================================================ */

export type NetworkBody = {
  id: string;
  name: string;
  kind: string;
  desc: string;
  href?: string;
};

export const networkBodies: NetworkBody[] = [
  {
    id: "bmh",
    name: "Laznas BMH",
    kind: "Filantropi",
    desc: "Baitul Maal Hidayatullah — lembaga amil zakat nasional penghimpun dan penyalur zakat, infak, sedekah, dan wakaf.",
    href: "https://bmh.or.id",
  },
  {
    id: "institute",
    name: "Hidayatullah Institute",
    kind: "Kajian & Riset",
    desc: "Pusat kajian strategis, pemikiran Islam, dan kaderisasi intelektual gerakan.",
  },
  {
    id: "ims",
    name: "Islamic Medical Service",
    kind: "Kesehatan",
    desc: "Layanan kesehatan umat: klinik, aksi medis, dan respons darurat bencana.",
  },
  {
    id: "sar",
    name: "SAR Hidayatullah",
    kind: "Kemanusiaan",
    desc: "Tim tanggap darurat, pencarian, penyelamatan, dan mitigasi bencana lintas wilayah.",
  },
  {
    id: "pendidikan",
    name: "Pendidikan Integral",
    kind: "Pendidikan",
    desc: "Jaringan pesantren dan sekolah integral berbasis tauhid dari PAUD hingga perguruan tinggi.",
  },
  {
    id: "annisa",
    name: "Muslimat Hidayatullah",
    kind: "Keperempuanan",
    desc: "Pemberdayaan perempuan, keluarga, dan generasi melalui dakwah dan pendidikan.",
  },
  {
    id: "pemuda",
    name: "Pemuda Hidayatullah",
    kind: "Kepemudaan",
    desc: "Kaderisasi pemuda, kepeloporan, dan gerakan sosial berbasis komunitas.",
  },
  {
    id: "media",
    name: "Hidayatullah Media Network",
    kind: "Media",
    desc: "Ekosistem media dakwah: portal berita, majalah, dan kanal multimedia.",
    href: "https://hidayatullah.com",
  },
];

/* ============================================================
   Donation — channelled through Laznas BMH
   ============================================================ */

export type DonasiProgram = {
  slug: string;
  title: string;
  desc: string;
  raised: number;
  target: number;
  donors: number;
};

export const donasiPrograms: DonasiProgram[] = [
  {
    slug: "dai-pedalaman",
    title: "Bantu Dai Tangguh Pedalaman",
    desc: "Dukung ribuan dai yang berkhidmat di pelosok, pulau terluar, dan wilayah 3T.",
    raised: 742_300_000,
    target: 1_000_000_000,
    donors: 5120,
  },
  {
    slug: "wakaf-quran",
    title: "Wakaf Al-Qur'an Nusantara",
    desc: "Distribusikan mushaf ke pesantren, masjid, dan komunitas Muslim pedalaman.",
    raised: 214_600_000,
    target: 350_000_000,
    donors: 1680,
  },
  {
    slug: "peduli-palestina",
    title: "Hidayatullah Peduli Palestina",
    desc: "Salurkan bantuan kemanusiaan bagi warga sipil di Gaza melalui jalur tepercaya.",
    raised: 1_284_900_000,
    target: 1_500_000_000,
    donors: 9840,
  },
];

export const donasiNominal = [50_000, 100_000, 250_000, 500_000, 1_000_000];

export const donasiRekening = [
  { bank: "Bank Syariah Indonesia (BSI)", norek: "7100 3456 78", an: "Baitul Maal Hidayatullah" },
  { bank: "Bank Muamalat", norek: "301 0055 779", an: "Baitul Maal Hidayatullah" },
  { bank: "Mandiri", norek: "140 0012 345 678", an: "Baitul Maal Hidayatullah" },
];

/* ============================================================
   Rubrik cards surfaced on the homepage
   ============================================================ */

export const rubrikGrid = [
  { label: "Nasional", slug: "nasional", desc: "Kabar dari seluruh Indonesia", count: "2.300+ artikel" },
  { label: "Antarbangsa", slug: "antarbangsa", desc: "Dunia Islam & geopolitik", count: "160+ artikel" },
  { label: "Daerah", slug: "daerah", desc: "Jaringan wilayah & cabang", count: "2.100+ artikel" },
  { label: "Hikmah", slug: "hikmah", desc: "Tazkiyatun nafs & renungan", count: "570+ artikel" },
  { label: "Dakwah", slug: "dakwah", desc: "Syiar & kaderisasi umat", count: "240+ artikel" },
  { label: "Ekonomi", slug: "ekonomi", desc: "Ekonomi umat & syariah", count: "100+ artikel" },
];

/* ============================================================
   Editorial columns (Pendapat) — pull-quote cards
   ============================================================ */

export type Column = { slug: string; title: string; pull: string; author: string; role: string };

export const columns: Column[] = [
  {
    slug: "kolom-adab-sebelum-ilmu",
    title: "Adab Sebelum Ilmu: Warisan yang Mulai Terlupakan",
    pull: "Ilmu tanpa adab ibarat pohon tanpa akar; tampak menjulang, tetapi mudah tumbang oleh angin pertama.",
    author: "Dr. Nashirul Haq",
    role: "Ketua Umum DPP Hidayatullah",
  },
  {
    slug: "kolom-membaca-zaman",
    title: "Membaca Tanda Zaman Tanpa Kehilangan Akal Sehat",
    pull: "Kewaspadaan terhadap akhir zaman semestinya melahirkan amal, bukan kepanikan yang melumpuhkan.",
    author: "Asih Subagyo",
    role: "Peneliti Hidayatullah Institute",
  },
  {
    slug: "kolom-kemandirian-umat",
    title: "Kemandirian Umat Dimulai dari Kemandirian Pesantren",
    pull: "Selama umat bergantung pada belas kasih pihak lain, kemuliaannya akan selalu digadaikan.",
    author: "Alimin Mukhtar",
    role: "Dewan Mudir Hidayatullah",
  },
];

/* ============================================================
   Sample fallback dataset (institutional tone, Indonesian)
   ============================================================ */

export const lead: Article = {
  slug: "silaturahmi-nasional-hidayatullah",
  title:
    "Silaturahmi Nasional Hidayatullah Tegaskan Komitmen Dakwah dan Kemandirian Umat",
  excerpt:
    "Ribuan kader dari 34 provinsi berkumpul untuk mengonsolidasikan agenda dakwah, pendidikan integral, dan pemberdayaan ekonomi umat menuju satu abad gerakan.",
  rubrik: "Kabar Hidayatullah",
  rubrikSlug: "kabar-hidayatullah",
  author: "Redaksi",
  readTime: 6,
  time: "1 jam lalu",
  img: img("silatnas", 1600, 1100),
};

export const secondaryLead: Article[] = [
  {
    slug: "dai-tangguh-perbatasan",
    title: "Catatan dari Perbatasan: Dai Tangguh yang Menyalakan Cahaya di Pelosok",
    rubrik: "Dakwah",
    rubrikSlug: "dakwah",
    author: "Ahmad Fauzan",
    readTime: 7,
    time: "2 jam lalu",
    img: img("dai-perbatasan", 900, 700),
  },
  {
    slug: "beasiswa-santri-integral",
    title: "Pesantren Integral Buka Ribuan Kursi Beasiswa Santri Yatim dan Dhuafa",
    rubrik: "Pendidikan",
    rubrikSlug: "dikdasmen",
    author: "Nurul Hidayah",
    readTime: 5,
    time: "3 jam lalu",
    img: img("beasiswa-santri", 900, 700),
  },
];

export const latest: Article[] = [
  {
    slug: "konsolidasi-dakwah-timur",
    title: "Konsolidasi Dakwah Indonesia Timur Perkuat Jaringan Pos Dai",
    rubrik: "Nasional",
    rubrikSlug: "nasional",
    author: "Salman Alfarisi",
    readTime: 4,
    time: "4 jam lalu",
    img: img("dakwah-timur", 800, 600),
  },
  {
    slug: "solidaritas-dunia-islam-gaza",
    title: "Solidaritas Dunia Islam untuk Gaza Terus Menguat di Berbagai Negara",
    rubrik: "Antarbangsa",
    rubrikSlug: "antarbangsa",
    author: "Redaksi Antarbangsa",
    readTime: 5,
    time: "5 jam lalu",
    img: img("gaza-solidaritas", 800, 600),
  },
  {
    slug: "wakaf-produktif-pesantren",
    title: "Wakaf Produktif Dorong Kemandirian Ekonomi Pesantren di Kalimantan",
    rubrik: "Ekonomi",
    rubrikSlug: "ekonomi",
    author: "Ahmad Fauzan",
    readTime: 5,
    time: "6 jam lalu",
    img: img("wakaf-produktif", 800, 600),
  },
  {
    slug: "aksi-medis-ims-bencana",
    title: "Islamic Medical Service Terjunkan Tim Aksi Medis ke Lokasi Bencana",
    rubrik: "Kemanusiaan",
    rubrikSlug: "kemanusiaan",
    author: "Fitri Ramadhani",
    readTime: 4,
    time: "7 jam lalu",
    img: img("ims-medis", 800, 600),
  },
  {
    slug: "musyawarah-nasional-kaderisasi",
    title: "Musyawarah Nasional Bahas Peta Jalan Kaderisasi Satu Abad",
    rubrik: "Kabar Hidayatullah",
    rubrikSlug: "kabar-hidayatullah",
    author: "Redaksi",
    readTime: 6,
    time: "9 jam lalu",
    img: img("munas", 800, 600),
  },
  {
    slug: "santri-tahfizh-nusantara",
    title: "Gerakan Santri Tahfizh Nusantara Cetak Ribuan Penghafal Al-Qur'an",
    rubrik: "Pendidikan",
    rubrikSlug: "dikdasmen",
    author: "Zulkifli Anwar",
    readTime: 5,
    time: "11 jam lalu",
    img: img("tahfizh", 800, 600),
  },
];

export const popular: Article[] = [
  {
    slug: "tazkiyatun-nafs-ikhlas",
    title: "Tazkiyatun Nafs: Merawat Keikhlasan di Tengah Riuh Dunia",
    rubrik: "Hikmah",
    rubrikSlug: "hikmah",
    author: "Ust. Abdullah Said",
    readTime: 6,
    time: "Kemarin",
    img: img("ikhlas", 400, 400),
  },
  {
    slug: "meneladani-ketegasan-umar",
    title: "Meneladani Ketegasan dan Kelembutan Umar bin Khattab",
    rubrik: "Figur",
    rubrikSlug: "figur",
    author: "Zulkifli Anwar",
    readTime: 8,
    time: "Kemarin",
    img: img("umar", 400, 400),
  },
  {
    slug: "makna-hijrah-transformasi",
    title: "Memaknai Hijrah sebagai Transformasi Diri, Bukan Sekadar Pindah",
    rubrik: "Inspirasi",
    rubrikSlug: "inspirasi",
    author: "Nurul Hidayah",
    readTime: 5,
    time: "2 hari lalu",
    img: img("hijrah", 400, 400),
  },
  {
    slug: "ekonomi-umat-berdikari",
    title: "Membangun Ekonomi Umat yang Berdikari dari Bawah",
    rubrik: "Ekonomi",
    rubrikSlug: "ekonomi",
    author: "Alimin Mukhtar",
    readTime: 7,
    time: "2 hari lalu",
    img: img("ekonomi-umat", 400, 400),
  },
  {
    slug: "kesehatan-jiwa-perspektif-islam",
    title: "Perspektif Islam tentang Kesehatan Jiwa dan Ketenangan Batin",
    rubrik: "Hikmah",
    rubrikSlug: "hikmah",
    author: "Fitri Ramadhani",
    readTime: 6,
    time: "3 hari lalu",
    img: img("jiwa", 400, 400),
  },
];

export const kajian: Article = {
  slug: "ghazwul-fikr-abad-digital",
  title: "Ghazwul Fikr di Abad Digital: Ketika Medan Perang Berpindah ke Layar",
  excerpt:
    "Perang pemikiran tak lagi berwujud pasukan dan senjata. Ia hadir dalam algoritma, narasi, dan hiburan yang perlahan membentuk cara pandang umat terhadap dunia dan akhirat.",
  rubrik: "Kajian Islam",
  rubrikSlug: "kajian-islam",
  author: "Dr. Nashirul Haq",
  readTime: 11,
  time: "Edisi pekan ini",
  img: img("ghazwul", 1400, 1000),
};

export const kajianSub: Article[] = [
  {
    slug: "sabar-bukan-berarti-diam",
    title: "Sabar Bukan Berarti Diam: Menimbang Makna Ketabahan",
    rubrik: "Hikmah",
    rubrikSlug: "hikmah",
    author: "Nurul Hidayah",
    readTime: 5,
    time: "3 hari lalu",
    img: img("sabar", 600, 400),
  },
  {
    slug: "baitul-hikmah-baghdad",
    title: "Baitul Hikmah: Ketika Baghdad Menjadi Ibu Kota Ilmu Dunia",
    rubrik: "Figur",
    rubrikSlug: "figur",
    author: "Zulkifli Anwar",
    readTime: 8,
    time: "4 hari lalu",
    img: img("baghdad", 600, 400),
  },
  {
    slug: "adab-bermedia-sosial",
    title: "Menimbang Adab Bermedia Sosial dalam Timbangan Syariat",
    rubrik: "Kajian Islam",
    rubrikSlug: "kajian-islam",
    author: "Asih Subagyo",
    readTime: 6,
    time: "5 hari lalu",
    img: img("medsos", 600, 400),
  },
];

// "Antarbangsa" — the world-of-Islam desk (accent band).
export const antarbangsa: Article[] = [
  {
    slug: "gaza-relawan-medis-catatan",
    title: "Catatan Relawan Medis Indonesia dari Reruntuhan Rumah Sakit di Gaza",
    excerpt:
      "Di antara keterbatasan alat dan pasokan, tim kemanusiaan terus berjuang menolong korban. Sebuah laporan langsung tentang ketahanan dan harapan yang tak padam.",
    rubrik: "Antarbangsa",
    rubrikSlug: "antarbangsa",
    author: "dr. Yasmin Abdullah",
    readTime: 10,
    time: "Hari ini",
    img: img("gaza-medis", 1200, 900),
  },
  {
    slug: "al-quds-warisan-peradaban",
    title: "Al-Quds: Warisan Peradaban yang Terus Diperebutkan",
    rubrik: "Antarbangsa",
    rubrikSlug: "antarbangsa",
    author: "Zulkifli Anwar",
    readTime: 8,
    time: "Hari ini",
    img: img("alquds", 700, 500),
  },
  {
    slug: "muslim-dunia-solidaritas",
    title: "Solidaritas Umat Dunia: Bantuan Kemanusiaan Tembus Rekor Baru",
    rubrik: "Antarbangsa",
    rubrikSlug: "antarbangsa",
    author: "Redaksi Antarbangsa",
    readTime: 4,
    time: "Kemarin",
    img: img("solidaritas", 700, 500),
  },
];

export const khutbah = {
  slug: "khutbah-syukur-nikmat-waktu",
  title: "Naskah Khutbah Jumat: Mensyukuri Nikmat Waktu yang Kian Cepat Berlalu",
  excerpt:
    "Materi khutbah siap baca lengkap dengan rukun, dalil, dan penutup — diperbarui setiap Kamis untuk para khatib di seluruh Nusantara.",
  author: "Tim Redaksi Khutbah",
  img: img("khutbah", 1000, 700),
};

/* ============================================================
   Aggregation helpers (used by detail + rubrik fallbacks)
   ============================================================ */

const columnsAsArticles: Article[] = columns.map((c) => ({
  slug: c.slug,
  title: c.title,
  excerpt: c.pull,
  rubrik: "Kajian dan Opini",
  rubrikSlug: "kajian-dan-opini",
  author: c.author,
  readTime: 6,
  time: "Pekan ini",
  img: img(c.slug, 1200, 800),
}));

const khutbahAsArticle: Article = {
  slug: khutbah.slug,
  title: khutbah.title,
  excerpt: khutbah.excerpt,
  rubrik: "Khutbah",
  rubrikSlug: "khutbah",
  author: khutbah.author,
  readTime: 9,
  time: "Kamis ini",
  img: khutbah.img,
};

export const allArticles: Article[] = [
  lead,
  ...secondaryLead,
  ...latest,
  ...popular,
  kajian,
  ...kajianSub,
  ...antarbangsa,
  ...columnsAsArticles,
  khutbahAsArticle,
].filter((a, i, arr) => arr.findIndex((b) => b.slug === a.slug) === i);

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getArticlesByRubrik(rubrikSlug: string): Article[] {
  return allArticles.filter(
    (a) => (a.rubrikSlug ?? slugifyRubrik(a.rubrik)) === rubrikSlug,
  );
}

export function getRelated(slug: string, rubrik: string, n = 3): Article[] {
  const base = slugifyRubrik(rubrik);
  const same = allArticles.filter(
    (a) => a.slug !== slug && slugifyRubrik(a.rubrik) === base,
  );
  const pool = same.length >= n ? same : [...same, ...allArticles.filter((a) => a.slug !== slug)];
  return pool.filter((a, i, arr) => arr.findIndex((b) => b.slug === a.slug) === i).slice(0, n);
}

export const rubrikLabels: Record<string, string> = {
  berita: "Berita",
  nasional: "Nasional",
  antarbangsa: "Antarbangsa",
  internasional: "Internasional",
  daerah: "Daerah",
  "kabar-hidayatullah": "Kabar Hidayatullah",
  "berita-utama": "Berita Utama",
  headline: "Headline",
  hikmah: "Hikmah",
  dakwah: "Dakwah",
  inspirasi: "Inspirasi",
  "kajian-islam": "Kajian Islam",
  "kajian-dan-opini": "Kajian dan Opini",
  khutbah: "Khutbah Jumat",
  figur: "Figur",
  ekonomi: "Ekonomi",
  kesehatan: "Kesehatan",
  keindonesiaan: "Keindonesiaan",
  keluarga: "Keluarga",
  kemanusiaan: "Kemanusiaan",
  "berita-video": "Berita Video",
  dikdasmen: "Pendidikan",
  bmh: "Baitul Maal Hidayatullah",
};

// Generated reading body — placeholder editorial prose for the sample fallback.
export function getArticleBody(a: Article): string[] {
  const topic = a.title.replace(/:.*/, "");
  return [
    `${a.excerpt ?? topic + " menjadi perbincangan di tengah umat."} Redaksi menghimpun sejumlah keterangan dari para pihak untuk menyajikan gambaran yang utuh dan berimbang bagi pembaca.`,
    `Menurut sejumlah pihak, persoalan ini tidak dapat dilihat secara hitam-putih. Ada dimensi historis, sosial, sekaligus keagamaan yang saling berkelindan. Karena itu, sikap yang bijak adalah menimbang setiap aspek dengan ilmu dan kepala dingin.`,
    `"Umat perlu dibekali pemahaman yang benar agar tidak mudah terprovokasi," ujar salah seorang narasumber. Ia menekankan pentingnya merujuk kepada sumber yang otoritatif serta ulama yang kredibel sebelum mengambil kesimpulan.`,
    `Dari sisi praktis, langkah konkret yang bisa diambil masyarakat cukup beragam: memperkuat literasi, menjaga ukhuwah, hingga terlibat aktif dalam program sosial yang memberi manfaat nyata bagi sesama.`,
    `Pada akhirnya, setiap peristiwa menyimpan pelajaran bagi mereka yang mau merenung. Semoga catatan ini menjadi pengingat bersama untuk terus memperbaiki diri, memperkuat iman, dan menebar kebaikan.`,
  ];
}

/* Ticker headlines fallback */
export const tickerFallback = [
  "Silaturahmi Nasional tegaskan komitmen dakwah dan kemandirian umat",
  "Islamic Medical Service terjunkan tim aksi medis ke lokasi bencana",
  "Wakaf produktif dorong kemandirian ekonomi pesantren",
  "Solidaritas dunia Islam untuk Gaza terus menguat",
];
