"use client";
import React, { ReactNode, useEffect } from "react";
import BottomTabBar from "@/app/features/main/components/Footer";
import { useAuthStore } from "@/app/shared/store/useAuthStore";

export default function AfterLoginLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div>
      <main className="pb-20">{children}</main>
      <BottomTabBar />
      {modal}
    </div>
  );
}
