"use client";
import React from "react";
import Button from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";

export default function PopularModalHeader() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center p-6 border-b border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900">찜한 맛집</h2>
      <Button
        text="X"
        onClick={() => router.back()}
        className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
      />
    </div>
  );
}
