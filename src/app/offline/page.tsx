"use client";

import { CloudSlash, ArrowClockwise } from "@phosphor-icons/react";

export default function Offline() {
  return (
    <main id="main-content" className="mx-auto flex min-h-[80vh] max-w-[760px] flex-col items-center justify-center px-5 py-24 text-center md:px-6">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-tint text-accent">
        <CloudSlash size={30} weight="bold" />
      </span>
      <h1 className="mt-6 font-serif text-[28px] font-semibold tracking-[-0.02em] md:text-[36px]">
        Anda sedang offline
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-ink-soft">
        Koneksi internet terputus. Beberapa halaman yang pernah Anda buka masih
        bisa diakses. Periksa kembali koneksi Anda lalu muat ulang.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
      >
        <ArrowClockwise size={16} weight="bold" /> Muat ulang
      </button>
    </main>
  );
}
