import { BaropotItem, BaropotTab } from "@/app/features/baropot/types/baropot";
// import { RestaurantDetail } from "@/app/features/nearby/types/restaurant";

// TODO: baropot에 관련된 useQuery Fn(Functions)를 관리하는 객체
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
        participants: [
          {
            userId: "김맛집",
            nickname: "김맛집",
            joinedAt: "2025-06-01T10:00:00Z",
          },
          {
            userId: "user123",
            nickname: "박철수",
            joinedAt: "2025-06-01T14:30:00Z",
          },
        ],
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
        participants: [
          {
            userId: "고기왕",
            nickname: "고기왕",
            joinedAt: "2025-06-01T09:00:00Z",
          },
          {
            userId: "user456",
            nickname: "이영희",
            joinedAt: "2025-06-01T11:15:00Z",
          },
          {
            userId: "user789",
            nickname: "최민수",
            joinedAt: "2025-06-01T12:20:00Z",
          },
          {
            userId: "김맛집",
            nickname: "김맛집",
            joinedAt: "2025-06-01T15:45:00Z",
          },
          {
            userId: "user101",
            nickname: "정수진",
            joinedAt: "2025-06-01T16:30:00Z",
          },
          {
            userId: "user202",
            nickname: "한지민",
            joinedAt: "2025-06-01T17:10:00Z",
          },
        ],
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
        participants: [
          {
            userId: "레트로러버",
            nickname: "레트로러버",
            joinedAt: "2025-06-01T08:00:00Z",
          },
        ],
        tags: ["퓨전", "20대", "데이트"],
      },
    ];

    // TODO: 실제 로그인한 유저 ID로 변경
    const currentUserId = "김맛집";

    return dummyData.filter((item) => {
      if (tab === "available") {
        // TODO:모집중이고 내가 참여하지 않은 모임
        const isParticipant = item.participants?.some(
          (p) => p.userId === currentUserId
        );
        return item.status === "recruiting" && !isParticipant;
      }
      if (tab === "joined") {
        // TODO:내가 참여한 모임 (호스트가 아닌 참가자로)
        const isParticipant = item.participants?.some(
          (p) => p.userId === currentUserId
        );
        return isParticipant && item.host !== currentUserId;
      }
      if (tab === "created") {
        // 내가 만든 모임
        return item.host === currentUserId;
      }
      return true;
    });
  },

  create: async (data: Omit<BaropotItem, "id">): Promise<BaropotItem> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { ...data, id: Date.now() };
  },

  join: async (id: number): Promise<void> => {
    console.log(id);
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};

// export const restaurant = {
//   getFavorites: async () => {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     return [
//       {
//         id: 1,
//         name: "홀리스 타코",
//         address: "멕시칸음식 • 을지로",
//         rating: 4.6,
//         reviews: 684,
//         image: "/api/placeholder/80/80",
//       },
//       {
//         id: 2,
//         name: "석압생소금구이 용산점",
//         address: "육류,고기요리 • 신용산",
//         rating: 4.3,
//         reviews: 1048,
//         image: "/api/placeholder/80/80",
//       },
//       {
//         id: 3,
//         name: "고베스테이 신대방직영점",
//         address: "퓨젼 • 구로",
//         rating: 4.1,
//         reviews: 1425,
//         image: "/api/placeholder/80/80",
//       },
//       {
//         id: 4,
//         name: "안주마을",
//         address: "해물,생선요리 • 서촌",
//         rating: 4.5,
//         reviews: 747,
//         image: "/api/placeholder/80/80",
//       },
//     ];
//   },

//   getRestaurantDetail: async (kakaoId: string): Promise<RestaurantDetail> => {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     const mockRestaurants: Record<string, RestaurantDetail> = {
//       // ⭐ 지도 더미 데이터와 같은 ID 사용
//       "26338954": {
//         kakaoId: "26338954",
//         name: "토마토김밥",
//         address: "서울 마포구 홍익로 20",
//         phone: "02-1234-5678",
//         category: "한식",
//         coordinates: { lat: 37.5665, lng: 126.978 },
//         id: 1,
//         description: "김밥계의 샤넬. 언제나 옳은 맛",
//         images: [
//           "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
//           "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400",
//         ],
//         rating: 4.5,
//         reviewCount: 128,
//         tags: ["한식", "김밥", "홍대맛집"],
//         openHours: "09:00 - 22:00",
//         baropots: [
//           {
//             id: 1,
//             title: "토마토김밥 같이 드실분!",
//             restaurant: "토마토김밥",
//             location: "홍대입구역 2번 출구",
//             date: "2025-06-10",
//             time: "19:00",
//             maxPeople: 4,
//             currentPeople: 2,
//             status: "recruiting",
//             host: "김밥러버",
//             tags: ["한식", "20대", "간단식사"],
//           },
//         ],
//       },

//       "87654321": {
//         kakaoId: "87654321",
//         name: "스타벅스 홍대점",
//         address: "서울 마포구 양화로 161",
//         phone: "1522-3232",
//         category: "카페",
//         coordinates: { lat: 37.567, lng: 126.975 },
//         id: 2,
//         description: "커피 한 잔의 여유를 즐겨보세요",
//         images: [
//           "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
//         ],
//         rating: 4.0,
//         reviewCount: 256,
//         tags: ["카페", "커피", "스터디", "홍대"],
//         openHours: "06:00 - 24:00",
//         baropots: [],
//       },
//     };

//     const restaurant = mockRestaurants[kakaoId];
//     if (!restaurant) {
//       throw new Error("찾을 수 없는 데이터 입니다");
//     }
//     return restaurant;
//   },
// };
