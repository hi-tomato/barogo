import React from "react";

export default function Loading() {
  return (
    <div className="text-center py-12">
      <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-gray-500">로딩중...</p>
    </div>
  );
}
