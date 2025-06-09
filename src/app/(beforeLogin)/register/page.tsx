"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/app/lib/animation";

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  terms: boolean;
}

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    // TODO: Server Api + 회원가입 로직 처리
    console.log("회원가입 데이터 성공:", data);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-sm p-6 relative z-10">
        <h1 className="text-2xl font-semibold text-[#1C4E80] text-center mb-2 font-suit leading-relaxed">
          회원가입
        </h1>
        <p className="text-sm text-[#8A8A8A] text-center mb-6 font-suit leading-relaxed">
          바로고에서 새로운 맛집 친구들을 만나보세요!
        </p>

        {/* 회원가입 폼 */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <label
              className="block text-sm text-[#2B2B2B] mb-1 font-suit"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "올바른 이메일 형식이 아닙니다",
                },
              })}
              id="email"
              placeholder="you@example.com"
              className={`w-full px-4 py-3 border rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent font-suit ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-suit">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label
              htmlFor="nickname"
              className="block text-sm text-[#2B2B2B] mb-1 font-suit"
            >
              닉네임
            </label>
            <input
              {...register("nickname", {
                required: "닉네임을 입력해주세요",
                minLength: {
                  value: 2,
                  message: "닉네임은 최소 2자 이상이어야 합니다",
                },
                maxLength: {
                  value: 10,
                  message: "닉네임은 최대 10자까지 가능합니다",
                },
              })}
              id="nickname"
              placeholder="닉네임"
              className={`w-full px-4 py-3 border rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent font-suit ${
                errors.nickname ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.nickname && (
              <p className="text-red-500 text-xs mt-1 font-suit">
                {errors.nickname.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label
              htmlFor="password"
              className="block text-sm text-[#2B2B2B] mb-1 font-suit"
            >
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
              id="password"
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
          </motion.div>

          {/* 비밀번호 확인 */}
          <motion.div variants={itemVariants}>
            <label
              id="confirm"
              className="block text-sm text-[#2B2B2B] mb-1 font-suit"
            >
              비밀번호 확인
            </label>
            <input
              {...register("confirmPassword", {
                required: "비밀번호 확인을 입력해주세요",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다",
              })}
              id="confirm"
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-3 border rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent font-suit ${
                errors.confirmPassword ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 font-suit">
                {errors.confirmPassword.message}
              </p>
            )}
          </motion.div>

          {/* 에러 메시지 */}
          {errors.terms && (
            <p className="text-red-500 text-xs font-suit">
              {errors.terms.message}
            </p>
          )}

          <Button
            text={isSubmitting ? "가입 중..." : "회원가입"}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1C4E80] text-white font-semibold tracking-tight px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-suit disabled:opacity-50"
          />
        </motion.form>

        {/* 하단 */}
        <div className="text-sm text-[#8A8A8A] text-center mt-6 font-suit leading-relaxed">
          이미 계정이 있으신가요?
          <Button
            onClick={() => router.push("/login")}
            className="text-[#1C4E80] font-semibold hover:underline"
            text="로그인"
          />
        </div>
      </div>
    </div>
  );
}
