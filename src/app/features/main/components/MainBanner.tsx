import Link from 'next/link';

export default function MainBanner() {
  return (
    <div className="mt-8 rounded-xl bg-gradient-to-r from-[#1076dd] to-[#1C4E80] p-6 text-white">
      <h3 className="mb-2 text-lg font-semibold">💡 Tip</h3>
      <p className="mb-3 text-sm opacity-90">
        바로팟에서 새로운 사람들과 맛집을 함께 즐겨보세요!
        <br />
        혼자 가기 부담스러운 맛집도 이제 걱정 없어요.
      </p>
      <Link
        href="/baropot"
        className="inline-block rounded-lg bg-white px-4 py-2 font-medium text-[#1076dd] transition-colors hover:bg-gray-50"
      >
        바로가기 →
      </Link>
    </div>
  );
}
