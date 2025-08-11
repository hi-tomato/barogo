'use client';
import { useRouter } from 'next/navigation';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  path: string;
}

interface MenuGridProps {
  menuItems: MenuItem[];
}

export default function MenuGrid({ menuItems }: MenuGridProps) {
  const router = useRouter();

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleMenuClick(item.path)}
          className="rounded-xl bg-white p-6 text-center shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <div className="mb-3 text-3xl">{item.icon}</div>
          <div className="font-medium text-[#2B2B2B]">{item.title}</div>
        </button>
      ))}
    </div>
  );
}
