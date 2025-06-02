import React, { ReactNode } from "react";
import FloatingEmojis from "./_components/FloatingEmojis";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#d3dbe2]">
      <FloatingEmojis />
      {children}
    </div>
  );
}
