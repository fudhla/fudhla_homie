import { NavLink } from "react-router-dom";
import {
  FaThLarge,
  FaCalendarCheck,
  FaUserFriends,
  FaFileMedical,
  FaSyringe,
  FaBoxOpen,
  FaCog,
  FaSignOutAlt,
  FaClinicMedical,
} from "react-icons/fa";

// ─── Data Klinik Glow Care ─────────────────────────────────

const menuItems = [
  {
    group: "Utama",
    items: [
      { to: "/", label: "Dashboard", icon: FaThLarge, end: true },
    ],
  },
  {
    group: "Manajemen",
    items: [
      { to: "/patients", label: "Pasien", icon: FaUserFriends },
      { to: "/treatments", label: "Treatment", icon: FaCalendarCheck },
      { to: "/customers", label: "Customer", icon: FaClinicMedical },
    ],
  },
  {
    group: "Klinik",
    items: [
      { to: "/medical-records", label: "Riwayat Treatment", icon: FaFileMedical },
      { to: "/skincare", label: "Skincare", icon: FaSyringe },
      { to: "/inventory", label: "Produk", icon: FaBoxOpen },
    ],
  },
];

const todayAppointments = [
  { emoji: "✨", name: "Alya Putri", time: "09:30", status: "Sekarang", treat: "Facial" },
  { emoji: "💆", name: "Rina Aprilia", time: "10:45", status: "Berikutnya", treat: "Acne" },
  { emoji: "🌸", name: "Citra Ayu", time: "13:00", status: "Menunggu", treat: "Laser" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Sidebar() {
  // bg-[#4A1229] = Pink Rose Gelap (saat aktif)
  // before:bg-[#EC4899] = Aksen Pink Terang
  const menuClass = ({ isActive }) =>
    `relative flex items-center gap-4 py-3.5 pr-4 mr-6 transition-all duration-300 cursor-pointer rounded-r-3xl pl-8 
     ${
       isActive
         ? "bg-[#4A1229] text-white font-medium before:absolute before:left-0 before:top-0 before:h-full before:w-[6px] before:bg-[#EC4899] before:rounded-r-md shadow-lg shadow-black/10"
         : "text-[#E9D5DA]/60 hover:bg-white/5 hover:text-white"
     }`;

  const iconClass = (isActive) =>
    `text-[1.15rem] flex-shrink-0 transition-colors ${
      isActive ? "text-[#EC4899]" : "text-[#E9D5DA]/40"
    }`;

  return (
    // bg-[#2D0B1A] = Background Deep Berry
    <div className="w-full h-screen bg-[#2D0B1A] flex flex-col font-sans overflow-hidden border-r border-white/5">
      
      {/* ── Logo ── */}
      <div className="pl-8 pt-10 pb-8">
        <h1 className="text-3xl font-black text-white tracking-tighter">
          glowcare<span className="text-[#EC4899]">.</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none">
        
        {/* ── User Profile (Box Merah Berry) ── */}
        <div className="mx-6 mb-8 bg-[#4A1229]/50 rounded-2xl p-3 border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#2D0B1A] flex items-center justify-center text-xl flex-shrink-0 shadow-inner border border-white/5">
            👩‍⚕️
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-white truncate">dr. Fudhla Aulia</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] animate-pulse"></span>
              <p className="text-[10px] font-medium text-[#E9D5DA]/60 uppercase">On Duty</p>
            </div>
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="space-y-6">
          {menuItems.map((group) => (
            <div key={group.group}>
              <p className="text-[10px] font-bold text-[#E9D5DA]/30 uppercase tracking-widest pl-8 mb-2">
                {group.group}
              </p>
              <ul className="space-y-1">
                {group.items.map(({ to, label, icon: Icon, end }) => (
                  <li key={to}>
                    <NavLink to={to} end={end} className={menuClass}>
                      {({ isActive }) => (
                        <>
                          <Icon className={iconClass(isActive)} />
                          <span className="text-[14px] truncate">{label}</span>
                          
                          {/* Badge khusus Pasien */}
                          {label === "Pasien" && (
                            <span className={`ml-auto text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isActive ? "bg-[#EC4899] text-white" : "bg-white/10 text-[#E9D5DA]/60"}`}>
                              1.2k
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* ── Jadwal Pasien Hari Ini ── */}
        <div className="mt-8 mb-6">
          <p className="text-[10px] font-bold text-[#E9D5DA]/30 uppercase tracking-widest pl-8 mb-3">
            Antrean Treatment
          </p>
          <div className="px-6 space-y-2">
            {todayAppointments.map((apt, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 hover:bg-[#4A1229] transition-all p-2.5 rounded-xl cursor-pointer border border-white/5 group">
                <div className="w-8 h-8 rounded-lg bg-[#2D0B1A] flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#EC4899]/20 transition-colors">
                  {apt.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-white truncate">{apt.name}</p>
                  <p className="text-[9px] text-[#E9D5DA]/60">{apt.treat} • {apt.time}</p>
                </div>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                  apt.status === "Sekarang" ? "bg-[#EC4899]/20 text-[#EC4899]" : "bg-white/5 text-[#E9D5DA]/40"
                }`}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="pt-2 pb-8 space-y-1">
        <NavLink to="/settings" className={menuClass}>
          {({ isActive }) => (
            <>
              <FaCog className={iconClass(isActive)} />
              <span className="text-[14px]">Settings</span>
            </>
          )}
        </NavLink>

        <button className="group w-full flex items-center gap-4 py-3.5 pr-4 mr-6 transition-all duration-300 rounded-r-3xl pl-8 text-[#E9D5DA]/40 hover:bg-rose-500/10 hover:text-rose-400">
          <FaSignOutAlt className="text-[1.15rem] flex-shrink-0 group-hover:text-rose-400" />
          <span className="font-medium text-[14px]">Logout</span>
        </button>
      </div>

    </div>
  );
}