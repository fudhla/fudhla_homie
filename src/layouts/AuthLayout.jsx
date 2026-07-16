import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full font-sans bg-white overflow-hidden">
      
      {/* SISI KIRI: Info GlowCare */}
      <div className="hidden lg:flex w-[50%] bg-[#003594] relative flex-col justify-center px-20 text-white overflow-hidden">
        
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] border border-white/10 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-[300px] h-[300px] border border-white/20 rounded-full"></div>
        <div className="absolute top-8 left-8 w-3 h-3 bg-white/40 rounded-full"></div>
        <div className="absolute bottom-8 left-8 w-3 h-3 bg-white/40 rounded-full"></div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-5xl font-black mb-4 tracking-tight">GlowCare</h1>
          <p className="text-lg text-blue-100/70 mb-10 max-w-md leading-relaxed">
            Sistem manajemen klinik kecantikan paling populer di Asia Tenggara.
          </p>

          {/* PREVIEW 3 JENIS PENGGUNA */}
          <div className="space-y-3 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
              <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">👤 Pengguna Biasa</p>
              <p className="text-sm text-white/80 mt-0.5">Daftar & booking treatment langsung dari portal pasien</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
              <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">🔒 Administrator</p>
              <p className="text-sm text-white/80 mt-0.5">Kelola data pasien, treatment, & laporan klinik</p>
            </div>
          </div>

          <button 
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-[#0066FF] hover:bg-blue-600 rounded-xl text-sm font-bold shadow-xl transition-all active:scale-95 cursor-pointer"
          >
            Pelajari Lebih Lanjut
          </button>
        </motion.div>
      </div>

      {/* SISI KANAN: Form (Login/Register/Forgot) */}
      <div className="flex-1 flex flex-col justify-center px-10 sm:px-20 lg:px-28 relative bg-white">
        {/* Titik Dekorasi Sisi Kanan */}
        <div className="absolute top-8 right-8 w-3 h-3 border border-blue-900/20 rounded-full"></div>
        <div className="absolute bottom-8 right-8 w-3 h-3 border border-blue-900/20 rounded-full"></div>

        <div className="w-full max-w-md mx-auto">
          <Outlet />
        </div>
      </div>

    </div>
  );
}