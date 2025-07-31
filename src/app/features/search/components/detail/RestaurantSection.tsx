'use client';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/app/shared/ui/Button';
import { HiPlus, HiUsers } from 'react-icons/hi';

export default function RestaurantSection() {
  const router = useRouter();
  const params = useParams<{ restaurantId: string }>();
  const restaurantId = params.restaurantId;

  const handleViewBaropots = () => {
    router.push(`/restaurants/${restaurantId}/baropot`);
  };

  const handleCreateBaropot = () => {
    router.push(`/restaurants/${restaurantId}/baropot/create`);
  };

  return (
    <motion.div
      className="bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="px-4 py-6">
        <motion.h3
          className="mb-6 flex items-center text-lg font-bold text-[#2B2B2B]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <HiUsers className="mr-2 text-[#1C4E80]" />
          바로팟
        </motion.h3>

        <div className="space-y-4">
          {/* 바로팟 목록 보기 */}
          <motion.div
            className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="mb-1 font-semibold text-[#1C4E80]">
                  모든 바로팟 보기
                </h4>
                <p className="text-sm text-gray-600">
                  진행 중인 바로팟을 확인해보세요
                </p>
              </div>
              <Button
                text="보기"
                onClick={handleViewBaropots}
                className="rounded-lg bg-[#1C4E80] px-4 py-2 text-white transition-colors hover:bg-[#154066]"
              />
            </div>
          </motion.div>

          {/* 바로팟 만들기 */}

          <motion.div
            className="rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-4"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="mb-1 font-semibold text-orange-700">
                  바로팟 만들기
                </h4>
                <p className="text-sm text-gray-600">
                  새로운 바로팟을 만들어보세요
                </p>
              </div>
              <Button
                text=""
                onClick={handleCreateBaropot}
                icon={<HiPlus size={20} />}
                className="rounded-lg bg-orange-500 p-3 text-white transition-colors hover:bg-orange-600"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
