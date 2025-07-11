import { describe, expect, test } from 'vitest';
import { cn } from '../cn';

describe('cn 함수', () => {
  test('문자열들을 공백으로 연결', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  test('조건부로 클래스 네이밍을 처리', () => {
    expect(cn('base', true && 'active', false && 'completed')).toBe(
      'base active'
    );
  });

  test('배열 형태의 클래스를 처리', () => {
    expect(
      cn({
        btn: true,
        'btn-primary': true,
        'btn-disable': false,
      })
    ).toBe('btn btn-primary');
  });

  test('배열 형태의 클래스를 처리', () => {
    expect(cn(['btn', 'btn-lg'], 'active')).toBe('btn btn-lg active');
  });

  test('중복된 클래스를 제거', () => {
    expect(cn('btn', 'btn', 'active')).toBe('btn active');
  });

  test('빈 값들이 있다면 무시', () => {
    expect(cn('btn', undefined, null, 0, '')).toBe('btn');
  });

  test('숫자도 문자열로 변환해서 처리', () => {
    expect(cn('btn', 123, 'active')).toBe('btn 123 active');
  });

  test('중첩된 배열을 평탄화해서 처리', () => {
    expect(cn(['btn', ['btn-primary', 'btn-lg']], 'active')).toBe(
      'btn btn-primary btn-lg active'
    );
  });

  test('조건부 테스트', () => {
    const isActive = true;
    const isDisabled = false;
    const size = 'lg';

    expect(
      cn(
        'btn',
        {
          'btn-active': isActive,
          'btn-disabled': isDisabled,
        },
        isActive && `btn-${size}`
      )
    ).toBe('btn btn-active btn-lg');
  });
});
