import { Lightning } from "@phosphor-icons/react/dist/ssr";

const FALLBACK = [
  "Silaturahmi Nasional tegaskan komitmen dakwah dan kemandirian umat",
  "Islamic Medical Service terjunkan tim aksi medis ke lokasi bencana",
  "Wakaf produktif dorong kemandirian ekonomi pesantren",
  "Solidaritas dunia Islam untuk Gaza terus menguat",
];

export function Ticker({ items }: { items?: string[] }) {
  const list = items && items.length ? items : FALLBACK;
  const row = [...list, ...list];
  return (
    <div className="border-b border-line bg-accent text-accent-ink">
      <div className="mx-auto flex max-w-[1320px] items-center gap-3 px-5 md:px-6">
        <span className="flex shrink-0 items-center gap-1.5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em]">
          <Lightning size={14} weight="fill" />
          Terkini
        </span>
        <div className="relative flex-1 overflow-hidden py-2.5">
          <div className="flex w-max animate-ticker gap-10 whitespace-nowrap">
            {row.map((t, i) => (
              <a
                key={i}
                href="#berita"
                className="text-[13.5px] font-medium opacity-90 transition-opacity hover:opacity-100"
              >
                {t}
                <span className="mx-5 opacity-40">/</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
