// TODO: 카카오 카테고리 필터링 작업을 추가적으로 진행해여함, (카테고리가 없으면 400에러가 발생함.)
export const mapKaKaoCategoryToServer = (kakaoCategory: string): string => {
  const category = kakaoCategory.toLowerCase();
  // TODO: 한식 케이스 (추가될 수 있음)
  if (
    category.includes("한식") ||
    category.includes("한국") ||
    category.includes("국밥") ||
    category.includes("김치") ||
    category.includes("불고기") ||
    category.includes("순대") ||
    category.includes("고기") ||
    category.includes("갈비") ||
    category.includes("삼겹살") ||
    category.includes("곱창") ||
    category.includes("족발") ||
    category.includes("보쌈")
  ) {
    console.log("✅ KOREAN으로 매핑됨");
    return "KOREAN";
  }

  // TODO: 중식 (추가될 수 있음)
  if (
    category.includes("중식") ||
    category.includes("중국") ||
    category.includes("짜장") ||
    category.includes("짬뽕") ||
    category.includes("탕수육") ||
    category.includes("마라탕") ||
    category.includes("훠궈")
  ) {
    console.log("✅ CHINESE로 매핑됨");
    return "CHINESE";
  }

  // TODO: 일식 (추가될 수 있음)
  if (
    category.includes("일식") ||
    category.includes("일본") ||
    category.includes("초밥") ||
    category.includes("스시") ||
    category.includes("우동") ||
    category.includes("라멘") ||
    category.includes("돈카츠") ||
    category.includes("사시미")
  ) {
    console.log("✅ JAPANESE로 매핑됨");
    return "JAPANESE";
  }

  // TODO: 양식 (추가될 수 있음)
  if (
    category.includes("양식") ||
    category.includes("서양") ||
    category.includes("스테이크") ||
    category.includes("파스타") ||
    category.includes("이탈리아") ||
    category.includes("이탈리안") ||
    category.includes("피자") ||
    category.includes("햄버거") ||
    category.includes("샐러드")
  ) {
    console.log("✅ WESTERN으로 매핑됨");
    return "WESTERN";
  }

  // 패스트푸드 (추가될 수 있음)
  if (
    category.includes("패스트푸드") ||
    category.includes("fastfood") ||
    category.includes("맥도날드") ||
    category.includes("버거킹") ||
    category.includes("롯데리아") ||
    category.includes("kfc") ||
    category.includes("서브웨이")
  ) {
    console.log("✅ FAST_FOOD로 매핑됨");
    return "FAST_FOOD";
  }

  // 카페 (추가될 수 있음)
  if (
    category.includes("카페") ||
    category.includes("커피") ||
    category.includes("cafe") ||
    category.includes("스타벅스") ||
    category.includes("이디야") ||
    category.includes("투썸") ||
    category.includes("빵") ||
    category.includes("베이커리")
  ) {
    console.log("✅ CAFE로 매핑됨");
    return "CAFE";
  }

  // 디저트 (추가될 수 있음)
  if (
    category.includes("디저트") ||
    category.includes("dessert") ||
    category.includes("아이스크림") ||
    category.includes("케이크") ||
    category.includes("와플") ||
    category.includes("팥빙수") ||
    category.includes("빙수") ||
    category.includes("달달")
  ) {
    console.log("✅ DESSERT로 매핑됨");
    return "DESSERT";
  }

  // 술집/바 (추가될 수 있음)
  if (
    category.includes("술집") ||
    category.includes("호프") ||
    category.includes("맥주") ||
    category.includes("bar") ||
    category.includes("pub") ||
    category.includes("이자카야") ||
    category.includes("포차") ||
    category.includes("칵테일")
  ) {
    console.log("✅ BAR로 매핑됨");
    return "BAR";
  }

  // 뷔페 (추가될 수 있음)
  if (
    category.includes("뷔페") ||
    category.includes("buffet") ||
    category.includes("부페") ||
    category.includes("샐러드바") ||
    category.includes("무한리필")
  ) {
    console.log("✅ BUFFET로 매핑됨");
    return "BUFFET";
  }

  // 퓨전 (추가될 수 있음)
  if (
    category.includes("퓨전") ||
    category.includes("fusion") ||
    category.includes("창작") ||
    category.includes("모던")
  ) {
    console.log("✅ FUSION으로 매핑됨");
    return "FUSION";
  }

  console.error("추가되지 않는, 카테고리 유형입니다");
  return "ETC";
};

// DB 상수화
export const VALID_CATEGORIES = [
  "KOREAN",
  "JAPANESE",
  "CHINESE",
  "ASIAN",
  "WESTERN",
  "MEXICAN",
  "CAFE",
  "DESSERT",
  "BAR",
  "BUFFET",
  "FUSION",
  "VEGAN",
  "FAST_FOOD",
  "ETC",
] as const;

export const isValidCategory = (category: string): boolean => {
  return VALID_CATEGORIES.includes(category as any);
};

export const getCategoryDisplayName = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    KOREAN: "한식",
    CHINESE: "중식",
    JAPANESE: "일식",
    ASIAN: "아시안",
    WESTERN: "양식",
    MEXICAN: "멕시칸",
    CAFE: "카페",
    DESSERT: "디저트",
    BAR: "술집",
    BUFFET: "뷔페",
    FUSION: "퓨전",
    VEGAN: "비건",
    FAST_FOOD: "패스트푸드",
    ETC: "기타",
  };
  return categoryMap[category];
};
