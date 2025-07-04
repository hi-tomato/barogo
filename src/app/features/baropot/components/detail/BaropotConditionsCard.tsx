import { BaropotDetailResponse } from "@/app/shared/types/baropots";
import { motion } from "framer-motion";
import { HiUsers } from "react-icons/hi";
import { Card } from "@/app/shared/ui";

interface BaropotConditionsCardProps {
  baropot: BaropotDetailResponse;
}

export default function BaropotConditionsCard({
  baropot,
}: BaropotConditionsCardProps) {
  const conditions = [
    { label: "연령대", value: baropot.participantAgeGroup, icon: "👥" },
    {
      label: "참가 성별",
      value: baropot.participantGender,
      icon: "⚖️",
    },
    { label: "결제 방식", value: baropot.paymentMethod, icon: "💳" },
  ];

  return (
    <Card
      variant="gradient"
      size="lg"
      padding="lg"
      className="mt-6"
      animate={true}
    >
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-r from-[#EC4899] to-[#F97316] rounded-2xl flex items-center justify-center shadow-lg">
          <HiUsers className="text-white" size={24} />
        </div>
        <h3 className="font-bold text-[#2B2B2B] text-2xl">참가 조건</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {conditions.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-between p-6 bg-gradient-to-r from-[#E6EEF5] to-[#EEF2FF] rounded-2xl border border-white/50 hover:shadow-md transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-[#8A8A8A] font-semibold">{item.label}</span>
            </div>
            <span className="font-bold text-[#2B2B2B] text-lg">
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
