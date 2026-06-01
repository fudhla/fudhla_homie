import React from "react";

export default function Avatar({ name }) {
  // Menentukan warna pastel random berdasarkan inisial agar estetik
  const colors = {
    B: "bg-[#E0F2FE] text-[#0369A1]",
    S: "bg-[#DCFCE7] text-[#15803D]",
    A: "bg-[#F3E8FF] text-[#6B21A8]"
  };

  const initial = name.charAt(0).toUpperCase();
  const avatarColor = colors[initial] || "bg-[#F1F5F9] text-[#475569]";

  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ring-4 ring-white shadow-sm ${avatarColor}`}>
      {initial}
    </div>
  );
}