import { useState } from "react";
import { FaUserCircle, FaTint, FaSearch, FaCircle } from "react-icons/fa";

const patientList = [
  { id: 1, name: "Alya Putri", skin: "Berminyak/Acne", status: "Active Treatment", doctor: "dr. Sarah", lastVisit: "2 Hari lalu" },
  { id: 2, name: "Budi Santoso", skin: "Kering/Aging", status: "Maintenance", doctor: "dr. Reza", lastVisit: "1 Minggu lalu" },
  { id: 3, name: "Indah Permata", skin: "Sensitif", status: "Consultation", doctor: "dr. Sarah", lastVisit: "Baru" },
];

export default function Patients() {
  return (
    /* Container tanpa background sendiri agar mengikuti background parent */
    <div className="p-6 text-[#2D0B1A] font-sans">
      
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#2D0B1A]">Data Pasien Klinis</h1>
          <p className="text-sm text-[#EC4899] font-medium">Monitoring rekam medis dan tipe kulit pasien</p>
        </div>
        
        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EC4899]/40" size={14}/>
          <input 
            type="text" 
            placeholder="Cari nama pasien..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-[#EC4899]/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#EC4899]/20 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Table Container: Background Putih Bersih */}
      <div className="bg-white rounded-3xl border border-[#EC4899]/10 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            {/* Header Tabel dengan warna pink sangat soft */}
            <tr className="bg-[#FDF2F7] text-[11px] uppercase tracking-[0.2em] text-[#EC4899] font-black">
              <th className="px-6 py-5 border-b border-[#EC4899]/5">Pasien</th>
              <th className="px-6 py-5 border-b border-[#EC4899]/5">Kondisi Kulit</th>
              <th className="px-6 py-5 border-b border-[#EC4899]/5">Dokter</th>
              <th className="px-6 py-5 border-b border-[#EC4899]/5">Status</th>
              <th className="px-6 py-5 border-b border-[#EC4899]/5">Kunjungan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EC4899]/5">
            {patientList.map(p => (
              <tr key={p.id} className="hover:bg-[#FDF2F7]/50 transition-colors cursor-pointer group">
                <td className="px-6 py-4 font-bold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FCE7F3] flex items-center justify-center text-[#EC4899] group-hover:bg-[#EC4899] group-hover:text-white transition-all">
                    <FaUserCircle size={20}/> 
                  </div>
                  <span className="text-[14px] text-[#2D0B1A] group-hover:text-[#EC4899] transition-colors">{p.name}</span>
                </td>
                <td className="px-6 py-4 text-sm text-[#4A1229]/70">
                  <span className="flex items-center gap-2">
                    <FaTint className="text-[#FB7185]" size={12}/> {p.skin}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-[#2D0B1A]">{p.doctor}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#FCE7F3] text-[#EC4899] rounded-full text-[10px] font-black uppercase tracking-tighter">
                    <FaCircle size={6} className="animate-pulse"/> {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#4A1229]/40 font-medium">{p.lastVisit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
         <button className="px-4 py-2 bg-white border border-[#EC4899]/10 rounded-lg text-xs font-bold text-[#EC4899] shadow-sm">1</button>
         <button className="px-4 py-2 bg-white border border-[#EC4899]/10 rounded-lg text-xs font-bold text-[#4A1229]/40 hover:bg-[#FDF2F7] shadow-sm">Next</button>
      </div>
    </div>
  );
}