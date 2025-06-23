import { BaropotTab } from "@/app/features/baropot/types/baropot";
import { SearchQueries } from "../types/restaurant";
import { BaropotsQueries } from "../types/baropots";

export const queryKeys = {
  baropot: {
    all: ["baropot"] as const,
    lists: () => [...queryKeys.baropot.all, "list"] as const,
    list: (queries?: BaropotsQueries) =>
      [...queryKeys.baropot.lists(), queries] as const,
    detail: (id: number) => [...queryKeys.baropot.all, "detail", id] as const,
  },

  restaurant: {
    all: ["restaurant"] as const,
    list: (query?: SearchQueries) =>
      [...queryKeys.restaurant.all, "list", query] as const,
    nearby: (location: { latitude: number; longitude: number }) =>
      [...queryKeys.restaurant.all, "nearby", location] as const,
    detail: (id: string) =>
      [...queryKeys.restaurant.all, "detail", id] as const,
    reviews: (restaurantId: string) =>
      [...queryKeys.restaurant.all, "reviews", restaurantId] as const,
    bookmarks: () => [...queryKeys.restaurant.all, "bookmarks"] as const,
    search: (query: string, lat: number, lng?: number) =>
      [...queryKeys.restaurant.all, "search", { query, lat, lng }] as const,
  },
} as const;
