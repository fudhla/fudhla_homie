import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaUserPlus, FaSignInAlt, FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

export default function GuestPage() {
  const navigate = useNavigate();

  // Data Layanan Perawatan Klinik Kecantikan GlowCare
  const treatments = [
    {
      id: 1,
      nama: "Glow Whitening Facial",
      deskripsi: "Perawatan deep cleansing untuk mencerahkan wajah kusam dan menyamarkan noda hitam secara instan.",
      harga: "Rp 250.000",
      durasi: "60 Menit",
    },
    {
      id: 2,
      nama: "Acne Laser Therapy",
      deskripsi: "Teknologi laser mutakhir untuk membunuh bakteri penyebab jerawat dan meredakan kemerahan pada kulit.",
      harga: "Rp 450.000",
      durasi: "45 Menit",
    },
    {
      id: 3,
      nama: "Anti-Aging Botox Treatment",
      deskripsi: "Mengencangkan kerutan halus di area wajah dan mengembalikan elastisitas keremajaan kulit Anda.",
      harga: "Rp 1.200.000",
      durasi: "30 Menit",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 1. NAVBAR GUEST */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-pink-500 to-blue-600 p-2 rounded-xl text-white">
            <FaStar className="text-xl text-amber-200" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 block leading-none tracking-tight">GlowCare</span>
            <span className="text-[10px] text-pink-500 font-bold tracking-widest uppercase">Aesthetic Clinic</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-all cursor-pointer"
          >
            <FaSignInAlt /> Masuk
          </button>
          <button 
            onClick={() => navigate("/register")}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-all cursor-pointer active:scale-95"
          >
            <FaUserPlus /> Daftar Akun
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <span className="bg-pink-500/20 text-pink-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            ✨ Kulit Sehat, Glowing & Percaya Diri
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-6 tracking-tight leading-tight">
            Wujudkan Kulit Impian Anda Bersama <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">GlowCare</span>
          </h1>
          <p className="mt-4 text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Dapatkan konsultasi gratis dengan dokter spesialis kecantikan kami dan nikmati perawatan standar internasional bersertifikasi resmi.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate("/register")}
              className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all cursor-pointer active:scale-95"
            >
              Ambil Promo Member Baru
            </button>
          </div>
        </div>
      </header>

      {/* 3. MENU PERAWATAN POPULER */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Perawatan Unggulan Kami</h2>
          <p className="text-slate-500 text-sm mt-2">Daftar menu treatment paling diminati di GlowCare dengan hasil langsung terlihat.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {treatments.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                  <FaClock /> {t.durasi}
                </span>
                <h3 className="font-bold text-lg text-slate-800 mt-3">{t.nama}</h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">{t.deskripsi}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Mulai Dari</p>
                  <p className="text-base font-black text-blue-600">{t.harga}</p>
                </div>
                <button 
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Pesan Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FOOTER / INFORMASI KLINIK */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-500">
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 text-base">
              <FaMapMarkerAlt className="text-pink-500" /> Lokasi Pusat
            </h4>
            <p className="leading-relaxed text-xs">
              Jl. Estetika Raya No. 45, Blok C3, Jakarta Selatan (Seberang Mall Sinar)
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 text-base">
              <FaClock className="text-blue-500" /> Jam Operasional
            </h4>
            <p className="leading-relaxed text-xs">
              Senin - Sabtu: 09.00 - 20.00 WIB<br />
              Minggu: 10.00 - 16.00 WIB
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 text-base">
              <FaPhoneAlt className="text-emerald-500" /> Hubungi Kami
            </h4>
            <p className="leading-relaxed text-xs">
              WhatsApp: +62 812-3456-7890<br />
              Email: support@glowcare.com
            </p>
          </div>
        </div>
        <div className="text-center mt-12 pt-6 border-t border-slate-100 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} GlowCare Aesthetic Clinic. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}