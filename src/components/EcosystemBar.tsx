import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ecosystem } from "@/lib/content";

// Network strip: positions hidayatullah.com as the "Media Digital" node
// within the wider Hidayatullah digital ecosystem, and lets readers hop
// to the sister platforms.
export function EcosystemBar() {
  return (
    <div className="border-b border-line bg-ink text-paper">
      <div className="mx-auto flex max-w-[1320px] items-center gap-4 overflow-x-auto px-5 py-1.5 no-scrollbar md:px-6">
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.14em] text-paper/55">
          Jaringan Digital
        </span>
        <nav className="flex items-center gap-1 whitespace-nowrap">
          {ecosystem.map((n) => {
            const base =
              "group flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-medium transition-colors";
            if (n.current) {
              return (
                <span
                  key={n.key}
                  aria-current="page"
                  className={`${base} bg-accent text-accent-ink`}
                >
                  {n.name}
                  <span className="hidden text-[10.5px] font-semibold uppercase tracking-wide text-accent-ink/70 sm:inline">
                    {n.role}
                  </span>
                </span>
              );
            }
            return (
              <a
                key={n.key}
                href={n.href}
                target={n.external ? "_blank" : undefined}
                rel={n.external ? "noopener noreferrer" : undefined}
                className={`${base} text-paper/70 hover:bg-paper/10 hover:text-paper`}
              >
                {n.name}
                <ArrowUpRight
                  size={12}
                  weight="bold"
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
