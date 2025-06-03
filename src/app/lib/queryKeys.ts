import { BaropotTab } from "../types";

export const queryKeys = {
  baropot: {
    all: ["baropot"] as const,
    lists: () => [...queryKeys.baropot.all, "list"] as const,
    list: (tab: BaropotTab) => [...queryKeys.baropot.lists(), tab] as const,
    detail: (id: number) => [...queryKeys.baropot.all, "detail", id] as const,
  },

  restaurant: {
    all: ["restaurant"] as const,
    favorites: () => [...queryKeys.restaurant.all, "favorites"] as const,
    detail: (id: number) =>
      [...queryKeys.restaurant.all, "detail", id] as const,
    nearby: (location: Location) =>
      [...queryKeys.restaurant.all, "nearby", location] as const,
  },
} as const;
