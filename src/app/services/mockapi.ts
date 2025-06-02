import { BaropotItem, BaropotTab } from "../types";

export const baropot = {
  getList: async (tab: BaropotTab): Promise<BaropotItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const dummyData: BaropotItem[] = [
      {
        id: 1,
        title: "홍대 맛집 투어",
        restaurant: "홀리스 타코",
        location: "홍대입구역 2번 출구",
        date: "2025-06-03",
        time: "19:00",
        maxPeople: 4,
        currentPeople: 2,
        status: "recruiting",
        host: "김맛집",
        tags: ["멕시칸", "20대", "직장인"],
      },
      {
        id: 2,
        title: "강남 고기파티",
        restaurant: "석압생소금구이",
        location: "강남역 3번 출구",
        date: "2025-06-04",
        time: "18:30",
        maxPeople: 6,
        currentPeople: 6,
        status: "full",
        host: "고기왕",
        tags: ["한식", "30대", "회식"],
      },
      {
        id: 3,
        title: "을지로 레트로 맛집",
        restaurant: "고베스테이",
        location: "을지로3가역 1번 출구",
        date: "2025-06-05",
        time: "20:00",
        maxPeople: 3,
        currentPeople: 1,
        status: "recruiting",
        host: "레트로러버",
        tags: ["퓨전", "20대", "데이트"],
      },
    ];

    return dummyData.filter((item) => {
      if (tab === "ongoing") return item.status === "recruiting";
      if (tab === "upcoming") return true;
      if (tab === "my") return item.host === "김맛집";
      return true;
    });
  },
  create: async (data: Omit<BaropotItem, "id">): Promise<BaropotItem> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { ...data, id: Date.now() };
  },
  join: async (id: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};

export const restaurant = {
  getFavorites: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      {
        id: 1,
        name: "홀리스 타코",
        address: "멕시칸음식 • 을지로",
        rating: 4.6,
        reviews: 684,
        image: "/api/placeholder/80/80",
      },
      {
        id: 2,
        name: "석압생소금구이 용산점",
        address: "육류,고기요리 • 신용산",
        rating: 4.3,
        reviews: 1048,
        image: "/api/placeholder/80/80",
      },
      {
        id: 3,
        name: "고베스테이 신대방직영점",
        address: "퓨젼 • 구로",
        rating: 4.1,
        reviews: 1425,
        image: "/api/placeholder/80/80",
      },
      {
        id: 4,
        name: "안주마을",
        address: "해물,생선요리 • 서촌",
        rating: 4.5,
        reviews: 747,
        image: "/api/placeholder/80/80",
      },
    ];
  },
};
