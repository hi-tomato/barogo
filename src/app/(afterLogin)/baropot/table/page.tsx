"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBaropotList } from "@/app/features/baropot/hooks/queries/useMockBaropot";
import BaropotTableHeader from "@/app/features/baropot/components/table/BaropotTableHeader";
import BaropotTableStats from "@/app/features/baropot/components/table/BaropotTableStats";
import BaropotTableFilters from "@/app/features/baropot/components/table/BaropotTableFilters";
import BaropotTableGrid from "@/app/features/baropot/components/table/BaropotTableGrid";

type FilterType = "all" | "recruiting" | "full" | "closed";
type SortType = "latest" | "deadline" | "popular" | "distance";

export default function BaropotTablePage() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("latest");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: baropotList = [],
    isLoading,
    error,
    refetch,
  } = useBaropotList("available");

  const allBaropots = [
    ...baropotList,
    {
      id: 10,
      title: "강남 스시 오마카세",
      restaurant: "스시 젠",
      location: "강남역 1번 출구",
      date: "2025-06-14",
      time: "19:30",
      maxPeople: 6,
      currentPeople: 6,
      status: "full" as const,
      host: "스시러버",
      tags: ["일식", "30대", "오마카세"],
    },
    {
      id: 11,
      title: "이태원 펍 투어",
      restaurant: "맥켄지 펍",
      location: "이태원역 3번 출구",
      date: "2025-06-15",
      time: "21:00",
      maxPeople: 8,
      currentPeople: 3,
      status: "recruiting" as const,
      host: "맥주킹",
      tags: ["술집", "20대", "외국인"],
    },
    {
      id: 12,
      title: "종료된 바로팟",
      restaurant: "종료된 맛집",
      location: "어딘가",
      date: "2025-06-10",
      time: "18:00",
      maxPeople: 4,
      currentPeople: 4,
      status: "closed" as const,
      host: "종료자",
      tags: ["종료"],
    },
  ];

  const filteredAndSortedBaropots = allBaropots
    .filter((baropot) => {
      // 상태 필터
      if (filter !== "all" && baropot.status !== filter) return false;

      // 검색 필터
      if (
        searchQuery &&
        !baropot.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !baropot.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sort) {
        case "deadline":
          return (
            new Date(`${a.date} ${a.time}`).getTime() -
            new Date(`${b.date} ${b.time}`).getTime()
          );
        case "popular":
          return b.currentPeople - a.currentPeople;
        case "distance":
          // TODO: 실제 거리 계산 로직
          return 0;
        case "latest":
        default:
          return b.id - a.id;
      }
    });

  const handleJoinBaropot = (baropotId: number) => {
    alert("바로팟에 참여했습니다!");
    refetch(); // 목록 새로고침
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E6EEF5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">바로팟 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#E6EEF5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            바로팟 목록을 불러오는데 실패했습니다.
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      {/* 헤더 */}
      <BaropotTableHeader />

      {/* 통계 */}
      <BaropotTableStats baropotList={allBaropots} />

      {/* 필터 및 검색 */}
      <BaropotTableFilters
        filter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={allBaropots.length}
        filteredCount={filteredAndSortedBaropots.length}
      />

      {/* 바로팟 그리드 */}
      <BaropotTableGrid
        baropotList={filteredAndSortedBaropots}
        onJoin={handleJoinBaropot}
        onDetail={(id: number) => router.push(`/baropot/${id}`)}
      />
    </div>
  );
}
