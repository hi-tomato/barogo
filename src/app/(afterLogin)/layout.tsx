import React, { ReactNode } from "react";
// import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
// import SearchHeader from "./search/page";

export default function AfterLoginLoot({ children }: { children: ReactNode }) {
  return (
    <div>
      <main className="pb-20">{children}</main>
      <Footer />
    </div>
  );
}
