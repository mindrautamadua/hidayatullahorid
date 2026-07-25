"use client";

import { useEffect, useState } from "react";

/* Broadsheet dateline strip that sits above the front-page nameplate.
   Renders the Hijri + Gregorian date the way a newspaper-of-record masthead
   does. Dates are computed on the client after mount so the server and client
   markup match (no hydration flash) and the reader always sees "today". */

function formatDates(now: Date) {
  const gregorian = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  // Umm al-Qura Hijri calendar, Indonesian month names.
  // id-ID already appends the "H" era suffix to the year, so don't add it again.
  const hijri = new Intl.DateTimeFormat("id-ID-u-ca-islamic-umalqura", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  return { gregorian, hijri };
}

export function EditionBar() {
  const [dates, setDates] = useState<{ gregorian: string; hijri: string } | null>(null);

  useEffect(() => {
    setDates(formatDates(new Date()));
  }, []);

  return (
    <div className="mx-auto max-w-[1360px] px-5 md:px-8">
      <div className="rule-heavy" />
      <div className="edition-line flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2.5">
        {/* Left — live dateline */}
        <span className="flex items-center gap-2">
          {dates ? (
            <>
              <span>{dates.gregorian}</span>
              <span className="text-gold">·</span>
              <span className="tnums text-accent">{dates.hijri}</span>
            </>
          ) : (
            /* Reserve height until the client date resolves */
            <span className="invisible">Memuat tanggal edisi</span>
          )}
        </span>

        {/* Center — masthead identity */}
        <span className="hidden text-ink-soft sm:inline">
          Edisi Digital · Situs Resmi
        </span>

        {/* Right — place of record */}
        <span className="flex items-center gap-2">
          <span className="text-gold">Gunung Tembak</span>
          <span className="text-line-strong">—</span>
          <span>Nusantara</span>
        </span>
      </div>
      <div className="rule-gold-double" />
    </div>
  );
}
