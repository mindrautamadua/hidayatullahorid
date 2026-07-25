"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlass } from "@phosphor-icons/react";

export function SearchBox({ initial = "" }: { initial?: string }) {
  const [q, setQ] = useState(initial);
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/cari?q=${encodeURIComponent(term)}` : "/cari");
  };

  return (
    <form onSubmit={submit} role="search" className="relative">
      <MagnifyingGlass
        size={20}
        weight="bold"
        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-ink-faint"
      />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus
        placeholder="Cari berita, kajian, fiqih, tokoh…"
        aria-label="Kata kunci pencarian"
        className="w-full rounded-full border border-line-strong bg-paper-raised py-4 pl-14 pr-32 font-serif text-[18px] text-ink outline-none transition-colors placeholder:text-ink-faint placeholder:font-sans placeholder:text-[16px] focus:border-accent focus:ring-2 focus:ring-accent/25"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-accent-ink transition-colors hover:bg-accent-hover active:scale-[0.98]"
      >
        Cari
      </button>
    </form>
  );
}
