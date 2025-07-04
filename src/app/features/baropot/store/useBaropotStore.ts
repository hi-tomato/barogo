import { create } from "zustand";
import { NearbyRestaurant } from "@/app/shared/types";

interface BaropotStore {
  selectedRestaurant: NearbyRestaurant | null;
  setSelectedRestaurant: (restaurant: NearbyRestaurant) => void;
  clearSelectedRestaurant: () => void;
}

export const useBaropotStore = create<BaropotStore>((set) => ({
  selectedRestaurant: null,
  setSelectedRestaurant: (restaurant) => {
    set({ selectedRestaurant: restaurant });
  },
  clearSelectedRestaurant: () => set({ selectedRestaurant: null }),
}));
