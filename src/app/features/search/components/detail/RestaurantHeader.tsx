"use client";
import { useRouter } from "next/navigation";

import Button from "@/app/shared/ui/Button";
("@/app/shared/ui/Button");

export default function RestaurantHeader() {
  const router = useRouter();
  return (
    <header>
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <Button
            text="←"
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          />
          <h1 className="flex-1 text-center text-lg font-semibold text-[#2B2B2B]">
            보고계신 맛집 상세페이지
          </h1>
          <div className="w-10"></div>
        </div>
      </div>
    </header>
  );
}
