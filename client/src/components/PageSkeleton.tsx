/**
 * PageSkeleton — YouTube-style loading skeleton for all pages
 */
export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-black animate-pulse">
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        <div className="h-6 w-24 bg-white/10 rounded" />
        <div className="flex gap-6">
          <div className="h-3 w-12 bg-white/10 rounded" />
          <div className="h-3 w-12 bg-white/10 rounded" />
          <div className="h-3 w-12 bg-white/10 rounded" />
        </div>
        <div className="h-8 w-20 bg-white/10 rounded" />
      </div>

      {/* Hero skeleton */}
      <div className="h-screen w-full bg-white/5 flex flex-col items-center justify-center gap-4">
        <div className="h-3 w-24 bg-white/10 rounded" />
        <div className="h-10 w-64 bg-white/10 rounded" />
        <div className="h-3 w-40 bg-white/10 rounded" />
        <div className="mt-4 h-10 w-32 bg-white/10 rounded" />
      </div>

      {/* Content blocks skeleton */}
      <div className="bg-white">
        {/* Section 1 */}
        <div className="container py-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <div className="h-3 w-20 bg-black/10 rounded" />
            <div className="h-8 w-3/4 bg-black/10 rounded" />
            <div className="h-3 w-full bg-black/10 rounded" />
            <div className="h-3 w-5/6 bg-black/10 rounded" />
            <div className="h-3 w-4/6 bg-black/10 rounded" />
          </div>
          <div className="h-80 bg-black/10 rounded" />
        </div>

        {/* Section 2 — grid */}
        <div className="bg-black/5 py-24">
          <div className="container">
            <div className="h-8 w-48 bg-black/10 rounded mx-auto mb-12" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-black/10 rounded" />
              ))}
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="container py-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-80 bg-black/10 rounded" />
          <div className="flex flex-col gap-4">
            <div className="h-3 w-20 bg-black/10 rounded" />
            <div className="h-8 w-3/4 bg-black/10 rounded" />
            <div className="h-3 w-full bg-black/10 rounded" />
            <div className="h-3 w-5/6 bg-black/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
