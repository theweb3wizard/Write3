import SkeletonCard from "./SkeletonCard";

interface SkeletonGridProps {
  count?: number;
  columns?: number;
}

export default function SkeletonGrid({ count = 6, columns = 3 }: SkeletonGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
