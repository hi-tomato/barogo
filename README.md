# Barogo - 맛집 공유 플랫폼

## 프로젝트 개요

유저가 맛집을 등록하고, 바로팟(번개 모임)을 등록하면 다른 유저가 참석을 비롯하여
리뷰 CRUD, 맛집 사진 업로드(AWS S3), 실시간 알림(SSE), 카카오 맵 (Marker Update) 등
다양한 기능들을 지원하는 웹 어플리케이션입니다.

## 기술 스택

### Frontend Framework

- **Next.js 15.3.3**
- **React 19.0.0**
- **TypeScript 5**

### 상태 관리 & 데이터 페칭

- **Zustand 5.0.5**
- **TanStack Query 5.79.0**
- **React Hook Form 7.57.0**

### UI/UX 라이브러리

- **Tailwind CSS 4**
- **CLSX 2.1.1**
- **Framer Motion 12.16.0**
- **React Icons 5.5.0**

### 지도 & 위치 서비스

- **Kakao Maps SDK**
- **React Kakao Maps SDK 1.1.27**
- **Geolocation API**

### HTTP 클라이언트

- **Axios 1.9.0**

### 개발 도구

- **ESLint 9**
- **Prettier 3.6.2**
- **Husky 9.1.7**
- **Vitest 3.2.4**
- **Testing Library**

## 프로젝트 아키텍처

### 디렉토리 구조

```
barogo/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (afterLogin)/      # 로그인 후 라우트
│   │   │   ├── @modal/        # 인터셉팅 라우트 (모달)
│   │   │   ├── baropot/       # 바로팟 관련 페이지
│   │   │   ├── main/          # 메인 페이지
│   │   │   ├── map/           # 지도 페이지
│   │   │   ├── mypage/        # 마이페이지
│   │   │   ├── nearby/        # 근처 맛집
│   │   │   ├── popular/       # 인기 맛집
│   │   │   ├── restaurants/   # 레스토랑 관련
│   │   │   └── search/        # 검색 페이지
│   │   ├── (beforeLogin)/     # 로그인 전 라우트
│   │   │   ├── _components/   # 공통 컴포넌트
│   │   │   ├── login/         # 로그인
│   │   │   └── register/      # 회원가입
│   │   ├── api/               # API 라우트
│   │   ├── auth/              # 소셜 로그인
│   │   └── features/          # 기능별 컴포넌트
│   │       ├── baropot/       # 바로팟 기능
│   │       ├── landing/       # 랜딩 페이지
│   │       ├── login/         # 로그인 기능
│   │       ├── main/          # 메인 기능
│   │       ├── map/           # 지도 기능
│   │       ├── mypage/        # 마이페이지 기능
│   │       ├── nearby/        # 근처 맛집 기능
│   │       ├── popular/       # 인기 맛집 기능
│   │       ├── quick/         # 퀵 기능
│   │       ├── register/      # 회원가입 기능
│   │       ├── restaurant/    # 레스토랑 기능
│   │       ├── reviews/       # 리뷰 기능
│   │       └── search/        # 검색 기능
│   └── shared/                # 공통 모듈
│       ├── api/               # API 클라이언트
│       ├── components/        # 공통 컴포넌트
│       ├── hooks/             # 커스텀 훅
│       │   ├── form/          # 폼 관련 훅
│       │   ├── queries/       # React Query 훅
│       │   └── test/          # 테스트 훅
│       ├── lib/               # 유틸리티 함수
│       │   └── test/          # 테스트 유틸리티
│       ├── providers/         # Context Provider
│       ├── services/          # 서비스 레이어
│       ├── store/             # Zustand 스토어
│       ├── types/             # TypeScript 타입 정의
│       └── ui/                # UI 컴포넌트
│           ├── error-boundary/ # 에러 바운더리
│           ├── toast/          # 토스트 알림
│           └── test/           # UI 테스트
```

### 핵심 아키텍처 패턴

#### 1. **Feature-Based Architecture**

- 기능별로 독립적인 디렉토리 구조
- 각 기능은 자체 컴포넌트, 훅, 타입을 포함
- 재사용 가능한 로직은 `shared` 디렉토리에 배치

#### 2. **Layer Architecture**

```
┌─────────────────┐
│   Components    │ ← UI 레이어
├─────────────────┤
│     Hooks       │ ← 비즈니스 로직 레이어
├─────────────────┤
│   Services      │ ← API 통신 레이어
├─────────────────┤
│   Types         │ ← 타입 정의 레이어
└─────────────────┘
```

#### 3. **State Management Strategy**

- **Zustand**: 전역 상태 (인증, 사용자 정보)
- **React Query**: 서버 상태 (API 데이터)
- **React Hook Form**: 폼 상태
- **Local State**: 컴포넌트별 로컬 상태
