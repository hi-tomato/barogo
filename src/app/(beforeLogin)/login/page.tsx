"use client";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Button from "@/app/shared/ui/Button";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/app/shared/lib/animation";
import { useSignIn } from "@/app/shared/hooks/queries/useAuth";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { mutate: login, isPending, error } = useSignIn();

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-sm bg-white rounded-xl shadow-sm p-6"
        initial="hidden"
        animate="visible"
      >
        {/* 타이틀 */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-semibold text-[#1C4E80] text-center mb-2 font-suit leading-relaxed">
            Barogo
          </h1>
          <p className="text-sm text-[#8A8A8A] text-center mb-6 font-suit leading-relaxed">
            혼밥하기 싫다면, 파티원을 구해서 바로고!
          </p>
        </motion.div>

        {/* 로그인 폼 */}
        <motion.form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
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
              <motion.p
                className="text-red-500 text-xs mt-1 font-suit"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {errors.email.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
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
              <motion.p
                className="text-red-500 text-xs mt-1 font-suit"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {errors.password.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                text={isPending ? "로그인 중..." : "로그인"}
                type="submit"
                className="w-full bg-[#1C4E80] text-white font-semibold tracking-tight px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-suit"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                text="카카오로 시작하기"
                type="button"
                icon={<RiKakaoTalkFill />}
                className="w-full bg-[#FEE500] text-[#000000] font-semibold tracking-tight px-6 py-3 rounded-lg hover:bg-[#FFDC00] transition-colors font-suit flex items-center justify-center gap-2"
              />
            </motion.div>
          </motion.div>
        </motion.form>
        {/* 로그인 실패 시 (Error) */}
        {error && (
          <motion.div
            className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            로그인에 실패했습니다. 다시 시도해주세요.
          </motion.div>
        )}

        <motion.div
          className="text-sm text-[#8A8A8A] text-center mt-6 font-suit leading-relaxed"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          아직 계정이 없으신가요?
          <Button
            text="회원가입"
            className="text-[#1C4E80] font-semibold hover:underline ml-1"
            onClick={() => router.push("/register")}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
