export enum BaropotStatus {
  /** 모집중 (참가 신청 가능) */
  OPEN = 'OPEN',
  /** 정원 마감 (더 이상 신청 불가) */
  FULL = 'FULL',
  /** 모임 진행중 (모임 시작 시간 이후) */
  IN_PROGRESS = 'IN_PROGRESS',
  /** 모임 완료 (모임 종료) */
  COMPLETED = 'COMPLETED',
  /** 모임 취소 (주최자/관리자에 의해 취소) */
  CANCELLED = 'CANCELLED',
}

export const baropotStatusKorean = {
  [BaropotStatus.OPEN]: '모집중',
  [BaropotStatus.FULL]: '정원 마감',
  [BaropotStatus.IN_PROGRESS]: '모임 진행중',
  [BaropotStatus.COMPLETED]: '모임 완료',
  [BaropotStatus.CANCELLED]: '모임 취소',
};

export enum ContactMethod {
  /** 앱 내 채팅 */
  APP_CHAT = 'APP_CHAT',
  /** 카카오톡 */
  KAKAO_TALK = 'KAKAO_TALK',
  /** 전화번호 */
  PHONE_NUMBER = 'PHONE_NUMBER', // 전화번호
}

export enum ParticipantAgeGroup {
  /** 20대 */
  TWENTIES = 'TWENTIES',
  /** 30대 */
  THIRTIES = 'THIRTIES',
  /** 40대 */
  FORTIES = 'FORTIES',
  /** 무관 */
  ANY = 'ANY',
}

export enum ParticipantGender {
  /** 남자 */
  MALE = 'MALE',
  /** 여자 */
  FEMALE = 'FEMALE',
  /** 무관 */
  ANY = 'ANY',
}

export enum PaymentMethod {
  /** 더치페이 */
  DUTCH_PAY = 'DUTCH_PAY',
  /** 호스트가 */
  HOST_PAYS = 'HOST_PAYS',
  /** 현장에서 상의 */
  NEGOTIABLE = 'NEGOTIABLE',
}

export enum RestaurantCategory {
  // 아시아 음식
  KOREAN = 'KOREAN', // 한식
  JAPANESE = 'JAPANESE', // 일식
  CHINESE = 'CHINESE', // 중식
  ASIAN = 'ASIAN', // 아시안

  // 서양 음식
  WESTERN = 'WESTERN', // 양식
  MEXICAN = 'MEXICAN', // 멕시칸

  // 기타
  CAFE = 'CAFE', // 카페
  DESSERT = 'DESSERT', // 디저트
  BAR = 'BAR', // 술집 or 펍
  BUFFET = 'BUFFET', // 뷔페
  FUSION = 'FUSION', // 퓨전
  VEGAN = 'VEGAN', // 비건
  FAST_FOOD = 'FAST_FOOD', // 패스트푸드
}

export enum BaropotJoinedStatus {
  /** 신청 대기 (승인 전) */
  PENDING = 'PENDING',
  /** 참가 승인 (정식 참가자) */
  APPROVED = 'APPROVED',
  /** 참가 거절 */
  REJECTED = 'REJECTED',
  /** 참가자가 직접 신청 취소 */
  CANCELLED = 'CANCELLED',
  /** 주최자/관리자가 강제 퇴장시킴 */
  REMOVED = 'REMOVED',
}

export enum BAROPOT_CHAT_EVENTS {
  /** 채팅방 입장 - 클라이언트에서 서버로 */
  JOIN_ROOM = 'JOIN_ROOM',
  /** 채팅방 나가기 - 클라이언트에서 서버로 */
  LEAVE_ROOM = 'LEAVE_ROOM',
  /** 메시지 전송 - 클라이언트에서 서버로 */
  SEND_MESSAGE = 'SEND_MESSAGE',
  /** 새 메시지 수신 - 서버에서 클라이언트로 */
  NEW_MESSAGE = 'NEW_MESSAGE',
  /** 메시지 읽음 처리 - 클라이언트에서 서버로 */
  MARK_AS_READ = 'MARK_AS_READ',
  /** 메시지 읽음 처리 완료 - 서버에서 클라이언트로 */
  MESSAGES_READ = 'MESSAGES_READ',
}
