import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('INPUT 컴포넌트 테스트', () => {
  describe('Input Rendering', () => {
    it('기본 Input 요소가 렌더링 된다.', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('placeholder가 표시되는가?', () => {
      const input = render(<Input placeholder="이메일을 입력해주세요" />);
      expect(
        input.getByPlaceholderText('이메일을 입력해주세요')
      ).toBeInTheDocument();
    });

    it('기본값이 설정된다', () => {
      render(<Input defaultValue="test1@naver.com" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('test1@naver.com');
    });
  });

  describe('레이블 관련 기능들', () => {
    it('레이블이 표시된다', () => {
      render(<Input label="email" />);
      expect(screen.getByText('email')).toBeInTheDocument();
    });

    it('required가 True일 때 *가 화면에 표시된다.', () => {
      render(<Input label="PassWord" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('레이블과 input이 올바르게 연결된다.', () => {
      render(<Input label="Password" />);
      const input = screen.getByLabelText('Password');

      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe('INPUT');
    });

    it('Email ID가 설정될 때 label과 올바르게 연결된다', () => {
      render(<Input label="이메일" id="email-id" />);
      const input = screen.getByLabelText('이메일');
      expect(input).toHaveAttribute('id', 'email-id');

      const label = screen.getByText('이메일');
      expect(label).toHaveAttribute('for', 'email-id');
    });
  });

  describe('에러 상태', () => {
    it('에러 메시지가 표시된다', () => {
      render(<Input error="이메일의 형식이 올바르지 않습니다" />);
      const errorMessage =
        screen.getByText('이메일의 형식이 올바르지 않습니다');

      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('text-red-500');
    });

    it('에러 상태일 때 input에 aria-invalid가 설정된다', () => {
      render(<Input error="비밀번호를 잘못 입력하였습니다." />);
      const input = screen.getByText('비밀번호를 잘못 입력하였습니다.');

      expect(input).toBeInTheDocument();
    });

    it('에러 상태일 때 input과 여러 메시지가 올바르게 연결된다.', () => {
      render(<Input error="이메일을 입력해주세요" id="email-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'email-input');

      const errorElement = screen.getByText('이메일을 입력해주세요');
      expect(errorElement).toBeInTheDocument();
    });
  });

  describe('사용자가 상호작용을 하였을 때', () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    it('onChange 이벤트가 발생하였을 때', async () => {
      render(<Input onChange={spy} />);
      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(spy).toHaveBeenCalled();
    });

    it('onFocus 이벤트가 발생하였을 때', async () => {
      render(<Input onFocus={spy} />);
      const input = screen.getByRole('textbox');
      await user.click(input);

      expect(spy).toHaveBeenCalled();
    });

    it('onBlur 이벤트가 발생하였을 때', async () => {
      render(<Input onBlur={spy} />);
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('접근성', () => {
    const spy = vi.fn();

    it('ref가 올바르게 전달된다', () => {
      render(<Input ref={spy} />);
      expect(spy).toHaveBeenCalled();
    });
  });
});
