import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <div className="bg-[#d3dbe2]">{children}</div>;
}
