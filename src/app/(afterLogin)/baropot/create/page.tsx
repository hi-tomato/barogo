"use client";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";

interface BaropotFormData {
  title: string;
  restaurant: string;
  meetingLocation: string;
  date: string;
  time: string;
  maxPeople: string;
  description?: string;
}

export default function CreateBaropotForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 맛집 정보 받아오기
  const restaurantData = searchParams?.get("restaurant")
    ? JSON.parse(decodeURIComponent(searchParams.get("restaurant")!))
    : null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BaropotFormData>({
    defaultValues: {
      restaurant: restaurantData?.name || "",
      maxPeople: "2",
    },
  });

  const onSubmit = async (data: BaropotFormData) => {
    // 서버 전송용 데이터 - MVP 필수 필드만
    const submitData = {
      title: data.title.trim(),
      restaurant: data.restaurant.trim(),
      meetingLocation: data.meetingLocation.trim(),
      date: data.date,
      time: data.time,
      maxPeople: parseInt(data.maxPeople),

      // 시스템 필드
      hostId: "user123", // TODO: 실제 로그인 사용자 ID
      status: "recruiting" as const,
      currentPeople: 1,
      createdAt: new Date(),

      // 선택 필드
      ...(data.description?.trim() && { description: data.description.trim() }),
    };

    console.log("MVP 바로팟 생성 데이터:", submitData);
    // TODO: 실제 API 호출
    // await baropot.create(submitData);

    alert("✅ 바로팟이 생성되었습니다!");
    router.push("/main");
  };

  return (
    <div className="min-h-screen bg-[#E6EEF5] pt-16 pb-24">
      {/* 헤더 */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-[#2B2B2B]">
            새 바로팟 만들기
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-6 space-y-6">
        {/* 선택된 맛집 정보 */}
        {restaurantData && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-orange-600">🎯</span>
              <h3 className="font-semibold text-orange-800">선택된 맛집</h3>
            </div>
            <p className="font-medium text-gray-900">{restaurantData.name}</p>
            <p className="text-sm text-gray-600">{restaurantData.location}</p>
            <p className="text-xs text-gray-500">{restaurantData.category}</p>
          </div>
        )}

        {/* 필수 정보만 */}
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
          {/* 바로팟 제목 */}
          <div>
            <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
              바로팟 제목 <span className="text-red-500">*</span>
            </label>
            <input
              {...register("title", {
                required: "바로팟 제목을 입력해주세요",
                minLength: {
                  value: 2,
                  message: "제목은 2글자 이상 입력해주세요",
                },
              })}
              placeholder="EX: 홍대 맛집 투어 같이 가실 분!"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* 맛집 이름 (수정 가능) */}
          <div>
            <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
              맛집 이름 <span className="text-red-500">*</span>
            </label>
            <input
              {...register("restaurant", {
                required: "맛집 이름을 입력해주세요",
              })}
              placeholder="홀리스 타코"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
            />
            {errors.restaurant && (
              <p className="text-red-500 text-sm mt-1">
                {errors.restaurant.message}
              </p>
            )}
          </div>

          {/* 만날 장소 */}
          <div>
            <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
              만날 장소 <span className="text-red-500">*</span>
            </label>
            <input
              {...register("meetingLocation", {
                required: "만날 장소를 입력해주세요",
              })}
              placeholder="홍대입구역 2번 출구"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
            />
            {errors.meetingLocation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.meetingLocation.message}
              </p>
            )}
          </div>

          {/* 인원 수 */}
          <div>
            <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
              모집 인원 <span className="text-red-500">*</span>
            </label>
            <select
              {...register("maxPeople", {
                required: "모집 인원을 선택해주세요",
              })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
            >
              <option value="2">2명 (나 + 1명)</option>
              <option value="3">3명 (나 + 2명)</option>
              <option value="4">4명 (나 + 3명)</option>
              <option value="5">5명 (나 + 4명)</option>
              <option value="6">6명 (나 + 5명)</option>
            </select>
            {errors.maxPeople && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxPeople.message}
              </p>
            )}
          </div>

          {/* 날짜 & 시간 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                날짜 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("date", { required: "날짜를 선택해주세요" })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                시간 <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                {...register("time", { required: "시간을 선택해주세요" })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
              />
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>

          {/* 간단한 설명 (선택) */}
          <div>
            <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
              간단한 설명 (선택)
            </label>
            <textarea
              {...register("description")}
              placeholder="같이 가는 분들에게 한 마디!"
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="pb-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#1C4E80] to-[#2563eb] text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "생성 중..." : "바로팟 만들기 🚀"}
          </button>
          <p className="text-center text-xs text-gray-500 mt-2">
            필수 정보만 입력하면 바로 생성됩니다!
          </p>
        </div>
      </form>
    </div>
  );
}
