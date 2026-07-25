import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Header />
      <main className="pb-16">
        <ArticleSkeleton />
      </main>
      <Footer />
    </>
  );
}
