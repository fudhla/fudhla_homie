import "./assets/tailwind.css"; 
import React from "react";
import { Routes, Route, Navigate, Link, useNavigate, Outlet } from "react-router-dom"; 
import { FaCrown, FaSignOutAlt } from "react-icons/fa";

// ==========================================
// 1. IMPORT LAYOUTS (STATIC IMPORT)
// ==========================================
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// ==========================================
// 2. IMPORT PAGES: AUTH & GUEST
// ==========================================
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register"; 
import Forgot from "./pages/auth/Forgot"; 
import GuestPage from "./pages/guest/GuestPage";

// ==========================================
// 3. IMPORT PAGES: ADMIN & UTILITY
// ==========================================
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";     
import AddPatient from "./pages/AddPatient";   
import Treatments from "./pages/Treatments";
import Customers from "./pages/Customers";
import FiturXYZ from "./pages/FiturXYZ";      
import Components from "./pages/Components";    
import ErrorPage from "./pages/ErrorPage";     
import NotFound from "./pages/NotFound";      

// ==========================================
// 4. IMPORT PAGES: MEMBER PORTAL
// ==========================================
import MemberList from "./pages/member/MemberList";
import PromoSpesial from "./pages/member/PromoSpesial";  
import RiwayatKlinis from "./pages/member/RiwayatKlinis"; 
import BookingTreatment from "./pages/member/BookingTreatment";

// 👑 NAVBAR LAYOUT KHUSUS MEMBER PORTAL (TERPISAH DARI MAINLAYOUT ADMIN)
function MemberPortalLayout() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700">
      {/* Navbar Atas Khusus Portal Member */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-[999] shadow-xs relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo Brand */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <FaCrown className="text-xl text-amber-300" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-800 block leading-tight">GlowCare</span>
                <span className="text-xs text-blue-600 font-medium tracking-wider uppercase">Portal Member</span>
              </div>
            </div>
            
            {/* Navigasi Tautan Link SPA Aktif */}
            <div className="hidden md:flex items-center gap-6 text-sm font-bold">
              <Link to="/member" className="text-slate-600 hover:text-blue-600 py-5 transition-colors cursor-pointer block">
                Dashboard
              </Link>
              <Link to="/member/booking" className="text-slate-600 hover:text-blue-600 py-5 transition-colors cursor-pointer block">
                Booking Treatment
              </Link>
              <Link to="/member/promo" className="text-slate-600 hover:text-blue-600 py-5 transition-colors cursor-pointer block">
                Promo Spesial
              </Link>
              <Link to="/member/history" className="text-slate-600 hover:text-blue-600 py-5 transition-colors cursor-pointer block">
                Riwayat Klinis
              </Link>
            </div>

            {/* Tombol Logout */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-500 hover:text-rose-600 transition-colors text-sm font-bold cursor-pointer"
            >
              <FaSignOutAlt /> <span>Keluar</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Konten Halaman Member */}
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      
      {/* HALAMAN UTAMA / GUEST */}
      <Route path="/" element={<GuestPage />} />
     
      {/* GRUP AUTENTIKASI */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/forgot" element={<Forgot />} /> 
      </Route>

      {/* 👑 PORTAL MEMBER (MENGGUNAKAN NESTED ROUTING LAYOUT SENDIRI) */}
      <Route path="/member" element={<MemberPortalLayout />}>
        <Route index element={<MemberList />} />
        <Route path="booking" element={<BookingTreatment />} />
        <Route path="promo" element={<PromoSpesial />} />       
        <Route path="history" element={<RiwayatKlinis />} />    
      </Route>

      {/* 💻 PANEL UTAMA INTERNAL ADMIN (MENGGUNAKAN MAINLAYOUT) */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/add" element={<AddPatient />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/fitur-xyz" element={<FiturXYZ />} />
        <Route path="/sandbox-components" element={<Components />} />
      </Route>

      {/* HALAMAN UTILITY ERROR */}
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />

    </Routes>
  );
}

export default App;