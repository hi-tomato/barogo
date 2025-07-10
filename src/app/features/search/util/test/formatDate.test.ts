import { describe, expect, it } from 'vitest';
import { formatDate } from '../formatDate';

describe('formatDate', () => {
  const now = new Date();

  it('오늘을 반환한다.', () => {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const result = formatDate(today.toISOString());

    expect(result).toBe('오늘');
  });

  it('어제를 반환한다.', () => {
    const yesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1
    );

    const result = formatDate(yesterday.toISOString());

    expect(result).toBe('어제');
  });

  it('일주일 이내일 때, "X일 전"을 반환한다.', () => {
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const result = formatDate(threeDaysAgo.toISOString());

    expect(result).toBe('3일 전');
  });

  it('일주일 이내일 때, "일주일 전"을 반환한다.', () => {
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const result = formatDate(sevenDaysAgo.toISOString());

    const expectedMonth = sevenDaysAgo.getMonth() + 1;
    const expectedDay = sevenDaysAgo.getDate();
    expect(result).toBe(`${expectedMonth}월 ${expectedDay}일`);
  });
});
