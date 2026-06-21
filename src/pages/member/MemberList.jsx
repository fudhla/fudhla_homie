import React, { useState, useEffect, useRef } from "react"; // Menambahkan useEffect dan useRef di sini
import { FaCrown, FaSearch, FaSignOutAlt, FaNotesMedical, FaUserCheck } from "react-icons/fa";
import MemberCard from "./MemberCard";

export default function MemberList() {
  const [members] = useState([
    { id: "MB-001", nama: "Andi Wijaya", tipe: "Platinum", status: "Aktif", totalTransaksi: "Rp 2.500.000" },
    { id: "MB-002", nama: "Siti Rahma", tipe: "Gold", status: "Aktif", totalTransaksi: "Rp 1.200.000" },
    { id: "MB-003", nama: "Budi Santoso", tipe: "Silver", status: "Non-Aktif", totalTransaksi: "Rp 450.000" },
  ]);

  // Deklarasi useRef untuk menargetkan input pencarian
  const inputRef = useRef(null);

  // Deklarasi useEffect untuk memicu auto-focus saat halaman dimuat
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 1. Navbar Atas Khusus Portal Member */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <FaCrown className="text-xl text-amber-300" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-800 block leading-tight">GlowCare</span>
                <span className="text-xs text-blue-600 font-medium tracking-wider uppercase">Portal Member</span>
              </div>
            </div>
            
            {/* Navigasi Menu Atas Alternatif */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#dashboard" className="text-blue-600 border-b-2 border-blue-600 py-5">Dashboard</a>
              <a href="#promo" className="hover:text-blue-600 py-5 transition-colors">Promo Spesial</a>
              <a href="#riwayat" className="hover:text-blue-600 py-5 transition-colors">Riwayat Klinis</a>
            </div>

            <button className="flex items-center gap-2 text-slate-500 hover:text-rose-600 transition-colors text-sm font-medium cursor-pointer">
              <FaSignOutAlt /> <span>Keluar</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Konten Utama Dashboard (Membungkus Penuh di Tengah Layar) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Banner Selamat Datang */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <span className="bg-blue-500/30 text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Selamat Datang Kembali
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-3">Halo, Pengguna setia GlowCare!</h1>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Pantau poin loyalitas, tingkat keanggotaan medis, dan dapatkan penawaran perawatan kulit eksklusif langsung dari dasbor pribadi Anda.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 top-0 opacity-10 hidden md:flex items-center pr-8">
            <FaCrown className="text-[12rem]" />
          </div>
        </div>

        {/* Memanggil Komponen Kartu Statistik */}
        <MemberCard total={members.length} />

        {/* Area List Data Anggota */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FaUserCheck className="text-blue-600" />
              <h2 className="font-bold text-slate-800">Daftar Akun Terhubung</h2>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center gap-2 max-w-xs w-full shadow-2xs">
              <FaSearch className="text-slate-400 text-xs" />
              <input 
                ref={inputRef} // Menyematkan properti ref di sini tanpa mengubah class styling
                type="text" 
                placeholder="Cari ID Keanggotaan..." 
                className="bg-transparent text-xs text-slate-700 outline-hidden w-full placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 text-xs uppercase tracking-wider">
                  <th className="p-4">ID Anggota</th>
                  <th className="p-4">Nama Pasien</th>
                  <th className="p-4">Tingkatan Benefit</th>
                  <th className="p-4">Akumulasi Transaksi</th>
                  <th className="p-4">Status Layanan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 font-mono text-xs font-bold text-blue-600">{m.id}</td>
                    <td className="p-4 font-semibold text-slate-800">{m.nama}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        m.tipe === "Platinum" ? "bg-purple-50 text-purple-600 border border-purple-200" :
                        m.tipe === "Gold" ? "bg-amber-50 text-amber-600 border border-amber-200" : "bg-slate-100 text-slate-600"
                      }`}>
                        {m.tipe}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{m.totalTransaksi}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        m.status === "Aktif" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${m.status === "Aktif" ? "bg-emerald-500" : "bg-rose-500"}`} />
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}