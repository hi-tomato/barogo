"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useBaropotList,
  useJoinBaropot,
} from "@/app/hooks/queries/useMockBaropot";
import BaropotHeader from "@/app/features/baropot/components/BaropotHeader";
import BaropotTabs from "@/app/features/baropot/components/BaropotTabs";
import BaropotList from "@/app/features/baropot/components/BaropotList";
import Button from "@/app/components/ui/Button";
import { BaropotTab } from "@/app/features/baropot/types/baropot";

export default function BaropotModal() {
  const [activeTab, setActiveTab] = useState<BaropotTab>("available");
  const router = useRouter();

  const {
    data: baropotList = [],
    isLoading,
    error,
    refetch,
  } = useBaropotList(activeTab);
  const joinMutation = useJoinBaropot();

  // TODO: 바로팟 참가 로직
  const handleJoin = (id: number) => {
    if (joinMutation.isPending) return;
    joinMutation.mutate(id, {
      onSuccess: () => {
        // 성공 알림
        alert("바로팟에 참가했습니다!");
      },
      onError: () => {
        // 실패 알림
        alert("참가에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };

  const handleCreateNew = () => {
    router.back();

    setTimeout(() => {
      router.push("/baropot/create"); // 잠시 후 페이지 이동
    }, 100);
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
