const hashtags = ["#바로팟 마감 직전", "#킹경문 순대곱창", "#야장 감성"];

export default function HashtagSection() {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4">추천 해시태그</h2>
      <div className="flex flex-wrap gap-2">
        {hashtags.map((tag, index) => (
          <button
            key={index}
            className="px-4 py-2 border-2 border-red-400 text-red-400 rounded-full text-sm font-medium hover:bg-red-50 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
