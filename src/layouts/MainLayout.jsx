import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { FaChartPie, FaUserInjured, FaConciergeBell, FaUsers, FaSignOutAlt, FaBell, FaUserMd, FaBox, FaFileInvoiceDollar, FaCog, FaCalendarAlt, FaTimes } from "react-icons/fa";
import Loading from "../components/Loading";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [notifList, setNotifList] = useState([]);

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

  // Fetch pending bookings count for notification badge
  useEffect(() => {
    async function fetchPending() {
      try {
        const { bookingsAPI } = await import("../services/bookingsAPI");
        const data = await bookingsAPI.fetchAll();
        const pending = (data || []).filter(b => b.status === "Menunggu Pembayaran" || b.status === "Menunggu");
        setPendingCount(pending.length);
        setNotifList(pending.slice(0, 5));
      } catch {}
    }
    fetchPending();
    const interval = setInterval(fetchPending, 60000);
    return () => clearInterval(interval);
  }, []);

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
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] px-4 mt-2 mb-1">Utama</p>

            <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive("/dashboard") ? "!bg-blue-50 !text-blue-600" : "text-slate-500 hover:!bg-slate-50 hover:!text-slate-900"}`}>
              <FaChartPie className="text-base" />
              <span>Ringkasan Klinik</span>
            </Link>
            
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] px-4 mt-3 mb-1">Manajemen</p>

            <Link to="/patients" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive("/patients") || location.pathname.includes("/patients") ? "!bg-blue-50 !text-blue-600" : "text-slate-500 hover:!bg-slate-50 hover:!text-slate-900"}`}>
              <FaUserInjured className="text-base" />
              <span>Manajemen Pasien</span>
            </Link>
            

            
            <Link to="/treatments" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive("/treatments") ? "!bg-blue-50 !text-blue-600" : "text-slate-500 hover:!bg-slate-50 hover:!text-slate-900"}`}>
              <FaConciergeBell className="text-base" />
              <span>Katalog Perawatan</span>
            </Link>
            
            <Link to="/customers" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive("/customers") ? "!bg-blue-50 !text-blue-600" : "text-slate-500 hover:!bg-slate-50 hover:!text-slate-900"}`}>
              <FaUsers className="text-base" />
              <span>Database Member</span>
            </Link>

            <Link to="/staff" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive("/staff") ? "!bg-blue-50 !text-blue-600" : "text-slate-500 hover:!bg-slate-50 hover:!text-slate-900"}`}>
              <FaUserMd className="text-base" />
              <span>Tim Dokter</span>
            </Link>
            
            <Link to="/inventory" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive("/inventory") ? "!bg-blue-50 !text-blue-600" : "text-slate-500 hover:!bg-slate-50 hover:!text-slate-900"}`}>
              <FaBox className="text-base" />
              <span>Inventaris</span>
            </Link>

            <Link to="/bookings" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive("/bookings") ? "!bg-blue-50 !text-blue-600" : "text-slate-500 hover:!bg-slate-50 hover:!text-slate-900"}`}>
              <FaCalendarAlt className="text-base" />
              <span>Manajemen Booking</span>
              {pendingCount > 0 && (
                <span className="ml-auto bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </Link>
            
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] px-4 mt-3 mb-1">Laporan</p>

            <Link to="/reports" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive("/reports") ? "!bg-blue-50 !text-blue-600" : "text-slate-500 hover:!bg-slate-50 hover:!text-slate-900"}`}>
              <FaFileInvoiceDollar className="text-base" />
              <span>Laporan Keuangan</span>
            </Link>
            
            <Link to="/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive("/settings") ? "!bg-blue-50 !text-blue-600" : "text-slate-500 hover:!bg-slate-50 hover:!text-slate-900"}`}>
              <FaCog className="text-base" />
              <span>Pengaturan</span>
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
        <header className="!bg-white border-b border-slate-200/80 h-16 flex items-center justify-between px-8 sticky top-0 z-40" style={{ backgroundColor: "#ffffff" }}>
          <span className="text-sm text-slate-500 font-medium">
            {location.pathname === "/dashboard" && "Dashboard Overview"}
            {location.pathname === "/patients" && "Manajemen Pasien"}
            {location.pathname === "/patients/add" && "Tambah Pasien Baru"}
            {location.pathname === "/customers" && "Database Member"}
            {location.pathname === "/treatments" && "Katalog Perawatan"}
            {location.pathname === "/staff" && "Tim Dokter & Staf"}
            {location.pathname === "/inventory" && "Inventaris Produk"}
            {location.pathname === "/reports" && "Laporan Keuangan"}
            {location.pathname === "/settings" && "Pengaturan Klinik"}
          </span>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer relative">
                <FaBell size={15} />
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-md">
                    {pendingCount > 9 ? "9+" : pendingCount}
                  </span>
                )}
              </button>

              {/* Dropdown Notifikasi */}
              {showNotif && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotif(false)} />
                  <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 z-20 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-700">Notifikasi</p>
                      <button onClick={() => setShowNotif(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><FaTimes size={12} /></button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifList.length === 0 ? (
                        <div className="text-center py-8 text-slate-400 text-xs">Tidak ada notifikasi</div>
                      ) : notifList.map((n, i) => (
                        <div key={i} className="px-4 py-3 border-b border-slate-50 hover:bg-blue-50 transition-colors">
                          <p className="text-xs font-bold text-slate-700">{n.user_name || "Pasien"}</p>
                          <p className="text-[10px] text-slate-500">{n.treatment_name || "Treatment"}</p>
                          <p className="text-[9px] text-amber-600 font-bold">{n.status}</p>
                        </div>
                      ))}
                    </div>
                    <Link to="/bookings" className="block px-4 py-3 text-center text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors" onClick={() => setShowNotif(false)}>
                      Lihat Semua Booking
                    </Link>
                  </div>
                </>
              )}
            </div>
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold !text-slate-700 uppercase tracking-wider !bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              Online
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