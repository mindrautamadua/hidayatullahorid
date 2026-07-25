// Skeleton loaders that mirror the real layout shapes.
// Pure CSS shimmer via Tailwind's animate-pulse — no client JS needed.

function Box({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-[var(--radius)] bg-line ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="flex flex-col">
      <Box className="aspect-[4/3] w-full rounded-[var(--radius-lg)]" />
      <div className="pt-4">
        <Box className="h-3 w-24" />
        <Box className="mt-3 h-5 w-full" />
        <Box className="mt-2 h-5 w-4/5" />
        <Box className="mt-4 h-3 w-28" />
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mx-auto max-w-[1320px] px-5 py-12 md:px-6 md:py-16">
      <Box className="mb-8 h-9 w-56" />
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="mx-auto max-w-[760px] px-5 pt-12 md:px-6">
      <Box className="h-3 w-40" />
      <Box className="mt-5 h-10 w-full" />
      <Box className="mt-3 h-10 w-3/4" />
      <Box className="mt-6 h-4 w-2/3" />
      <div className="mt-8 flex items-center gap-3">
        <Box className="h-11 w-11 rounded-full" />
        <div>
          <Box className="h-4 w-32" />
          <Box className="mt-2 h-3 w-40" />
        </div>
      </div>
      <Box className="mt-8 aspect-[16/9] w-full rounded-[var(--radius-lg)]" />
      <div className="mt-9 space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Box key={i} className={`h-4 ${i % 3 === 2 ? "w-3/5" : "w-full"}`} />
        ))}
      </div>
    </div>
  );
}
