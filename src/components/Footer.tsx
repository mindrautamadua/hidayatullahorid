import Image from "next/image";
import Link from "next/link";
import { FacebookLogo, InstagramLogo, YoutubeLogo, XLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ecosystem, networkPillars } from "@/lib/content";

// Official Hidayatullah social profiles.
const socials = [
  { label: "Facebook", href: "https://www.facebook.com/hidayatullahdotcom", Icon: FacebookLogo },
  { label: "Instagram", href: "https://instagram.com/hidayatullahmedia", Icon: InstagramLogo },
  { label: "YouTube", href: "https://www.youtube.com/@hidayatullahtv", Icon: YoutubeLogo },
  { label: "X (Twitter)", href: "https://twitter.com/hidayatullahcom", Icon: XLogo },
];

const cols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Kanal Berita",
    links: [
      { label: "Nasional", href: "/rubrik/nasional" },
      { label: "Antarbangsa", href: "/rubrik/antarbangsa" },
      { label: "Daerah", href: "/rubrik/daerah" },
      { label: "Kabar Hidayatullah", href: "/rubrik/kabar-hidayatullah" },
      { label: "Ekonomi", href: "/rubrik/ekonomi" },
      { label: "Berita Video", href: "/rubrik/berita-video" },
    ],
  },
  {
    title: "Hikmah & Pendapat",
    links: [
      { label: "Tazkiyatun Nafs", href: "/rubrik/hikmah" },
      { label: "Kajian Islam", href: "/rubrik/kajian-islam" },
      { label: "Khutbah Jumat", href: "/rubrik/khutbah" },
      { label: "Figur", href: "/rubrik/figur" },
      { label: "Kolom & Opini", href: "/rubrik/kajian-dan-opini" },
      { label: "Tawajjuhat", href: "/tawajjuhat" },
    ],
  },
  {
    title: "Organisasi",
    links: [
      { label: "Tentang Hidayatullah", href: "/tentang" },
      { label: "Amal Usaha & Jaringan", href: "/jaringan" },
      { label: "Redaksi", href: "/redaksi" },
      { label: "Donasi (Laznas BMH)", href: "/donasi" },
      { label: "Kontak", href: "/kontak" },
      { label: "Pencarian", href: "/cari" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-raised">
      <div className="mx-auto max-w-[1320px] px-5 py-14 md:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo-hidayatullah.png"
                alt="Logo Hidayatullah"
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-[22px] font-semibold tracking-tight">
                  Hidayatullah
                </span>
                <span className="mt-0.5 whitespace-nowrap text-[8.5px] font-bold uppercase tracking-[0.14em] text-accent">
                  Membangun Peradaban Islam
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-ink-soft">
              Situs resmi Hidayatullah — organisasi dakwah, pendidikan, sosial, dan
              ekonomi umat yang berkhidmat lintas Nusantara dan dunia Islam.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {networkPillars.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-line px-2.5 py-0.5 text-[11.5px] font-medium text-ink-soft"
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent"
                >
                  <s.Icon size={17} weight="fill" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mb-4 text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
                {c.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="link-underline text-[14px] text-ink-soft hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Digital network */}
        <div className="mt-14 border-t border-line pt-10">
          <h4 className="mb-5 text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
            Jaringan Digital Hidayatullah
          </h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ecosystem.map((n) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-[17px] font-semibold tracking-tight">
                      {n.name}
                    </span>
                    {n.current ? (
                      <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-ink">
                        Anda di sini
                      </span>
                    ) : (
                      <ArrowUpRight
                        size={16}
                        weight="bold"
                        className="text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    )}
                  </div>
                  <p className="mt-1 text-[12px] font-semibold uppercase tracking-wide text-accent">
                    {n.role}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{n.desc}</p>
                </>
              );
              const cls = `group block rounded-[var(--radius-lg)] border p-5 transition-colors ${
                n.current
                  ? "border-accent/40 bg-accent-tint/40"
                  : "border-line bg-paper hover:border-accent/40"
              }`;
              return n.current ? (
                <div key={n.key} className={cls} aria-current="page">
                  {inner}
                </div>
              ) : (
                <a
                  key={n.key}
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-[13px] text-ink-faint md:flex-row md:items-center">
          <p>© 2026 Hidayatullah. Seluruh hak cipta dilindungi.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/kebijakan-privasi" className="hover:text-ink">Kebijakan Privasi</Link>
            <Link href="/syarat-penggunaan" className="hover:text-ink">Syarat Penggunaan</Link>
            <Link href="/disclaimer" className="hover:text-ink">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
