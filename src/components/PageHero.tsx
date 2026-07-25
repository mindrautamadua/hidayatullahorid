import Link from "next/link";

// WEF-style page header used across institutional pages: breadcrumb for
// orientation/back-nav, a category-tag eyebrow, a large display headline,
// and a serif standfirst. Keeps every inner page visually in sync with home.
export function PageHero({
  eyebrow,
  title,
  description,
  crumb,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumb?: string; // short breadcrumb label (defaults to title)
}) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-[1360px] px-5 py-12 md:px-8 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-[13px] text-ink-faint">
          <Link href="/" className="transition-colors hover:text-accent">Beranda</Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{crumb ?? title}</span>
        </nav>
        {eyebrow && <span className="cat-tag">{eyebrow}</span>}
        <h1 className="mt-4 max-w-4xl font-serif text-[38px] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[58px]">
          {title}
        </h1>
        {description && (
          <p className="standfirst mt-6 max-w-2xl">{description}</p>
        )}
      </div>
    </section>
  );
}
