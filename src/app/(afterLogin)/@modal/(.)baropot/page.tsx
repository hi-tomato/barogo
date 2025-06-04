"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useBaropotList,
  useJoinBaropot,
} from "@/app/hooks/queries/useMockBaropot";
import BaropotHeader from "@/app/components/baropot/BaropotHeader";
import BaropotTabs from "@/app/components/baropot/BaropotTabs";
import BaropotList from "@/app/components/baropot/BaropotList";
import { BaropotTab } from "@/app/types";
import Button from "@/app/components/ui/Button";

export default function BaropotModal() {
  const [activeTab, setActiveTab] = useState<BaropotTab>("ongoing");
  const router = useRouter();

  const {
    data: baropotList = [],
    isLoading,
    error,
    refetch,
  } = useBaropotList(activeTab);

  const joinMutation = useJoinBaropot();

  // 핸들러들
  const handleJoin = (id: number) => {
    joinMutation.mutate(id);
  };

  const handleCreateNew = () => {
    // TODO: 바로팟 생성 페이지로 이동
    console.log("새 바로팟 생성");
  };

  return (
    <div className="fixed inset-0 bg-[#0000004c] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl">
        <BaropotHeader onClose={() => router.back()} onRefresh={refetch} />
        <BaropotTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="overflow-y-auto max-h-[60vh] p-4">
          <BaropotList
            baropotList={baropotList}
            isLoading={isLoading}
            error={error}
            onRefresh={refetch}
            onJoin={handleJoin}
          />
        </div>

        <div className="p-4 border-t border-gray-100">
          <Button
            text="새 바로팟 만들기"
            onClick={handleCreateNew}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
