import { BaropotTab } from "@/app/features/baropot/types/baropot";

export const queryKeys = {
  baropot: {
    all: ["baropot"] as const,
    lists: () => [...queryKeys.baropot.all, "list"] as const,
    list: (tab: BaropotTab) => [...queryKeys.baropot.lists(), tab] as const,
    detail: (id: number) => [...queryKeys.baropot.all, "detail", id] as const,
  },

  restaurant: {
    all: ["restaurant"] as const,
    lists: () => [...queryKeys.restaurant.all, "list"] as const,
    list: () => [...queryKeys.restaurant.lists()] as const,
    favorites: () => [...queryKeys.restaurant.all, "favorites"] as const,
    nearby: (location: Location) =>
      [...queryKeys.restaurant.all, "nearby", location] as const,
    search: (query: string, lat: number, lng?: number) => [
      ...queryKeys.restaurant.all,
      "search",
      { query, lat, lng },
    ],
    details: () => [...queryKeys.restaurant.all, "detail"] as const,
    detail: (kakaoId: string) =>
      [...queryKeys.restaurant.details(), kakaoId] as const,
  },
} as const;
