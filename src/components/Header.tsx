"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MagnifyingGlass,
  List,
  X,
  Sun,
  MoonStars,
  CaretDown,
  HandHeart,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { mainNav } from "@/lib/content";
import { UtilityBar } from "./UtilityBar";

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("hid-orid-theme");
    const isDark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
  }, []);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    setDark(!dark);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("hid-orid-theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Ganti tema terang atau gelap"
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink active:scale-95"
    >
      {dark ? <Sun size={17} weight="bold" /> : <MoonStars size={17} weight="bold" />}
    </button>
  );
}

/* Desktop nav item — a domain link with a state-controlled mega-panel.
   Only one panel is open at a time (tracked by the parent), so panels can
   never stack. Opens on pointer-enter / focus; the parent closes it on leave. */
function NavGroup({
  group,
  active,
  current,
  onOpen,
  onClose,
}: {
  group: (typeof mainNav)[number];
  active: boolean;
  current: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  if (!group.items?.length) {
    return (
      <Link
        href={group.href}
        onMouseEnter={onOpen}
        onFocus={onOpen}
        aria-current={current ? "page" : undefined}
        className={`link-underline py-2 text-[15px] font-medium transition-colors ${
          current ? "text-accent" : "text-ink-soft hover:text-ink"
        }`}
      >
        {group.label}
      </Link>
    );
  }

  const wide = group.items.length > 6;

  return (
    <div className="relative" onMouseEnter={onOpen} onFocus={onOpen}>
      <Link
        href={group.href}
        aria-expanded={active}
        aria-current={current ? "page" : undefined}
        className={`link-underline flex items-center gap-1 py-2 text-[15px] font-medium transition-colors ${
          current ? "text-accent" : active ? "text-ink" : "text-ink-soft hover:text-ink"
        }`}
      >
        {group.label}
        <CaretDown
          size={11}
          weight="bold"
          className={`mt-0.5 transition-transform ${active ? "rotate-180" : ""}`}
        />
      </Link>

      {active && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
          <div
            className={`grid gap-0.5 rounded-[var(--radius-lg)] border border-line bg-paper-raised p-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)] ${
              wide ? "w-[520px] grid-cols-2" : "w-[280px] grid-cols-1"
            }`}
          >
            {group.items.map((it) => (
              <Link
                key={it.label}
                href={it.href}
                onClick={onClose}
                className="flex items-start gap-3 rounded-[var(--radius)] px-3 py-2.5 transition-colors hover:bg-accent-tint"
              >
                <div className="min-w-0">
                  <span className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                    {it.label}
                    {it.soon && (
                      <span className="rounded-full bg-gold/15 px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-gold">
                        Segera
                      </span>
                    )}
                  </span>
                  {it.desc && (
                    <span className="mt-0.5 block truncate text-[12.5px] text-ink-faint">
                      {it.desc}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// A nav group is "current" when the active route falls under it — matching
// either the group's own path or any of its children (ignoring #anchors).
function isCurrentGroup(group: (typeof mainNav)[number], pathname: string): boolean {
  const base = (href: string) => href.split("#")[0].replace(/\/$/, "") || "/";
  const here = base(pathname);
  if (here === "/") return false;
  const paths = [group.href, ...(group.items?.map((it) => it.href) ?? [])].map(base);
  return paths.some((p) => p !== "/" && (here === p || here.startsWith(p + "/")));
}

export function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <UtilityBar />

      {/* Main bar */}
      <div
        className={`border-b bg-paper/85 backdrop-blur-md transition-shadow ${
          scrolled ? "border-line shadow-[0_1px_0_rgba(0,0,0,0.04)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 py-3.5 md:px-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo-hidayatullah.png"
              alt="Logo Hidayatullah"
              width={40}
              height={40}
              priority
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

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-6 lg:flex"
            onMouseLeave={() => setActiveNav(null)}
          >
            {mainNav.map((g) => (
              <NavGroup
                key={g.label}
                group={g}
                active={activeNav === g.label}
                current={isCurrentGroup(g, pathname)}
                onOpen={() => setActiveNav(g.label)}
                onClose={() => setActiveNav(null)}
              />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/cari"
              aria-label="Cari"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink active:scale-95"
            >
              <MagnifyingGlass size={17} weight="bold" />
            </Link>
            <ThemeToggle />
            {/* Prominent Donasi CTA */}
            <Link
              href="/donasi"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-[13.5px] font-semibold text-accent-ink transition-colors hover:bg-accent-hover active:scale-95 sm:px-4"
            >
              <HandHeart size={16} weight="fill" />
              <span className="hidden sm:inline">Donasi</span>
            </Link>
            <button
              aria-label="Buka menu"
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink lg:hidden active:scale-95"
            >
              <List size={18} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-paper-raised shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <span className="font-serif text-lg font-semibold">Menu</span>
              <button
                aria-label="Tutup menu"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-line active:scale-95"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-3">
              {mainNav.map((g) => {
                const isOpen = openGroup === g.label;
                return (
                  <div key={g.label} className="border-b border-line/70">
                    <button
                      onClick={() => setOpenGroup(isOpen ? null : g.label)}
                      className="flex w-full items-center justify-between py-3.5 font-serif text-[17px] text-ink"
                    >
                      {g.label}
                      <CaretDown
                        size={15}
                        weight="bold"
                        className={`text-ink-faint transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && g.items && (
                      <ul className="flex flex-col gap-0.5 pb-3">
                        {g.items.map((it) => (
                          <li key={it.label}>
                            <Link
                              href={it.href}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-2 rounded-[var(--radius)] px-3 py-2 text-[14.5px] text-ink-soft transition-colors hover:bg-accent-tint hover:text-ink"
                            >
                              {it.label}
                              {it.soon && (
                                <span className="rounded-full bg-gold/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-gold">
                                  Segera
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="flex flex-col gap-2.5 border-t border-line px-6 py-4">
              <Link
                href="/donasi"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 font-semibold text-accent-ink"
              >
                <HandHeart size={18} weight="fill" /> Donasi Sekarang
              </Link>
              <Link
                href="/#newsletter"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-full border border-line-strong px-4 py-2.5 text-[14px] font-semibold text-ink"
              >
                Berlangganan Buletin <ArrowUpRight size={15} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
