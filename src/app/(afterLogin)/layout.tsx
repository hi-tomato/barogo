import React, { ReactNode } from "react";
import BottomTabBar from "@/app/features/main/components/Footer";

export default function AfterLoginLoot({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div>
      <main className="pb-20">{children}</main>
      <BottomTabBar />
      {modal}
    </div>
  );
}
