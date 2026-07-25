import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CardGridSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Header />
      <CardGridSkeleton count={6} />
      <Footer />
    </>
  );
}
