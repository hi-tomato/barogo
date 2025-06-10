import Link from "next/link";

export default function MainBanner() {
  return (
    <div className="mt-8 bg-gradient-to-r from-[#1076dd] rounded-xl p-6 text-white">
      <h3 className="font-semibold text-lg mb-2">💡 Tip</h3>
      <p className="text-sm opacity-90">
        바로팟에서 새로운 사람들과 맛집을 함께 즐겨보세요!
        <br />
        혼자 가기 부담스러운 맛집도 이제 걱정 없어요.
      </p>
      <Link href="/baropot">바로가기</Link>
    </div>
  );
}
