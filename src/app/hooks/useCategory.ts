export const getCategoryIcon = (categoryName: string) => {
  if (categoryName.includes("한식")) return "🍚";
  if (categoryName.includes("중식")) return "🥢";
  if (categoryName.includes("일식")) return "🍣";
  if (categoryName.includes("양식")) return "🍝";
  if (categoryName.includes("카페")) return "☕";
  if (categoryName.includes("치킨")) return "🍗";
  if (categoryName.includes("피자")) return "🍕";
  if (categoryName.includes("햄버거")) return "🍔";
  return "🍽️";
};

export const getGradientByCategory = (categoryName: string) => {
  if (categoryName.includes("한식")) return "from-red-400 to-orange-500";
  if (categoryName.includes("중식")) return "from-yellow-400 to-red-500";
  if (categoryName.includes("일식")) return "from-blue-400 to-green-500";
  if (categoryName.includes("양식")) return "from-purple-400 to-pink-500";
  if (categoryName.includes("카페")) return "from-amber-400 to-orange-500";
  return "from-gray-400 to-gray-600";
};
