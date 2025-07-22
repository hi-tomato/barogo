import { SearchQueries } from '../types/restaurant';
import { BaropotsQueries } from '../types/baropots';

export const queryKeys = {
  baropot: {
    all: ['baropot'] as const,

    /** 목록 관련 */
    lists: () => [...queryKeys.baropot.all, 'list'] as const,
    list: (queries?: BaropotsQueries) =>
      [...queryKeys.baropot.lists(), queries] as const,

    /** 상세 관련 */
    details: () => [...queryKeys.baropot.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.baropot.details(), id] as const,

    /** 수정 관련 */
    edits: () => [...queryKeys.baropot.all, 'edit'] as const,
    edit: (id: number) => [...queryKeys.baropot.edits(), id] as const,

    /** 호스트 관련 */
    hostLists: () => [...queryKeys.baropot.all, 'host'] as const,
    hostList: (queries?: BaropotsQueries) =>
      [...queryKeys.baropot.hostLists(), queries] as const,

    /** 채팅방 관련 */
    chatRooms: () => [...queryKeys.baropot.all, 'chatRooms'] as const,
    chatRoom: (baropotId: number) =>
      [...queryKeys.baropot.chatRooms(), baropotId] as const,
    chatRoomInfo: (chatRoomId: number) =>
      [...queryKeys.baropot.all, 'chatRoomInfo', chatRoomId] as const,
  },

  restaurant: {
    all: ['restaurant'] as const,

    /** 목록 관련 */
    lists: () => [...queryKeys.restaurant.all, 'list'] as const,
    list: (query?: SearchQueries) =>
      [...queryKeys.restaurant.lists(), query] as const,

    /** 근처 맛집 */
    nearbys: () => [...queryKeys.restaurant.all, 'nearby'] as const,
    nearby: (location: { latitude: number; longitude: number }) =>
      [...queryKeys.restaurant.nearbys(), location] as const,

    /** 상세 관련 */
    details: () => [...queryKeys.restaurant.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.restaurant.details(), id] as const,

    /** 리뷰 관련 */
    reviews: () => [...queryKeys.restaurant.all, 'reviews'] as const,
    review: (restaurantId: number) =>
      [...queryKeys.restaurant.reviews(), restaurantId] as const,

    /** 북마크 관련 */
    bookmarks: () => [...queryKeys.restaurant.all, 'bookmarks'] as const,

    /** 검색 관련 */
    searches: () => [...queryKeys.restaurant.all, 'search'] as const,
    search: (query: string, lat: number, lng?: number) =>
      [...queryKeys.restaurant.searches(), { query, lat, lng }] as const,
  },
} as const;
