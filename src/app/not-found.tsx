import Link from "next/link";
import { House, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { rubrikGrid } from "@/lib/content";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="mx-auto flex min-h-[60vh] max-w-[760px] flex-col items-center justify-center px-5 py-24 text-center md:px-6">
        <p className="font-serif text-[96px] font-semibold leading-none tracking-tight text-accent md:text-[128px]">
          404
        </p>
        <h1 className="mt-2 font-serif text-[28px] font-semibold tracking-[-0.02em] md:text-[36px]">
          Halaman tidak ditemukan
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-ink-soft">
          Maaf, halaman yang Anda cari mungkin telah dipindahkan atau tidak lagi tersedia.
          Silakan kembali ke beranda atau telusuri rubrik pilihan kami.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
          >
            <House size={16} weight="bold" /> Beranda
          </Link>
          <Link
            href="/cari"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <MagnifyingGlass size={16} weight="bold" /> Cari artikel
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {rubrikGrid.slice(0, 6).map((r) => (
            <Link
              key={r.slug}
              href={`/rubrik/${r.slug}`}
              className="rounded-full border border-line px-3.5 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
