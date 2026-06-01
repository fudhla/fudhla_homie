import React from "react";

export default function Badge({ children, type = "primary" }) {
  const types = {
    primary: "bg-[#E0F2FE] text-[#0369A1]",
    secondary: "bg-[#F1F5F9] text-[#475569]",
    success: "bg-[#DCFCE7] text-[#15803D]",
    danger: "bg-[#FEE2E2] text-[#B91C1C]",
    warning: "bg-[#FEF3C7] text-[#B45309]",
  };
  
  return (
    <span className={`${types[type]} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}>
      {children}
    </span>
  );
}