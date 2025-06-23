import { BaropotStatus } from "@/app/shared/types/enums";

export const getStatusColor = (status: BaropotStatus) => {
  switch (status) {
    case BaropotStatus.OPEN:
      return "bg-blue-100 text-blue-600";
    case BaropotStatus.FULL:
      return "bg-gray-100 text-gray-600";
    case BaropotStatus.IN_PROGRESS:
      return "bg-green-100 text-green-600";
    case BaropotStatus.COMPLETED:
      return "bg-purple-100 text-purple-600";
    case BaropotStatus.CANCELLED:
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export const getStatusText = (status: BaropotStatus) => {
  switch (status) {
    case BaropotStatus.OPEN:
      return "모집중";
    case BaropotStatus.FULL:
      return "정원 마감";
    case BaropotStatus.IN_PROGRESS:
      return "모임 진행중";
    case BaropotStatus.COMPLETED:
      return "모임 완료";
    case BaropotStatus.CANCELLED:
      return "모임 취소";
    default:
      return "알 수 없음";
  }
};
