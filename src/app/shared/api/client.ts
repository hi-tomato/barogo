// TODO: 실제 백엔드 서버 들어오면, env 파일에 로컬 주소 넣기.
const BASE_URL = process.env.NEXT_PUBLICK_API_URL || "api";

// TODO: 실제 백엔드 서버 들어오면, EndPoint 추가 및 서버에서 받아올 때 옵션값들 받아오기
const apiFetch = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};
