import Image from "next/image";
import Link from "next/link";
import { Clock } from "@phosphor-icons/react/dist/ssr";
import { type Article, articleHref } from "@/lib/content";

export function Meta({
  rubrik,
  time,
  readTime,
  className = "",
}: {
  rubrik: string;
  time?: string;
  readTime?: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] ${className}`}>
      <span className="font-semibold uppercase tracking-wide text-accent">{rubrik}</span>
      {time && <span className="text-ink-faint">{time}</span>}
      {readTime && (
        <span className="flex items-center gap-1 text-ink-faint">
          <Clock size={12} weight="bold" /> {readTime} mnt baca
        </span>
      )}
    </div>
  );
}

// WEF-style story card: image, category tag, bold headline, meta.
export function ArticleCard({ a, priority = false }: { a: Article; priority?: boolean }) {
  return (
    <article className="group flex flex-col">
      <Link href={articleHref(a)} className="block overflow-hidden rounded-[var(--radius)]">
        <div className="relative aspect-[16/10] w-full bg-line">
          <Image
            src={a.img}
            alt={a.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      </Link>
      <div className="pt-4">
        <span className="cat-tag">{a.rubrik}</span>
        <h3 className="mt-2.5 font-serif text-[20px] font-semibold leading-[1.18] tracking-[-0.015em]">
          <Link href={articleHref(a)} className="transition-colors hover:text-accent">
            {a.title}
          </Link>
        </h3>
        <p className="mt-2.5 text-[12.5px] text-ink-faint">
          {a.time} · {a.author}
        </p>
      </div>
    </article>
  );
}

// Horizontal compact row: small thumb + title.
export function ArticleRow({ a, index }: { a: Article; index?: number }) {
  return (
    <article className="group flex items-start gap-4">
      {typeof index === "number" && (
        <span className="tnums mt-0.5 font-serif text-2xl font-semibold leading-none text-line-strong">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <Link href={articleHref(a)} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius)] bg-line">
        <Image src={a.img} alt={a.title} fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </Link>
      <div className="min-w-0">
        <h4 className="font-serif text-[15.5px] font-semibold leading-snug tracking-[-0.01em]">
          <Link href={articleHref(a)} className="transition-colors hover:text-accent">
            {a.title}
          </Link>
        </h4>
        <p className="mt-1 text-[11.5px] font-bold uppercase tracking-[0.08em] text-accent">{a.rubrik}</p>
      </div>
    </article>
  );
}
