"use client";
import { useRouter } from "next/navigation";
import Button from "@/app/shared/ui/Button";
("@/app/shared/ui/Button");

export default function NearbyHeader() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center p-6 border-b border-gray-100">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">내 주변 맛집</h2>
        <p className="text-sm text-gray-500 mt-1">
          현재 위치 기준 가까운 맛집을 확인하세요
        </p>
      </div>
      <Button
        text="X"
        onClick={() => router.back()}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
      />
    </div>
  );
}
