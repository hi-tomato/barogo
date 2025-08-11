import { describe, expect, test } from 'vitest';
import { getCategoryDisplayName, isValidCategory } from '../kakaoCategory';

describe('kakaoCategory', () => {
  describe('isValidCategory', () => {
    test('유효한 카테고리는 true를 반환해야 한다.', () => {
      expect(isValidCategory('KOREAN')).toBe(true);
      expect(isValidCategory('CHINESE')).toBe(true);
      expect(isValidCategory('JAPANESE')).toBe(true);
    });

    test('유효하지 않는 카테고리는 false를 반환해야 한다.', () => {
      expect(isValidCategory('INVALID')).toBe(false);
      expect(isValidCategory('')).toBe(false);
      expect(isValidCategory('korean')).toBe(false);
    });

    test('null/undefined 인자는 false를 반환해야 한다.', () => {
      expect(isValidCategory(null as unknown as string)).toBe(false);
      expect(isValidCategory(undefined as unknown as string)).toBe(false);
    });
  });
});

describe('getCategoryDisplayName', () => {
  test('유효한 카테고리의 한국어 이름을 반환 한다.', () => {
    expect(getCategoryDisplayName('KOREAN')).toBe('한식');
    expect(getCategoryDisplayName('CHINESE')).toBe('중식');
    expect(getCategoryDisplayName('JAPANESE')).toBe('일식');
  });

  test('유효하지 않은 카테고리는 "기타"를 반환한다.', () => {
    expect(getCategoryDisplayName('INVALID')).toBe('기타');
  });
});

describe('getCategoryDisplayName', () => {
  test('유효한 카테고리의 한국어 이름을 반환 한다.', () => {
    expect(getCategoryDisplayName('KOREAN')).toBe('한식');
    expect(getCategoryDisplayName('CHINESE')).toBe('중식');
    expect(getCategoryDisplayName('JAPANESE')).toBe('일식');
  });
});
