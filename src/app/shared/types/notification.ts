export interface Notification {
  id: number;
  type: "REVIEW" | "BOOKMARK";
  message: string;
  isRead: boolean;
  createdAt: string;
  sender: {
    id: number;
    name: string;
  };
  restaurant: {
    id: number;
    name: string;
  };
}
