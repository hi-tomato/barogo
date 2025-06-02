"use client";
import React from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Button from "@/app/components/ui/Button";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    // TODO: Server Api + AfterLogin 이동 후, JWT 토큰 관리 로직
    console.log("로그인 성공! 데이터:", data);
  };

  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-12">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-sm p-6">
        {/* 타이틀 */}
        <h1 className="text-2xl font-semibold text-[#1C4E80] text-center mb-2 font-suit leading-relaxed">
          Barogo
        </h1>
        <p className="text-sm text-[#8A8A8A] text-center mb-6 font-suit leading-relaxed">
          혼밥하기 싫다면, 파티원을 구해서 바로고!
        </p>

        {/* 로그인 폼 */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm text-[#2B2B2B] mb-1 font-suit">
              이메일
            </label>
            <input
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "올바른 이메일 형식이 아닙니다",
                },
              })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent font-suit"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-suit">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm text-[#2B2B2B] mb-1 font-suit">
              비밀번호
            </label>
            <input
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8자 이상이어야 합니다",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message: "대문자 1개와 특수문자 1개를 포함해야 합니다",
                },
              })}
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-3 border rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent font-suit ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 font-suit">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            text="로그인"
            type="submit"
            className="w-full bg-[#1C4E80] text-white font-semibold tracking-tight px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-suit"
          />
          <Button
            text="카카오로 시작하기"
            type="button"
            icon={<RiKakaoTalkFill />}
            className="w-full bg-[#FEE500] text-[#000000] font-semibold tracking-tight px-6 py-3 rounded-lg hover:bg-[#FFDC00] transition-colors font-suit flex items-center justify-center gap-2"
          />
        </form>

        <div className="text-sm text-[#8A8A8A] text-center mt-6 font-suit leading-relaxed">
          아직 계정이 없으신가요?
          <Button
            text="회원가입"
            className="text-[#1C4E80] font-semibold hover:underline"
            onClick={() => router.push("/register")}
          />
        </div>
      </div>
    </div>
  );
}
