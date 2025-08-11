# 🧪 vitest 테스트 환경 설정 가이드

## 📦 필요한 패키지 설치

1. 테스트 러너 & 환경:

- vitest: 테스트 러너
- jsdom: 브라우저 환경 시뮬레이션

2. React 테스트 라이브러리:

- @testing-library/react: React 컴포넌트 테스트
- @testing-library/dom: DOM 쿼리 및 조작
- @testing-library/user-event: 사용자 상호작용 시뮬레이션
- @testing-library/jest-dom: 추가 매처 (toBeInTheDocument 등)

### 기본 테스트 라이브러리

```bash
npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/dom @testing-library/jest-dom
```

### 브라우저 환경 시뮬레이션

```bash
npm install --save-dev jsdom
```

## ⚙️ 설정 파일 구성

### 1. `vitest.config.ts` 설정

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // 브라우저 환경 시뮬레이션
    setupFiles: ['./src/test/setup.ts'], // 테스트 초기화 파일
  },
});
```

### 2. `src/test/setup.ts` 생성

```typescript
import '@testing-library/jest-dom';
```

## 🔗 참고 자료

- [Vitest 공식 문서](https://vitest.dev/)
- [React Testing Library 가이드](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM 매처](https://github.com/testing-library/jest-dom)
- [User Event 가이드](https://testing-library.com/docs/user-event/intro)

---
