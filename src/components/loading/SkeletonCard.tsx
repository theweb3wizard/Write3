export default function SkeletonCard() {
  return (
    <div className="rounded-xl border border-card-border bg-card p-4 animate-pulse">
      <div className="h-4 w-20 bg-card-border rounded mb-3" />
      <div className="h-4 w-full bg-card-border rounded mb-2" />
      <div className="h-8 w-3/4 bg-card-border rounded" />
    </div>
  );
}
