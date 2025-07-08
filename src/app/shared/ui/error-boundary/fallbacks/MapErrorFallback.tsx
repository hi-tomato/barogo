const MapErrorFallback = () => (
  <div className="flex h-full items-center justify-center bg-[#E6EEF5]">
    <div className="rounded-xl bg-white p-6 text-center shadow-sm">
      <div className="mb-4">📍</div>
      <h3 className="mb-2 font-medium text-[#2B2B2B]">
        지도를 불러올 수 없어요
      </h3>
      <p className="text-sm text-[#8A8A8A]">네트워크를 확인해주세요</p>
    </div>
  </div>
);
