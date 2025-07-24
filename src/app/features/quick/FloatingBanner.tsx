import React from 'react';

export default function FloatingBanner() {
  return (
    <div className="rounded-xl bg-gradient-to-r from-[#1C4E80] to-[#2563eb] p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-xl font-bold">⚡ 바로팟 만들기</h2>
          <p className="text-sm opacity-90">
            맛집을 선택하고 바로팟을 만들어보세요!
            <br />
            함께 식사할 친구를 찾아보세요.
          </p>
        </div>
        <div className="text-4xl">🍽️</div>
      </div>
    </div>
  );
}
