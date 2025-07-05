export default function Loading() {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      <p className="text-gray-500">로딩중...</p>
    </div>
  );
}
