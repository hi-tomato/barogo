export const BAROPOT_CREATE_FORM_VALIDATE_RULES = {
  title: {
    required: '제목을 입력해주세요',
    minLength: { value: 2, message: '제목은 2자 이상이어야 합니다.' },
  },
  meetingLocation: {
    required: '만남 장소를 입력해주세요',
  },
  maxPeople: {
    required: '최대 인원을 입력해주세요',
    min: { value: 2, message: '최소 2명 이상이어야 합니다.' },
    max: { value: 20, message: '최대 20명까지 가능합니다.' },
  },
  date: {
    required: '날짜를 선택해주세요',
  },
  time: {
    required: '시간을 선택해주세요',
  },
  gender: {
    required: '성별 조건을 선택해주세요',
  },
  ageGroup: {
    required: '연령대 조건을 선택해주세요',
  },
  contactMethod: {
    required: '연락 방법을 선택해주세요',
  },
  paymentMethod: {
    required: '결제 방법을 선택해주세요',
  },
};

export const LOGIN_FORM_VALIDATE_RULES = {
  email: {
    required: '이메일을 입력해주세요',
    pattern: {
      value: /^\S+@\S+$/i,
      message: '올바른 이메일 형식이 아닙니다',
    },
  },
  password: {
    required: '비밀번호를 입력해주세요',
  },
};

export const REGISTER_FORM_VALIDATE_RULES = {
  name: {
    required: '이름을 입력해주세요',
    minLength: { value: 2, message: '이름은 2자 이상이어야 합니다.' },
  },
  email: {
    required: '이메일을 입력해주세요',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '올바른 이메일 형식이 아닙니다',
    },
  },
  password: {
    required: '비밀번호를 입력해주세요',
    minLength: {
      value: 8,
      message: '비밀번호는 최소 8자 이상이어야 합니다.',
    },
  },
  confirmPassword: {
    required: '비밀번호를 입력해주세요',
    validate: (value: string, password: string) => {
      return value === password || '비밀번호가 일치하지 않습니다.';
    },
  },
  terms: {
    required: '약관에 동의해주세요',
  },
};
