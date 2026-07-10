import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { FaChartPie, FaUserInjured, FaConciergeBell, FaUsers, FaSignOutAlt } from "react-icons/fa";
import Loading from "../components/Loading";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Cek session di localStorage
    const stored = localStorage.getItem("userSession");
    if (!stored) {
      navigate("/login", { replace: true });
      return;
    }
    try {
      const user = JSON.parse(stored);
      if (user.role !== "admin") {
        navigate("/member", { replace: true });
        return;
      }
    } catch {
      navigate("/login", { replace: true });
      return;
    }
    setChecking(false);
  }, [navigate]);

  if (checking) return <Loading />;

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    // Mengunci container utama agar selalu terang bersih bebas dari paksaan dark-mode browser
    <div className="flex min-h-screen !bg-[#F4F7FA] font-sans !text-slate-700" style={{ backgroundColor: "#F4F7FA" }}>
      
      {/* 1. SIDEBAR UTAMA */}
      <aside className="w-64 !bg-white !text-slate-700 flex flex-col justify-between p-6 border-r border-slate-200 sticky top-0 h-screen shadow-sm" style={{ backgroundColor: "#ffffff" }}>
        <div className="space-y-8">
          
          {/* Brand Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="bg-blue-600 p-2 rounded-xl text-white font-black text-lg shadow-md shadow-blue-500/20">
              GC
            </div>
            <div>
              <h1 className="font-extrabold !text-slate-900 text-base tracking-wide leading-none">GlowCare</h1>
              <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1 block">Internal Admin</span>
            </div>
          </div>

          {/* Navigasi Menu */}
          <nav className="flex flex-col gap-1.5">
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive("/dashboard") 
                  ? "!bg-blue-50 !text-blue-600" 
                  : "text-slate-500 hover:!bg-slate-50 hover:!text-slate-900"
              }`}
            >
              <FaChartPie className="text-base" />
              <span>Ringkasan Klinik</span>
            </Link>
            
            <Link 
              to="/patients" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive("/patients") || location.pathname.includes("/patients")
                  ? "!bg-blue-50 !text-blue-600" 
                  : "text-slate-500 hover:!bg-slate-50 hover:!text-slate-900"
              }`}
            >
              <FaUserInjured className="text-base" />
              <span>Manajemen Pasien</span>
            </Link>
            
            <Link 
              to="/treatments" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive("/treatments") 
                  ? "!bg-blue-50 !text-blue-600" 
                  : "text-slate-500 hover:!bg-slate-50 hover:!text-slate-900"
              }`}
            >
              <FaConciergeBell className="text-base" />
              <span>Katalog Perawatan</span>
            </Link>
            
            <Link 
              to="/customers" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive("/customers") 
                  ? "!bg-blue-50 !text-blue-600" 
                  : "text-slate-500 hover:!bg-slate-50 hover:!text-slate-900"
              }`}
            >
              <FaUsers className="text-base" />
              <span>Daftar Pelanggan</span>
            </Link>
          </nav>
        </div>

        {/* Tombol Keluar Sistem */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl !bg-slate-50 hover:!bg-rose-50 text-rose-600 hover:!text-rose-700 text-sm font-bold transition-all cursor-pointer border border-slate-200/60 shadow-sm"
        >
          <FaSignOutAlt />
          <span>Keluar Sistem</span>
        </button>
      </aside>

      {/* 2. AREA KONTEN HALAMAN ADMIN */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Top Navbar */}
        <header className="!bg-white border-b border-slate-200/80 h-16 flex items-center justify-end px-8 sticky top-0 z-40" style={{ backgroundColor: "#ffffff" }}>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold !text-slate-700 uppercase tracking-wider !bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              Admin
            </span>
          </div>
        </header>

        {/* Area Render Konten Utama */}
        <main className="p-8 flex-1 !bg-[#F4F7FA]" style={{ backgroundColor: "#F4F7FA" }}>
          <Outlet />
        </main>
      </div>

    </div>
  );
}