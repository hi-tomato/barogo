import { FormData } from '../types';

export const initialState: FormData = {
  description: '',
  images: [],
  tags: '',
  openingTime: '09:00',
  closingTime: '21:00',
  lastOrderTime: '20:30',
  category: '',
};

type FormAction =
  | {
      type: 'UPDATE_FIELD';
      field: keyof FormData;
      value: string;
    }
  | { type: 'ADD_TAG'; tag: string }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_LOCATION'; lat: number; lng: number };

export default function useFormReducer(state: FormData, action: FormAction) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'ADD_TAG':
      const currentTags = state.tags.split(',').filter((t) => t.length > 0);
      if (!currentTags.includes(action.tag)) {
        return {
          ...state,
          tags: [...currentTags, action.tag].join(','),
        };
      }
      return state;
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_LOCATION':
      return { ...state, lat: action.lat, lng: action.lng };
    default:
      return state;
  }
}
