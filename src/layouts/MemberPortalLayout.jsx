import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";import { FaCrown, FaSignOutAlt, FaHome, FaCalendarAlt, FaGift, 
  FaFileMedical, FaUserCircle, FaStar, FaFileInvoiceDollar
} from "react-icons/fa";

const navLinks = [
  { to: "/member", label: "Dashboard", icon: FaHome },
  { to: "/member/booking", label: "Booking Treatment", icon: FaCalendarAlt },
  { to: "/member/history", label: "Riwayat Klinis", icon: FaFileMedical },
  { to: "/member/invoice", label: "Invoice", icon: FaFileInvoiceDollar },
  { to: "/member/promo", label: "Promo Spesial", icon: FaGift },
  { to: "/member/loyalty", label: "GlowPoints & Tier", icon: FaStar },
  { to: "/member/profile", label: "Profil Saya", icon: FaUserCircle },
];

export default function MemberPortalLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50 font-sans text-slate-700">
      {/* Top Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-[999] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-pink-500 to-blue-600 p-2 rounded-lg shadow-lg shadow-pink-500/20">
                <FaCrown className="text-lg text-amber-200" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-800 block leading-tight">GlowCare</span>
                <span className="text-[10px] text-pink-500 font-bold tracking-widest uppercase">Member Portal</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive(link.to)
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/20"
                      : "text-slate-500 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                >
                  <link.icon size={14} />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Toggle - simple */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                to="/member"
                className="p-2 text-slate-500 hover:text-pink-600"
              >
                <FaHome size={18} />
              </Link>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer bg-slate-50 hover:bg-rose-50 rounded-xl"
            >
              <FaSignOutAlt size={14} />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-[999] px-2 py-1">
        <div className="flex justify-around">
          {navLinks.slice(0, 5).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center py-2 px-2 rounded-lg text-[10px] font-bold transition-all ${
                isActive(link.to)
                  ? "text-pink-600"
                  : "text-slate-400"
              }`}
            >
              <link.icon size={16} />
              <span className="mt-0.5">{link.label.split(" ")[0]}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="relative z-10 pb-20 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
}
