"use client";

import { useEffect, useState } from "react";
import { Star } from "@phosphor-icons/react";
import { ecosystem } from "@/lib/content";

type Timings = Record<string, string>;

type PrayerState = {
  gregorian: string;
  hijri: string;
  nextName: string;
  nextTime: string;
};

// Initial state must be deterministic (identical on server + first client
// render) to avoid a hydration mismatch — the real date is filled in after
// mount inside useEffect. Do NOT call new Date() here.
const FALLBACK: PrayerState = {
  gregorian: "",
  hijri: "Kalender Hijriah",
  nextName: "Jadwal Shalat",
  nextTime: "—",
};

const ORDER: [string, string][] = [
  ["Fajr", "Subuh"],
  ["Dhuhr", "Zuhur"],
  ["Asr", "Ashar"],
  ["Maghrib", "Maghrib"],
  ["Isha", "Isya"],
];

function computeNext(timings: Timings): { nextName: string; nextTime: string } {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  for (const [key, label] of ORDER) {
    const t = timings[key];
    if (!t) continue;
    const [h, m] = t.split(":").map(Number);
    if (h * 60 + m >= mins) return { nextName: label, nextTime: t };
  }
  return { nextName: "Subuh", nextTime: timings["Fajr"] ?? "—" };
}

export function UtilityBar() {
  const [data, setData] = useState<PrayerState>(FALLBACK);

  useEffect(() => {
    // Fill the local date on the client only (post-mount) so it never
    // diverges from the server-rendered HTML.
    setData((d) => ({
      ...d,
      gregorian: new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    }));

    const ctrl = new AbortController();
    // Aladhan API, method 20 = Kementerian Agama Republik Indonesia.
    fetch(
      "https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=20",
      { signal: ctrl.signal },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        const d = j.data;
        const { nextName, nextTime } = computeNext(d.timings);
        const h = d.date.hijri;
        setData({
          gregorian: `${d.date.gregorian.weekday.en === "Friday" ? "Jumat" : ""} ${d.date.gregorian.date}`.trim(),
          hijri: `${h.day} ${h.month.en} ${h.year} H`,
          nextName,
          nextTime,
        });
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => ctrl.abort();
  }, []);

  return (
    <div className="hidden border-b border-line bg-paper-raised md:block">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-6 px-8 py-2 text-[12.5px] text-ink-soft">
        {/* Left — date, hijri, next prayer */}
        <div className="flex items-center gap-4">
          <span suppressHydrationWarning>{data.gregorian}</span>
          <span className="text-ink-faint">·</span>
          <span>{data.hijri}</span>
          <span className="text-ink-faint">·</span>
          <span className="flex items-center gap-1.5">
            <Star size={13} weight="fill" className="text-gold" />
            {data.nextName} <span className="font-semibold text-ink">{data.nextTime}</span> WIB
          </span>
        </div>

        {/* Right — digital network switcher */}
        <nav aria-label="Jaringan digital Hidayatullah" className="flex items-center gap-3 whitespace-nowrap">
          <span className="hidden text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint lg:inline">
            Jaringan
          </span>
          {ecosystem.map((n) =>
            n.current ? (
              <span key={n.key} aria-current="page" className="font-semibold text-accent">
                {n.name}
              </span>
            ) : (
              <a
                key={n.key}
                href={n.href}
                target={n.external ? "_blank" : undefined}
                rel={n.external ? "noopener noreferrer" : undefined}
                className="link-underline hover:text-ink"
              >
                {n.name}
              </a>
            ),
          )}
        </nav>
      </div>
    </div>
  );
}
