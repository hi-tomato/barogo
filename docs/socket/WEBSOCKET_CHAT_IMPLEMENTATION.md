# WebSocket 채팅 구현 문서

## 📋 개요

바로팟 채팅 기능을 WebSocket을 사용하여 실시간으로 구현한 과정을 정리한 1차 문서입니다.
현재 작업을 진행하고 있으며, 오류가 발생했던 것과 추후에 작업해야하는 것들을 정리하였습니다.

## 🎯 목표

- Socket.IO를 사용한 실시간 채팅 기능 구현
- React 훅으로 WebSocket 연결 관리
- 안정적인 에러 처리 및 재연결 로직

## 🔧 구현 과정

### 1단계: BaropotChatService 클래스 구현

#### 구현 세부사항

- **연결 관리**: Socket.IO 클라이언트 초기화 및 연결 상태 관리
- **인증**: JWT 토큰을 헤더에 포함하여 서버 인증
- **에러 처리**: 연결 실패, 인증 실패, 네트워크 오류 등 다양한 에러 상황 처리

#### 주요 기능

```typescript
export class BaropotChatService {
  private socket: Socket | null = null;
  private isConnected = false;

  // 연결
  async connect(token: string): Promise<void>;

  // 채팅방 입장
  async joinRoom(baropotChatRoomId: number): Promise<string>;

  // 채팅방 퇴장
  async leaveRoom(baropotChatRoomId: number): Promise<string>;

  // 메시지 전송
  async sendMessage({
    baropotChatRoomId,
    content,
  }: SendMessageRequest): Promise<string>;

  // 읽음 처리
  async markAsRead(baropotChatRoomId: number): Promise<string>;

  // 이벤트 리스너
  onNewMessage(callback: (newMessage: NewMessageEvent) => void);
  onMessagesReceived(callback: (readMessages: ReadMessageEvent) => void);
}
```

### 2단계: useWebSocket React 훅 구현

#### 주요 특징

- **useCallback**: 불필요한 리렌더링 방지
- **useRef**: 서비스 인스턴스 참조 유지
- **useEffect**: 컴포넌트 생명주기에 따른 연결/해제 관리
- **에러 상태 관리**: 연결 실패 시 사용자에게 피드백 제공

#### 훅 구조

```typescript
export const useWebSocket = ({
  token,
  onNewMessageEvent,
  onMessagesReadEvent,
}: WebSocketConfig) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatServiceRef = useRef<BaropotChatService | null>(null);

  // 연결
  const connect = useCallback(async () => { ... }, [token]);

  // 채팅방 입장
  const joinRoom = useCallback(async (baropotChatRoomId: number) => { ... }, [isConnected]);

  // 메시지 전송
  const sendMessage = useCallback(async (baropotChatRoomId: number, content: string) => { ... }, [isConnected]);

  // 기타 메서드들...

  return {
    isConnected,
    error,
    joinRoom,
    leaveRoom,
    sendMessage,
    markAsRead,
  };
};
```

### 3단계: 채팅 페이지 UI 구현

#### 목적

- 실시간 채팅 인터페이스 제공
- 메시지 전송 및 수신 UI
- 연결 상태 표시

#### 구현 내용

```typescript
export default function BaropotChatPage() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const params = useParams();
  const baropotChatRoomId = Number(params.baropotId);
  const token = getAccessToken();

  const { isConnected, error, joinRoom, sendMessage } = useWebSocket({
    token: token || '',
    onNewMessageEvent: (message) => {
      setMessages((prev) => [...prev, message]);
    },
  });

  // 채팅방 입장
  useEffect(() => {
    if (isConnected && baropotChatRoomId && !isNaN(baropotChatRoomId)) {
      joinRoom(baropotChatRoomId);
    }
  }, [isConnected, joinRoom, baropotChatRoomId]);

  // 메시지 전송
  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() || isSending) return;
    if (text.trim().length > 1000) return;

    setIsSending(true);
    try {
      const messageId = await sendMessage(baropotChatRoomId, text);

      // 로컬 상태에 메시지 추가
      const newMessage = {
        id: messageId || Date.now(),
        content: text,
        senderId: 'me',
        timestamp: new Date().toISOString(),
        isMyMessage: true,
      };
      setMessages((prev) => [...prev, newMessage]);
      setText('');
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    } finally {
      setIsSending(false);
    }
  };
}
```

## 🚨 발생한 문제들 및 해결 과정

### 1. Transport Unknown 에러

#### 문제 상황

```
{code: 0, message: "Transport unknown"}
```

#### 원인 분석

- 서버가 WebSocket만 지원하는데 클라이언트가 polling을 시도
- Socket.IO 버전 불일치

#### 해결 방법

```typescript
this.socket = io(API_URL, {
  extraHeaders: { token },
  transports: ['websocket'], // WebSocket만 사용
  forceNew: true,
});
```

### 2. SEND_MESSAGE 이벤트가 서버로 전송되지 않는 문제 (ing~)

#### 문제 상황

- Network 탭에서 `JOIN_ROOM` 이벤트는 보이지만 `SEND_MESSAGE` 이벤트가 없음
- 클라이언트에서는 전송 시도 로그가 찍히지만 서버로 전송되지 않음
- 서버에서 `SEND_MESSAGE` 이벤트 리스너가 없는지 확인 요청 (07.22)

## 📊 현재 상태

### ✅ 완료된 기능

- [x] WebSocket 연결 및 기본 구조
- [x] React 훅으로 WebSocket 래핑
- [x] 채팅 페이지 UI 기본 구조
- [x] 메시지 전송 기능 (클라이언트 측)
- [x] 연결 상태 관리
- [x] 에러 처리 기본 구조

### 🔄 진행 중인 작업

- [ ] 서버 연결 문제 해결
- [ ] SEND_MESSAGE 이벤트 서버 전송 문제 해결
- [ ] 실시간 메시지 수신 기능 완성

### 📋 추가 예정 기능

- [ ] 토스트 알림 시스템
- [ ] 실시간 메시지 수신 기능
- [ ] 채팅방 관리 기능
- [ ] 메시지 읽음 처리
- [ ] UI/UX 개선
- [ ] 에러 처리 및 안정성 개선
- [ ] 테스트 코드 작성
