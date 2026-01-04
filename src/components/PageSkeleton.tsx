import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Header Skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-card/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Skeleton className="h-10 w-32 rounded-lg" />
          <div className="hidden md:flex gap-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-16 rounded" />
            ))}
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </header>

      {/* Hero Skeleton */}
      <section className="pt-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Skeleton className="h-16 w-3/4 mx-auto rounded-lg" />
            <Skeleton className="h-8 w-1/2 mx-auto rounded" />
            <div className="flex gap-4 justify-center mt-8">
              <Skeleton className="h-12 w-32 rounded-lg" />
              <Skeleton className="h-12 w-32 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-48 mx-auto rounded-lg mb-4" />
            <Skeleton className="h-4 w-64 mx-auto rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-6 rounded-xl border border-border/50 bg-card/50">
                <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                <Skeleton className="h-6 w-32 rounded mb-2" />
                <Skeleton className="h-4 w-full rounded mb-1" />
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating corner decorations skeleton */}
      <div className="fixed top-24 left-4 hidden 2xl:block">
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-20 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="fixed top-24 right-4 hidden 2xl:block">
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-20 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageSkeleton;
