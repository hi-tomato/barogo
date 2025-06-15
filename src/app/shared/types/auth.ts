export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignupResponse {
  user: User;
  message: string;
}

export interface SignInResponse {
  accessToken: string;
  user?: User;
  message?: string;
}
