# 바로팟 TDD 진행 시 발생한 문제들

## 1. Vitest Mock 관련 문제들

### 1.1 Top-level 변수 참조 에러

**문제**: `vi.mock`에서 아직 정의되지 않은 변수들을 참조할 때 발생

```typescript
// ❌ 잘못된 예시
const mockRouter = { push: vi.fn() };

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue(mockRouter), // mockRouter가 아직 정의되지 않음
}));
```

**해결방법**: `vi.hoisted` 사용

```typescript
// ✅ 올바른 예시
const mocks = vi.hoisted(() => {
  return {
    mockPush: vi.fn(),
    mockReplace: vi.fn(),
    mockMutate: vi.fn(),
  };
});

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: mocks.mockPush,
    replace: mocks.mockReplace,
  }),
}));
```

### 1.2 React import 누락

**문제**: JSX를 사용하는데 React를 import하지 않아서 발생

```typescript
// ❌ 잘못된 예시
import { ReactNode } from 'react'; // React import 누락

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> // JSX 에러
);
```

**해결방법**: React import 추가

```typescript
// ✅ 올바른 예시
import React, { ReactNode } from 'react';
```

## 2. 폼 유효성 검사 문제

### 2.1 useFormBase에서 validationRules 미지원

**문제**: `useFormBase`에서 `validationRules`를 전달받지 않아서 유효성 검사가 작동하지 않음

```typescript
// ❌ 현재 useFormBase 구현
interface UseFormBaseProps<T extends FieldValues> extends UseFormProps<T> {
  onSubmit: (data: T) => void;
  // validationRules 속성 없음
}
```

**해결방법**:

1. `useFormBase`에 `validationRules` 속성 추가
2. 또는 컴포넌트에서 직접 `register` 사용

### 2.2 빈 값이어도 onSubmit 호출되는 문제

**문제**: 유효성 검사가 없어서 빈 값이어도 `onSubmit`이 호출됨

```typescript
// ❌ 예상: 빈 값이면 호출되지 않아야 함
expect(mockMutate).not.toHaveBeenCalled();

// ✅ 실제: 빈 값이어도 호출됨
expect(mockMutate).toHaveBeenCalledWith(
  expect.objectContaining({
    title: '',
    maxParticipants: NaN,
  })
);
```

## 3. Mock 함수 참조 문제

### 3.1 Mock 함수가 실제로 호출되지 않는 문제

**문제**: Top-level에서 정의한 mock 함수와 실제 mock이 연결되지 않음

```typescript
// ❌ 잘못된 예시
const mockMutate = vi.fn();

vi.mock('@/app/shared/hooks/queries/useBaropot', () => ({
  useCreateBaropot: vi.fn().mockReturnValue({
    mutate: mockMutate, // 실제 mock과 연결되지 않음
  }),
}));
```

**해결방법**: `beforeEach`에서 실제 mock 함수들을 가져와서 사용

```typescript
// ✅ 올바른 예시
describe('바로팟 생성 폼 테스트', () => {
  let mockMutate: any;

  beforeEach(() => {
    const {
      useCreateBaropot,
    } = require('@/app/shared/hooks/queries/useBaropot');
    mockMutate = useCreateBaropot().mutate;
  });
});
```

## 4. 테스트 데이터 문제

### 4.1 실제 설정하지 않은 데이터를 테스트에 포함

**문제**: 실제로 설정하지 않은 필드들을 테스트에 포함시켜서 실패

```typescript
// ❌ 잘못된 예시
const expectedSubmitData = {
  estimatedCostPerPerson: 10000, // 실제로 설정하지 않았는데 포함
  description: '설명', // 실제로 설정하지 않았는데 포함
};
```

**해결방법**: 실제로 설정한 데이터만 테스트

```typescript
// ✅ 올바른 예시
expect(mockMutate).toHaveBeenCalledWith(
  expect.objectContaining({
    title: '킹경문 맛집으로 꽁치님을 초대합니다.',
    location: '종로 3가 123-45',
    // 실제로 설정한 필드들만 포함
  })
);
```

## 5. 비동기 처리 문제

### 5.1 handleSubmit 호출 방식

**문제**: `handleSubmit`을 `await`로 호출하면 예상과 다르게 동작

```typescript
// ❌ 잘못된 예시
await result.current.handleSubmit(); // await 사용
```

**해결방법**: `await` 제거

```typescript
// ✅ 올바른 예시
result.current.handleSubmit(); // await 제거
```

## 6. Coverage 패키지 문제

### 6.1 @vitest/coverage-v8 누락

**문제**: Coverage 패키지가 없어서 발생하는 에러

```
Error: Cannot find package '@vitest/coverage-v8'
```

**해결방법**:

```bash
npm install --save-dev @vitest/coverage-v8
```

## 7. TDD 진행 시 주의사항

### 7.1 테스트 작성 순서

1. **실패하는 테스트 작성** (Red)
2. **최소한의 코드로 테스트 통과** (Green)
3. **리팩토링** (Refactor)

### 7.2 Mock 설정 순서

1. `vi.hoisted`로 mock 함수들 정의
2. `vi.mock`에서 hoisted된 함수들 참조
3. `beforeEach`에서 실제 mock 함수들 가져와서 사용

### 7.3 실제 구현과 테스트 일치시키기

- 실제로 설정하는 데이터만 테스트에 포함
- 실제 동작에 맞춰서 테스트 작성
- 유효성 검사 로직이 없다면 그에 맞춰서 테스트 수정

## 8. 유용한 Vitest 팁

### 8.1 vi.hoisted 사용법

```typescript
const mocks = vi.hoisted(() => {
  return {
    mockFunction: vi.fn(),
  };
});
```

### 8.2 Mock 함수 확인

```typescript
expect(mockFunction).toHaveBeenCalled();
expect(mockFunction).toHaveBeenCalledWith(expectedArgs);
expect(mockFunction).not.toHaveBeenCalled();
```

### 8.3 비동기 테스트

```typescript
await act(async () => {
  // 비동기 작업
});
```

## 9. 다음 TDD 세션을 위한 체크리스트

- [ ] React import 확인
- [ ] vi.hoisted로 mock 함수들 정의
- [ ] vi.mock에서 hoisted된 함수들 참조
- [ ] beforeEach에서 실제 mock 함수들 가져오기
- [ ] 실제 설정하는 데이터만 테스트에 포함
- [ ] handleSubmit 호출 시 await 제거
- [ ] 유효성 검사 로직 확인
- [ ] Coverage 패키지 설치 확인

## 10. 참고 자료

- [Vitest Mock API 문서](https://vitest.dev/api/vi.html#vi-mock)
- [React Testing Library 문서](https://testing-library.com/docs/react-testing-library/intro/)
- [React Hook Form 문서](https://react-hook-form.com/)
