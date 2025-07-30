export default function HostBaropotSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl bg-white p-6 shadow-sm"
        >
          <div className="mb-4 h-4 rounded bg-gray-200" />
          <div className="mb-2 h-3 rounded bg-gray-200" />
          <div className="mb-4 h-3 rounded bg-gray-200" />
          <div className="flex justify-between">
            <div className="h-6 w-16 rounded bg-gray-200" />
            <div className="h-6 w-12 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
