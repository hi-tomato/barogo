# 바로팟 채팅 구현 이슈 및 해결 방안

## 📋 개요

바로팟 채팅 기능 구현 과정에서 발생한 문제들과 해결 방안을 정리한 두번째 문서입니다 (#2)

## 🚨 현재 발생 중인 문제

### 1. 주요 에러 메시지

```
baropotChatRoomId: Path `baropotChatRoomId` is required.,
senderId: Path `senderId` is required.
at Socket.<anonymous> (baropotChatService.ts:128:15)
```

**원인**: 서버의 Mongoose 스키마 검증 에러

- `baropotChatRoomId`가 `null`로 전송되어 `required` 조건에 안 맞는 상황

### 2. WebSocket 이벤트 로그

```
42/baropot-chat,0["SEND_MESSAGE", {baropotChatRoomId: null, content: "ㅁㄴㅇㄹㅁㄴㅇㄹ", senderId: 3}]
```

**문제점**:

- `baropotChatRoomId: null` - 채팅방 ID가 null로 전송됨
- `senderId: 3` - 사용자 ID는 전송되지만 서버에서 검증 실패

## 🔍 문제 분석

### 클라이언트 측 문제

1. **채팅방 생성 플로우 문제**

   ```typescript
   // 현재 플로우 (문제가 있는 방식)
   페이지 진입 → 바로 채팅방 생성 시도 → "이미 존재합니다" 에러 →
   기존 채팅방 ID를 알 수 없음 → null로 전송
   ```

2. **기존 채팅방 조회 API 부재**
   - 바로팟 ID로 기존 채팅방을 조회할 수 있는 API가 없음
   - "이미 채팅방이 존재합니다" 에러 발생 시 기존 채팅방 ID를 알 수 없음

## 🛠️ 구현된 기능들

### 1. WebSocket 연결 및 인증

- ✅ Socket.IO 클라이언트 연결
- ✅ 토큰 기반 인증
- ✅ 이벤트 리스너 등록

### 2. 채팅 서비스 클래스

```typescript
// src/app/shared/services/baropotChatService.ts
export class BaropotChatService {
  // WebSocket 연결
  async connect(token: string): Promise<void>;

  // 채팅방 생성
  async createChatRoom(
    request: CreateChatRoomRequest
  ): Promise<ChatRoomResponse>;

  // 채팅방 정보 조회
  async getChatRoomInfo(chatRoomId: number): Promise<GetChatRoomResponse>;

  // 채팅방 입장
  async joinRoom(baropotChatRoomId: number): Promise<string>;

  // 메시지 전송
  async sendMessage(request: SendMessageRequest): Promise<string>;

  // 채팅방 퇴장
  async leaveRoom(baropotChatRoomId: number): Promise<string>;
}
```

### 3. React Query 훅

```typescript
// src/app/shared/hooks/queries/useBaropotChat.ts
export const useCreateChatRoom = () => {
  /* ... */
};
export const useGetChatRoomInfo = (chatRoomId: number) => {
  /* ... */
};
```

### 4. WebSocket 훅

```typescript
// src/app/shared/hooks/socket/useWebSocket.ts
export const useWebSocket = (config: WebSocketConfig) => {
  // 연결 상태 관리
  // 이벤트 핸들러
  // 메시지 전송
  // 방 입장/퇴장
};
```

### 5. 채팅 페이지 UI

```typescript
// src/app/(afterLogin)/baropot/[baropotId]/chat/page.tsx
export default function BaropotChatPage() {
  // 채팅방 생성 버튼
  // 메시지 입력 및 전송
  // 실시간 메시지 표시
  // 디버깅 정보 표시
}
```

**현재 문제**:

- 기존 채팅방이 있을 때 400 에러만 반환
- 기존 채팅방 ID를 알 수 없음

**개선 요청**:

```json
// 기존 채팅방이 있을 때
{
  "BaropotChatRoomId": 123,
  "message": "이미 존재하는 채팅방입니다",
  "existingRoom": true
}
```

#### FE TODO. 값 검증 강화

```typescript
const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
  // 엄격한 검증
  if (!actualChatRoomId || actualChatRoomId === null) {
    alert('채팅방 ID가 유효하지 않습니다.');
    return;
  }

  if (!user?.id || user.id === null) {
    alert('사용자 인증에 문제가 있습니다.');
    return;
  }

  // 메시지 전송...
};
```

## 📝 내가 생각한 테스트 시나리오

### 1. 정상 플로우

1. 바로팟 상세 페이지에서 "채팅방 만들기" 클릭
2. 채팅 페이지 진입
3. "채팅방 만들기" 버튼 클릭
4. 채팅방 생성 성공
5. 메시지 전송 성공

### 2. 기존 채팅방이 있는 경우

1. 이미 채팅방이 있는 바로팟의 채팅 페이지 진입
2. 기존 채팅방 ID 자동 조회
3. 기존 채팅방에 연결
4. 메시지 전송 성공

### 3. 에러 케이스

1. 네트워크 오류 시 적절한 에러 메시지 표시
2. 인증 실패 시 로그인 페이지로 리다이렉트
3. 채팅방 생성 실패 시 재시도 옵션 제공
