'use client';

interface ActivityItem {
  id: string;
  icon: string;
  iconBgColor: string;
  iconTextColor: string;
  title: string;
  time: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <h3 className="mb-3 font-semibold text-[#2B2B2B]">최근 활동</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${activity.iconBgColor}`}
            >
              <span className={`text-sm ${activity.iconTextColor}`}>
                {activity.icon}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#2B2B2B]">{activity.title}</p>
              <p className="text-xs text-[#8A8A8A]">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
