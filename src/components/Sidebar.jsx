import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaThLarge, 
  FaCalendarCheck, 
  FaUserFriends, 
  FaFileMedical, 
  FaBoxOpen, 
  FaSignOutAlt, 
  FaClinicMedical, 
  FaCode,
  FaStar // ← Menambahkan ikon FaStar yang sudah pasti ada di react-icons/fa
} from "react-icons/fa";

const menuItems = [
  { group: "MENU", items: [{ to: "/", label: "Dashboard", icon: FaThLarge, end: true }] },
  { group: "MANAJEMEN", items: [
    { to: "/patients", label: "Pasien", icon: FaUserFriends },
    { to: "/treatments", label: "Treatment", icon: FaCalendarCheck },
    { to: "/customers", label: "Customer", icon: FaClinicMedical },
  ]},
  { group: "KLINIK", items: [
    { to: "/medical-records", label: "Riwayat Medis", icon: FaFileMedical },
    { to: "/inventory", label: "Produk", icon: FaBoxOpen },
  ]},
  { group: "PRAKTIKUM", items: [
    { to: "/components", label: "Components", icon: FaCode },
    // ← Hanya menambahkan baris rute baru ini ke array menuItems milikmu
    { to: "/fitur-xyz", label: "Fitur XYZ", icon: FaStar }, 
  ]},
];

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `relative flex items-center gap-4 py-4 px-8 transition-all duration-300 cursor-pointer border-l-4 
     ${isActive 
        ? "bg-white text-[#1877F2] border-[#1877F2] font-bold" 
        : "text-[#B1B1B1] border-transparent hover:text-[#1877F2]"}`;

  return (
    <div className="w-full h-screen bg-white flex flex-col font-sans border-r border-[#E6EFF5]">
      <div className="px-8 py-10">
        <h1 className="text-2xl font-black text-[#343C6A] tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1877F2] rounded-lg"></div> GlowCare
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((group) => (
          <div key={group.group} className="mb-4">
            <p className="text-[10px] font-bold text-[#B1B1B1] uppercase tracking-[0.2em] px-8 mb-2">
              {group.group}
            </p>
            <div className="flex flex-col">
              {group.items.map(({ to, label, icon: Icon, end }) => (
                <NavLink key={to} to={to} end={end} className={menuClass}>
                  <Icon size={20} />
                  <span className="text-[15px]">{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-[#E6EFF5]">
        <button 
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/login";
          }}
          className="w-full flex items-center gap-4 py-4 px-4 text-[#B1B1B1] hover:text-red-500 transition-colors cursor-pointer"
        >
          <FaSignOutAlt size={20} />
          <span className="font-bold text-[15px]">Logout</span>
        </button>
      </div>
    </div>
  );
}