"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { containerVariants, itemVariants } from "@/app/shared/lib/animation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 로고 & 제목 */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-[#1C4E80] to-[#2563eb] rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl"
            whileHover={{
              scale: 1.1,
              rotate: 360,
              transition: { duration: 0.8 },
            }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(28, 78, 128, 0.3)",
                "0 0 40px rgba(28, 78, 128, 0.6)",
                "0 0 20px rgba(28, 78, 128, 0.3)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <span className="text-4xl text-white font-bold">B</span>
          </motion.div>

          <motion.h1
            className="text-5xl font-bold text-[#1C4E80] mb-4"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Barogo
          </motion.h1>

          <motion.p
            className="text-lg text-[#8A8A8A] leading-relaxed"
            variants={itemVariants}
          >
            혼밥하기 싫다면, 파티원을 구해서
            <motion.span
              className="text-[#1C4E80] font-semibold"
              animate={{ color: ["#1C4E80", "#2563eb", "#1C4E80"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {" "}
              바로고!
            </motion.span>
          </motion.p>
        </motion.div>

        {/* 기능 소개 카드들 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-12"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className="text-4xl mb-4">{feature.icon}</motion.div>
              <h3 className="text-lg font-semibold text-[#2B2B2B] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#8A8A8A]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA 버튼들 */}
        <motion.div
          className="space-y-4 w-full max-w-sm"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => router.push("/login")}
            className="w-full bg-gradient-to-r from-[#1C4E80] to-[#2563eb] text-white font-semibold py-4 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ background: { duration: 2 } }}
          >
            바로 시작하기
          </motion.button>

          <motion.button
            onClick={() => router.push("/register")}
            className="w-full border-2 border-[#1C4E80] text-[#1C4E80] font-semibold py-4 rounded-xl"
            whileHover={{
              scale: 1.02,
              backgroundColor: "#1C4E80",
              color: "#ffffff",
            }}
            whileTap={{ scale: 0.98 }}
          >
            회원가입
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

const features = [
  {
    icon: "🍽️",
    title: "맛집 발견",
    description: "주변 숨겨진 맛집을 발견하고 새로운 경험을 해보세요",
  },
  {
    icon: "⚡",
    title: "바로팟",
    description: "실시간으로 함께할 사람을 찾아 즉석 모임을 만들어요",
  },
  {
    icon: "👥",
    title: "새로운 인연",
    description: "비슷한 취향의 사람들과 만나 의미있는 관계를 만들어요",
  },
];
