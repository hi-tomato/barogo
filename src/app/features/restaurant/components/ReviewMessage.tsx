export default function ReviewMessage() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
      <div className="flex items-start space-x-2">
        <span className="text-blue-600 text-lg flex-shrink-0">💡</span>
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">맛집 등록 안내</p>
          <p>
            등록된 맛집은 다른 사용자들도 볼 수 있으며, 바로팟 생성 시 선택할 수
            있습니다. 정확하고 유용한 정보를 입력해주세요!
          </p>
        </div>
      </div>
    </div>
  );
}
