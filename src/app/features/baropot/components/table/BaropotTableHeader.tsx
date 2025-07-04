import { Header } from "@/app/shared/ui";

export default function BaropotTableHeader() {
  return (
    <Header
      title="전체 바로팟"
      rightContent={
        <p className="text-sm text-gray-500">모든 바로팟을 한눈에 확인하세요</p>
      }
    />
  );
}
