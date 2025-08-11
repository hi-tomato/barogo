import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button 컴포넌트 테스트', () => {
  it('버튼의 텍스트가 렌더링이 된다.', () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('버튼을 클릭하면 onClick 함수가 호출된다.', async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const { getByText } = render(<Button onClick={spy}>onClick Event</Button>);

    await user.click(getByText('onClick Event'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태일 때 클릭이 동작하지 않는다', async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const { getByText } = render(
      <Button onClick={spy} disabled>
        Disabled Button
      </Button>
    );

    await user.click(getByText('Disabled Button'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('loading 상태일 때 스피너가 표시된다.', async () => {
    const { container } = render(<Button loading>Loading</Button>);

    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('primary 스타일 적용된다.', () => {
    const variants = [
      'primary',
      'secondary',
      'outline',
      'gradient',
      'ghost',
      'text',
      'tabButton',
      'kakao',
      'popularButton',
      'nearbyButton',
      'google',
    ];

    variants.forEach((v) => {
      const { container } = render(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Button variant={v as any}>Variable Button</Button>
      );
      expect(container.firstChild).toMatchSnapshot(`button-${v}`);
    });
  });
});
