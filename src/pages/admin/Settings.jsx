import React from "react";
import { FaClinicMedical, FaClock, FaPhone, FaMapMarkerAlt, FaSave } from "react-icons/fa";

export default function Settings() {
  return (
    <div className="font-sans max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#343C6A]">Pengaturan Klinik</h1>
        <p className="text-sm text-[#718EBF]">Konfigurasi profil dan operasional klinik</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <FaClinicMedical className="text-blue-600 text-2xl" />
          <div>
            <h2 className="font-bold text-slate-900">GlowCare Aesthetic Clinic</h2>
            <p className="text-xs text-slate-500">Klinik Estetika Premium • Jakarta Selatan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider"><FaMapMarkerAlt className="inline mr-1" /> Alamat</label>
            <p className="text-sm text-slate-800 bg-slate-50 p-3 rounded-xl">Jl. Estetika Raya No. 45, Blok C3, Jakarta Selatan</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider"><FaPhone className="inline mr-1" /> Kontak</label>
            <p className="text-sm text-slate-800 bg-slate-50 p-3 rounded-xl">+62 812-3456-7890 | support@glowcare.com</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider"><FaClock className="inline mr-1" /> Jam Operasional</label>
            <p className="text-sm text-slate-800 bg-slate-50 p-3 rounded-xl">Sen-Sab: 09:00-20:00 | Min: 10:00-16:00</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Tier Poin</label>
            <div className="text-sm text-slate-800 bg-slate-50 p-3 rounded-xl space-y-1">
              <p>Bronze: 0-199 pts</p>
              <p>Silver: 200-499 pts</p>
              <p>Gold: 500+ pts</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all cursor-pointer shadow-md">
            <FaSave size={14} /> Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
}
