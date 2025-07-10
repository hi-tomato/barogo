import { describe, it, expect } from 'vitest';
import { formatTime } from '../formatTime';

describe('formatTime', () => {
  const now = new Date();
  it('1분 미만을 때, "방금 전"을 반환한다.', () => {
    const thirtySecondAgo = new Date(now.getTime() - 30 * 1000);
    const result = formatTime(thirtySecondAgo.toISOString());

    expect(result).toBe('방금 전');
  });

  it('1시간 미만일 때, "X분 전"을 반환한다.', () => {
    const fortyFiveMinutesAgo = new Date(now.getTime() - 45 * 60 * 1000);
    const result = formatTime(fortyFiveMinutesAgo.toISOString());

    expect(result).toBe('45분 전');
  });

  it('한시간 이상일 때, "X시간 전"을 반환한다.', () => {
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const result = formatTime(twoHoursAgo.toISOString());

    expect(result).toBe('2시간 전');
  });
});
