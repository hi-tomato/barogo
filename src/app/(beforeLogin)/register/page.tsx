"use client";
import { useForm } from "react-hook-form";
import Button from "@/app/shared/ui/Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/app/shared/lib/animation";
import { useSignUp } from "@/app/shared/hooks/queries/useAuth";
import { SignupRequest } from "@/app/shared/types/auth";
import { useState } from "react";
import SignUpSuccessModal from "../_components/SignUpSuccessModal";

interface SignupFormData extends SignupRequest {
  confirmPassword: string;
  terms: boolean;
}

export default function RegisterForm() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { mutate: signUp, isPending: isLoading } = useSignUp();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignupFormData) => {
    const signupData: SignupRequest = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    signUp(signupData, {
      onSuccess: () => {
        setShowSuccessModal(true);
      },
    });
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
              htmlFor="name"
            >
              이름
            </label>
            <input
              {...register("name", {
                required: "이름을 입력해주세요",
                minLength: {
                  value: 2,
                  message: "이름은 최소 2자 이상이어야 합니다",
                },
              })}
              id="name"
              placeholder="홍길동"
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent font-suit disabled:opacity-50 ${
                errors.name ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 font-suit">
                {errors.name.message}
              </p>
            )}
          </motion.div>

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
              type="email"
              placeholder="you@example.com"
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent font-suit disabled:opacity-50 ${
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
              })}
              id="password"
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent font-suit disabled:opacity-50 ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 font-suit">
                {errors.password.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm text-[#2B2B2B] mb-1 font-suit">
              비밀번호 확인
            </label>
            <input
              {...register("confirmPassword", {
                required: "비밀번호 확인을 입력해주세요",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다",
              })}
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent font-suit disabled:opacity-50 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 font-suit">
                {errors.confirmPassword.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                {...register("terms", {
                  required: "이용약관에 동의해주세요",
                })}
                type="checkbox"
                disabled={isLoading}
                className="w-4 h-4 text-[#1C4E80] border-gray-300 rounded focus:ring-[#1C4E80] disabled:opacity-50"
              />
              <span className="text-sm text-[#2B2B2B] font-suit">
                이용약관 및 개인정보처리방침에 동의합니다
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-xs mt-1 font-suit">
                {errors.terms.message}
              </p>
            )}
          </motion.div>

          <Button
            text={isLoading ? "가입 중..." : "회원가입"}
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1C4E80] text-white font-semibold tracking-tight px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-suit disabled:opacity-50"
          />
        </motion.form>

        <SignUpSuccessModal
          isOpen={showSuccessModal}
          userName={watch("name")}
        />
        {/* 하단 */}
        <div className="text-sm text-[#8A8A8A] text-center mt-6 font-suit leading-relaxed">
          이미 계정이 있으신가요?
          <Button
            onClick={() => router.push("/login")}
            disabled={isLoading}
            className="text-[#1C4E80] font-semibold hover:underline ml-1 disabled:opacity-50"
            text="로그인"
          />
        </div>
      </div>
    </div>
  );
}
