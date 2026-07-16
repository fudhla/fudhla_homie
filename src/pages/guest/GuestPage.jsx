import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  FaStar, FaUserPlus, FaSignInAlt, FaMapMarkerAlt, FaPhoneAlt, FaClock,
  FaUserMd, FaMicrochip, FaShieldAlt, FaCrown, FaGem, FaArrowRight
} from "react-icons/fa";

export default function GuestPage() {
  const navigate = useNavigate();

  // 🔐 CEK LANGSUNG dari localStorage, tanpa nunggu state
  // supaya redirect langsung terjadi, tidak ada flash guest content
  const stored = localStorage.getItem("userSession");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.role === "member") return <Navigate to="/member" replace />;
      if (parsed.role === "admin") return <Navigate to="/dashboard" replace />;
    } catch {
      // ignore parse error, lanjut sebagai guest
    }
  }

  // Data Layanan Perawatan — sesuai PRD Tahap 1
  const treatments = [
    {
      id: 1,
      nama: "Facial Deep Cleansing",
      deskripsi: "Perawatan pembersihan wajah intensif untuk mengangkat komedo, minyak berlebih, dan sel kulit mati.",
      harga: "Rp 150.000",
      durasi: "45 Menit",
      icon: FaGem,
    },
    {
      id: 2,
      nama: "Laser Brightening & Flek Therapy",
      deskripsi: "Teknologi laser mutakhir untuk mencerahkan kulit, menyamarkan noda hitam dan bekas jerawat.",
      harga: "Rp 500.000",
      durasi: "60 Menit",
      icon: FaStar,
    },
    {
      id: 3,
      nama: "Anti-Aging & Silk Peel Extraction",
      deskripsi: "Perawatan pengencangan kulit dengan ekstraksi silk peel untuk mengurangi kerutan dan garis halus.",
      harga: "Rp 750.000",
      durasi: "90 Menit",
      icon: FaCrown,
    },
  ];

  const valueProps = [
    {
      icon: FaUserMd,
      title: "Dermatolog Berpengalaman",
      desc: "Penanganan langsung oleh tim dokter ahli bersertifikasi di bidang estetika.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaMicrochip,
      title: "Teknologi Laser v4",
      desc: "Menggunakan perangkat treatment klinis mutakhir dengan hasil maksimal & minim efek samping.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FaShieldAlt,
      title: "Sertifikasi Aman & BPOM",
      desc: "Seluruh serum, krim, dan produk perawatan teruji klinis dan resmi BPOM.",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  // ──────────────────────────────────────────────
  // RENDER BAGIAN GUEST (PUBLIK)
  // ──────────────────────────────────────────────
  return (
      <div className="min-h-screen bg-white font-sans text-slate-800">
        {/* 1. NAVIGATION BAR */}
        <nav className="bg-white/90 backdrop-blur-lg border-b border-slate-100 sticky top-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-pink-500 to-blue-600 p-2 rounded-xl text-white shadow-lg shadow-pink-500/20">
                <FaStar className="text-xl text-amber-200" />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 block leading-none tracking-tight">GlowCare</span>
                <span className="text-[10px] text-pink-500 font-bold tracking-widest uppercase">Aesthetic Clinic</span>
              </div>
            </div>

            {/* Navigasi Teks Menu — PRD Tahap 1 */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#beranda" className="text-sm font-bold text-blue-600 border-b-2 border-blue-600 pb-1">Beranda</a>
              <a href="#perawatan" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">Menu Perawatan</a>
              <a href="#keunggulan" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">Keunggulan</a>
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
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:opacity-90 transition-all cursor-pointer active:scale-95"
              >
                <FaUserPlus /> Daftar Akun
              </button>
            </div>
          </div>
        </nav>

        {/* 2. HERO SECTION — PRD Tahap 1 */}
        <section id="beranda" className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-28 px-6 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"></div>

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <span className="inline-block bg-pink-500/20 text-pink-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
              ✨ Klinik Estetika Premium No. 1
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
              Pancarkan Pesona Alami{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
                Kulit Sehatmu
              </span>{" "}
              Bersama GlowCare
            </h1>
            <p className="mt-6 text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Perawatan estetika eksklusif yang ditangani oleh tim dokter spesialis berpengalaman
              dan didukung teknologi laser modern untuk hasil kulit sehat bercahaya.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl shadow-xl shadow-pink-500/30 hover:shadow-pink-500/40 hover:scale-105 transition-all cursor-pointer active:scale-95 text-base"
              >
                Konsultasi Sekarang <FaArrowRight className="inline ml-2" size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* 3. VALUE PROPOSITION — PRD Tahap 1 */}
        <section id="keunggulan" className="py-24 px-6 bg-slate-50/80">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em]">Mengapa GlowCare?</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Keunggulan Klinik Kami
              </h2>
              <p className="text-slate-500 text-sm mt-3">
                Kami berkomitmen memberikan pelayanan terbaik dengan standar internasional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {valueProps.map((vp, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-3xl border border-slate-200/60 p-8 hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${vp.color} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <vp.icon />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mt-6">{vp.title}</h3>
                  <p className="text-slate-500 text-sm mt-3 leading-relaxed">{vp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. KATALOG PERAWATAN UNGGULAN — PRD Tahap 1 */}
        <section id="perawatan" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-pink-500 text-xs font-bold uppercase tracking-[0.2em]">Treatment Populer</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Katalog Perawatan Unggulan
              </h2>
              <p className="text-slate-500 text-sm mt-3">
                Daftar menu treatment paling diminati dengan hasil langsung terlihat.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {treatments.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  <div className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 text-2xl mb-5 group-hover:scale-110 transition-transform">
                      <t.icon />
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                      <FaClock /> {t.durasi}
                    </span>
                    <h3 className="font-bold text-lg text-slate-800 mt-4 group-hover:text-blue-600 transition-colors">
                      {t.nama}
                    </h3>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed">{t.deskripsi}</p>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">Mulai Dari</p>
                        <p className="text-lg font-black text-blue-600">{t.harga}</p>
                      </div>
                      <button
                        onClick={() => navigate("/register")}
                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
                      >
                        Pesan Slot
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FOOTER */}
        <footer className="bg-slate-900 text-slate-400 py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-pink-500 to-blue-600 p-2 rounded-xl text-white shadow-lg">
                  <FaStar className="text-lg text-amber-200" />
                </div>
                <div>
                  <span className="text-lg font-black text-white block leading-none">GlowCare</span>
                  <span className="text-[9px] text-pink-400 font-bold tracking-widest uppercase">Aesthetic Clinic</span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                Klinik estetika premium dengan standar internasional. Percayakan perawatan kulit Anda pada ahlinya.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-4">Lokasi Pusat</h4>
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-pink-400 mt-1 flex-shrink-0" />
                <p className="text-xs leading-relaxed text-slate-500">
                  Jl. Estetika Raya No. 45, Blok C3<br />
                  Jakarta Selatan
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-4">Jam Operasional</h4>
              <div className="flex items-start gap-2">
                <FaClock className="text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-xs leading-relaxed text-slate-500">
                  Senin - Sabtu: 09.00 - 20.00 WIB<br />
                  Minggu: 10.00 - 16.00 WIB
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-4">Hubungi Kami</h4>
              <div className="flex items-start gap-2">
                <FaPhoneAlt className="text-emerald-400 mt-1 flex-shrink-0" />
                <p className="text-xs leading-relaxed text-slate-500">
                  WhatsApp: +62 812-3456-7890<br />
                  Email: support@glowcare.com
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-600">
            &copy; {new Date().getFullYear()} GlowCare Aesthetic Clinic. All Rights Reserved.
          </div>
        </footer>
      </div>
    );
}