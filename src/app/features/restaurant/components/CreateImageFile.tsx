import { FormData } from "../types";

interface CreateImageFileProps {
  formData: FormData;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

export default function CreateImageFile({
  formData,
  handleFileChange,
  removeImage,
}: CreateImageFileProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <label className="block text-sm font-medium text-[#2B2B2B] mb-3">
        맛집 사진 (최대 5장)
      </label>
      {/* 업로드 영역 */}
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center mb-4">
        <label className="cursor-pointer block">
          <div className="space-y-2">
            <div className="text-3xl">📸</div>
            <div className="text-sm text-[#8A8A8A]">
              <span className="text-[#1C4E80] hover:underline">
                클릭해서 사진 선택
              </span>
              <br />
              JPG, PNG 파일 (최대 5장)
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* 선택된 이미지 미리보기 */}
      {formData.images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {formData.images.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`미리보기 ${index + 1}`}
                className="w-full h-20 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
