const ACCESS_TOKEN_KEY = "access_token";

// TODO: 토큰을 저장하는
export const setAccessToken = (token: string) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

// TODO: 토큰을 조회하는
export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return null;
};

// TODO: 토큰을 삭제하는
export const removeAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};
