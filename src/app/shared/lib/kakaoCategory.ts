// TODO: 카카오 카테고리 필터링 작업을 추가적으로 진행해여함, (카테고리가 없으면 400에러가 발생함.)
export const mapCategory = (kakaoCategory: string): string => {
  if (
    kakaoCategory.includes("한식") ||
    kakaoCategory.includes("고기") ||
    kakaoCategory.includes("국밥")
  )
    return "KOREAN";
  if (kakaoCategory.includes("중식")) return "CHINESE";
  if (kakaoCategory.includes("일식")) return "JAPANESE";
  if (
    kakaoCategory.includes("양식") ||
    kakaoCategory.includes("이탈리안") ||
    kakaoCategory.includes("멕시칸")
  )
    return "WESTERN";
  if (kakaoCategory.includes("카페") || kakaoCategory.includes("커피"))
    return "CAFE";
  if (kakaoCategory.includes("술집") || kakaoCategory.includes("호프"))
    return "BAR";
  return "ETC"; // 기본값
};
