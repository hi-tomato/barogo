# Button 컴포넌트 테스트 작성 가이드

## 개요

Button 컴포넌트의 테스트 코드를 작성하는 과정을 단계별로 필기하였습니다!

## 1. 테스트 파일 구조

```typescript
// src/app/shared/ui/test/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';
```

## 2. 기본 렌더링 테스트

```typescript
describe('Button', () => {
  test('텍스트가 올바르게 렌더링된다', () => {
    render(<Button>클릭하세요</Button>);

    expect(screen.getByRole('button', { name: '클릭하세요' })).toBeInTheDocument();
  });
});
```

**핵심 포인트:**

- `render()`: 컴포넌트를 가상 DOM에 렌더링
- `screen.getByRole()`: 접근성 역할로 요소 찾기
- `toBeInTheDocument()`: 요소가 DOM에 존재하는지 확인

## 3. 사용자 상호작용 테스트

```typescript
test('클릭 이벤트가 올바르게 동작한다', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<Button onClick={handleClick}>클릭하세요</Button>);

  await user.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

**핵심 포인트:**

- `vi.fn()`: 모의 함수 생성 (Vitest의 mock function)
- `userEvent.setup()`: 사용자 이벤트 시뮬레이션 설정
- `await user.click()`: 비동기 클릭 이벤트 실행
- `toHaveBeenCalledTimes()`: 함수 호출 횟수 확인

## 4. 상태별 테스트

### disabled 상태 테스트

```typescript
test('disabled 상태에서 클릭이 비활성화된다', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<Button disabled onClick={handleClick}>클릭하세요</Button>);

  await user.click(screen.getByRole('button'));

  expect(handleClick).not.toHaveBeenCalled();
});
```

### loading 상태 테스트

```typescript
test('loading 상태에서 스피너가 표시된다', () => {
  render(<Button loading>로딩중</Button>);

  expect(document.querySelector('.animate-spin')).toBeInTheDocument();
});
```

**핵심 포인트:**

- `not.toHaveBeenCalled()`: 함수가 호출되지 않았음을 확인
- `document.querySelector()`: CSS 선택자로 요소 찾기

## 5. 다양한 variant 테스트 (스냅샷 테스트)

```typescript
test('모든 variant가 올바르게 렌더링된다', () => {
  const variants = ['primary', 'secondary', 'outline', 'ghost', 'link'] as const;

  variants.forEach(variant => {
    const { container } = render(<Button variant={variant}>테스트</Button>);
    expect(container.firstChild).toMatchSnapshot(`button-${variant}`);
  });
});
```

**핵심 포인트:**

- `forEach()`: 배열 반복으로 효율적인 테스트
- `toMatchSnapshot()`: 스냅샷 테스트로 UI 변경 감지
- `container.firstChild`: 렌더링된 컴포넌트의 루트 요소

## 6. 전체 테스트 코드

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Button } from '../Button';

describe('Button', () => {
  test('텍스트가 올바르게 렌더링된다', () => {
    render(<Button>클릭하세요</Button>);

    expect(screen.getByRole('button', { name: '클릭하세요' })).toBeInTheDocument();
  });

  test('클릭 이벤트가 올바르게 동작한다', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>클릭하세요</Button>);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disabled 상태에서 클릭이 비활성화된다', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button disabled onClick={handleClick}>클릭하세요</Button>);

    await user.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('loading 상태에서 스피너가 표시된다', () => {
    render(<Button loading>로딩중</Button>);

    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  test('모든 variant가 올바르게 렌더링된다', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive', 'success', 'warning', 'info', 'dark'] as const;

    variants.forEach(variant => {
      const { container } = render(<Button variant={variant}>테스트</Button>);
      expect(container.firstChild).toMatchSnapshot(`button-${variant}`);
    });
  });
});
```

### Button TDD에 사용되었던 매처

- `toBeInTheDocument()`: 요소가 DOM에 존재
- `toHaveBeenCalled()`: 함수가 호출됨
- `toHaveBeenCalledTimes(n)`: 함수가 n번 호출됨
- `toMatchSnapshot()`: 스냅샷과 일치
