// 액션 버튼 텍스트 결정 함수
export const getActionButtonText = (isLoading: boolean, hasData?: boolean) => {
  if (isLoading) return "확인 중...";
  if (hasData) return "맛집 상세보기";
  return "바로팟 만들기";
};

// 액션 버튼 아이콘 결정 함수
export const getActionButtonIcon = (isLoading: boolean, hasData?: boolean) => {
  if (isLoading) return "⏳";
  if (hasData) return "🔍";
  return "⚡";
};
