export const getStatusColor = (status: string) => {
  switch (status) {
    case "recruiting":
      return "bg-blue-100 text-blue-600";
    case "full":
      return "bg-gray-100 text-gray-600";
    case "closed":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "recruiting":
      return "모집중";
    case "full":
      return "모집완료";
    case "closed":
      return "마감";
    default:
      return "알 수 없음";
  }
};
