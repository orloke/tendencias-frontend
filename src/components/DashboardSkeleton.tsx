export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-pulse">
      <div className="space-y-6 lg:col-span-1">
        <div className="bg-zinc-900/30 border border-zinc-900/50 rounded-3xl h-80" />
        <div className="bg-zinc-900/30 border border-zinc-900/50 rounded-3xl h-44" />
      </div>
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-zinc-900/30 border border-zinc-900/50 rounded-3xl h-64" />
        <div className="bg-zinc-900/30 border border-zinc-900/50 rounded-3xl h-80" />
      </div>
    </div>
  );
}
