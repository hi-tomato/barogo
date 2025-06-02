import React, { ReactNode } from "react";
import Footer from "@/app/components/layout/Footer";

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
      <Footer />
      {modal}
    </div>
  );
}
