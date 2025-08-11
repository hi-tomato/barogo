import { describe, expect, it } from 'vitest';
import { getCategoryIcon } from '../categoryHelpers';

describe('카테고리를 아이콘으로 수정하는 유틸 함수', () => {
  it('카테고리가 한식이라면 "🍚"아이콘을 반환한다.', () => {
    const result = getCategoryIcon('한식');
    expect(result).toBe('🍚');
  });

  it('카테고리가 중식이라면 "🥢"아이콘을 반환한다.', () => {
    const result = getCategoryIcon('중식');
    expect(result).toBe('🥢');
  });

  it('카테고리가 알식이라면 "🍣"아이콘을 반환한다.', () => {
    const result = getCategoryIcon('일식');
    expect(result).toBe('🍣');
  });

  it('카테고리가 양식이라면 "🍝"아이콘을 반환한다.', () => {
    const result = getCategoryIcon('양식');
    expect(result).toBe('🍝');
  });

  it('카테고리가 카페이라면 "☕"아이콘을 반환한다.', () => {
    const result = getCategoryIcon('카페');
    expect(result).toBe('☕');
  });

  it('카테고리가 치킨이라면 "🍗"아이콘을 반환한다.', () => {
    const result = getCategoryIcon('치킨');
    expect(result).toBe('🍗');
  });

  it('카테고리가 피자이라면 "🍕"아이콘을 반환한다.', () => {
    const result = getCategoryIcon('피자');
    expect(result).toBe('🍕');
  });

  it('카테고리가 햄버거이라면 "🍔"아이콘을 반환한다.', () => {
    const result = getCategoryIcon('햄버거');
    expect(result).toBe('🍔');
  });

  it('카테고리가 기타이라면 "🍽️"아이콘을 반환한다.', () => {
    const result = getCategoryIcon('기타');
    expect(result).toBe('🍽️');
  });
});
