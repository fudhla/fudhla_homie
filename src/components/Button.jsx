import React from "react";

export default function Button({ children, type = "primary" }) {
  const types = {
    primary: "bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0369A1]",
    secondary: "bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569]",
    success: "bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#15803D]",
    danger: "bg-[#FEE2E2] hover:bg-[#FECACA] text-[#B91C1C]",
    warning: "bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#B45309]",
  };

  return (
    <button className={`${types[type]} px-5 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm shadow-sm active:scale-95`}>
      {children}
    </button>
  );
}