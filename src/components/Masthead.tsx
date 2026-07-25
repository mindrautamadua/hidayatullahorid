// Broadsheet nameplate — the front-page flag. This is the signature
// device that separates the official newspaper-of-record (or.id) from
// the magazine-style .com portal.

export function Masthead() {
  const now = new Date();
  const tanggal = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  // Approximate Hijri year label (display only).
  const hijriYear = now.getFullYear() - 579;

  return (
    <header className="mx-auto max-w-[1320px] px-5 md:px-6">
      <div className="rule-heavy flex items-stretch justify-between gap-4 pt-3">
        {/* Left ear */}
        <div className="hidden w-[22%] flex-col justify-center border-r border-line pr-4 sm:flex">
          <p className="section-kicker text-accent">Situs Resmi</p>
          <p className="mt-1 text-[12px] leading-snug text-ink-soft">
            Organisasi · Dakwah · Pendidikan · Sosial · Ekonomi
          </p>
        </div>

        {/* Nameplate */}
        <div className="flex flex-1 flex-col items-center justify-center py-3 text-center">
          <h1 className="nameplate text-[13vw] leading-[0.85] sm:text-[64px] md:text-[88px] lg:text-[104px]">
            Hidayatullah
          </h1>
          <p className="mt-2 flex items-center gap-3 text-[10.5px] font-bold uppercase tracking-[0.42em] text-ink-soft">
            <span className="hidden h-px w-8 bg-line-strong sm:inline-block" />
            Media Network
            <span className="hidden h-px w-8 bg-line-strong sm:inline-block" />
          </p>
        </div>

        {/* Right ear */}
        <div className="hidden w-[22%] flex-col justify-center border-l border-line pl-4 text-right sm:flex">
          <p className="section-kicker text-ink-faint">Edisi</p>
          <p className="mt-1 text-[12px] leading-snug text-ink-soft">{tanggal}</p>
          <p className="mt-0.5 text-[11px] text-ink-faint">Tahun {hijriYear} H</p>
        </div>
      </div>

      {/* Bottom double rule with a running strap */}
      <div className="rule-double mt-0 flex items-center justify-center gap-2 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
        <span className="sm:hidden">{tanggal}</span>
        <span className="hidden sm:inline">
          Kantor Pusat Jakarta · Cabang di 34 Provinsi · Jaringan Dunia Islam
        </span>
      </div>
    </header>
  );
}
