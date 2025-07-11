import { describe, it, expect, test } from 'vitest';
import { queryKeys } from '../queryKeys';
import { BaropotsQueries } from '../../types/baropots';
import {
  BaropotStatus,
  ParticipantAgeGroup,
  ParticipantGender,
  RestaurantCategory,
} from '../../types/enums';

describe('queryKeys', () => {
  describe('baropot', () => {
    test('ALL', () => {
      expect(queryKeys.baropot.all).toEqual(['baropot']);
    });

    test('LISTS', () => {
      expect(queryKeys.baropot.lists()).toEqual(['baropot', 'list']);
    });

    test('LIST without queries', () => {
      expect(queryKeys.baropot.list()).toEqual(['baropot', 'list', undefined]);
    });

    test('List with queries', () => {
      const fullFieldQueries: BaropotsQueries = {
        statusList: BaropotStatus.OPEN,
        title: '해뜰날 곱창 먹으러 가실 분~?',
        tags: ['한식', '저녁'],
        participantGenderList: ParticipantGender.ANY,
        participantAgeGroupList: ParticipantAgeGroup.TWENTIES,
        restaurantName: '이경문해뜰날 곱창',
        restaurantCategory: RestaurantCategory.KOREAN,
        address: '서울시 강남구',
        lat: 37.5665,
        lng: 126.978,
        radius: 10,
      };

      expect(queryKeys.baropot.list(fullFieldQueries)).toEqual([
        'baropot',
        'list',
        fullFieldQueries,
      ]);
    });

    test('DETAILS', () => {
      expect(queryKeys.baropot.details()).toEqual(['baropot', 'detail']);
    });

    test('DETAIL', () => {
      expect(queryKeys.baropot.detail(1)).toEqual(['baropot', 'detail', 1]);
    });

    test('EDITS', () => {
      expect(queryKeys.baropot.edits()).toEqual(['baropot', 'edit']);
    });

    test('EDIT', () => {
      expect(queryKeys.baropot.edit(1)).toEqual(['baropot', 'edit', 1]);
    });

    test('HostLists', () => {
      expect(queryKeys.baropot.hostLists()).toEqual(['baropot', 'host']);
    });
  });
});
