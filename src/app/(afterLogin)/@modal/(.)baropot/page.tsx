"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BaropotHeader from "@/app/features/baropot/components/BaropotHeader";
import BaropotTabs from "@/app/features/baropot/components/BaropotTabs";
import BaropotList from "@/app/features/baropot/components/BaropotList";
import Button from "@/app/shared/ui/Button";
import { BaropotTab } from "@/app/features/baropot/types/baropot";
import {
  useGetBaropotList,
  useJoinBaropot,
} from "@/app/shared/hooks/queries/useBaropot";

export default function BaropotModal() {
  const [activeTab, setActiveTab] = useState<BaropotTab>("available");
  const router = useRouter();

  const {
    data: baropotList = [],
    isLoading,
    error,
    refetch,
  } = useGetBaropotList();

  // 바로팟 참가 로직
  const joinMutation = useJoinBaropot();
  const handleJoin = (id: number) => {
    const joinMessage = prompt("참가 메시지를 입력해주세요");

    if (joinMessage) {
      joinMutation.mutate(
        {
          baropotId: id,
          message: {
            joinMessage: joinMessage,
          },
        },
        {
          onSuccess: () => {
            alert("바로팟에 참여했습니다.");
            refetch(); // 목록 새로고침
          },
          onError: () => {
            alert("바로팟에 참여하는데 실패했습니다.");
          },
        }
      );
    }
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
            isJoining={joinMutation.isPending} // 추가
          />
        </div>

        <div className="p-4 border-t border-gray-100">
          <Button
            text="새 바로팟 만들기"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            onClick={() => {
              router.back();
              setTimeout(() => {
                router.push("/baropot/create");
              }, 100);
            }}
          />
        </div>
      </div>
    </div>
  );
}
