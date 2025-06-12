// 돌아오는 응답값
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// 회원가입 요청용
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

// 회원가입 API 응답
export interface SignupResponse {
  id: number;
  name: string;
  email: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}
