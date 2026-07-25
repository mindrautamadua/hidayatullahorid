import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export type LegalSection = { heading: string; body: string[] };

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Header />
      <PageHero eyebrow="Legal" title={title} description={intro} />
      <main className="mx-auto max-w-[820px] px-5 py-12 md:px-6 md:py-16">
        <p className="text-[13px] text-ink-faint">Terakhir diperbarui: {updated}</p>
        <div className="mt-8 space-y-9">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="font-serif text-[21px] font-semibold tracking-[-0.01em]">
                {i + 1}. {s.heading}
              </h2>
              <div className="mt-3 space-y-3 text-[15.5px] leading-relaxed text-ink-soft">
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
