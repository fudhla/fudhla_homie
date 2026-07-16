import React, { useState } from "react";
import { FaUserMd, FaPhone, FaStar, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const staffData = [
  { id: 1, name: "dr. Sarah Wijaya", spesialis: "Dermatologist", phone: "0812-3456-7890", email: "sarah@glowcare.com", rating: 4.9, patients: 342, status: "Available", avatar: "SW", color: "bg-pink-100 text-pink-600" },
  { id: 2, name: "dr. Reza Pratama", spesialis: "Estetika", phone: "0813-4567-8901", email: "reza@glowcare.com", rating: 4.8, patients: 289, status: "Available", avatar: "RP", color: "bg-blue-100 text-blue-600" },
  { id: 3, name: "dr. Maya Anggraini", spesialis: "Anti-Aging", phone: "0814-5678-9012", email: "maya@glowcare.com", rating: 4.7, patients: 198, status: "On Leave", avatar: "MA", color: "bg-purple-100 text-purple-600" },
  { id: 4, name: "dr. Dimas Ardian", spesialis: "Laser Therapy", phone: "0815-6789-0123", email: "dimas@glowcare.com", rating: 4.9, patients: 412, status: "Available", avatar: "DA", color: "bg-emerald-100 text-emerald-600" },
  { id: 5, name: "Ns. Rina Fitriani", spesialis: "Perawat Estetika", phone: "0816-7890-1234", email: "rina@glowcare.com", rating: 4.6, patients: 512, status: "Available", avatar: "RF", color: "bg-amber-100 text-amber-600" },
];

export default function Staff() {
  const [search, setSearch] = useState("");

  const filtered = staffData.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.spesialis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-sans space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#343C6A]">Tim Dokter & Staf</h1>
          <p className="text-sm text-[#718EBF]">Kelola tenaga medis klinik GlowCare</p>
        </div>
        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari staf..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black ${s.color}`}>
                {s.avatar}
              </div>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                s.status === "Available" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-amber-50 text-amber-600 border border-amber-200"
              }`}>
                {s.status === "Available" ? "✦ Available" : "○ On Leave"}
              </span>
            </div>
            <h3 className="font-bold text-slate-900">{s.name}</h3>
            <p className="text-xs text-blue-600 font-semibold">{s.spesialis}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <FaPhone size={10} /> {s.phone}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <FaStar size={12} /> {s.rating}
              </span>
              <span className="text-slate-500">{s.patients} Pasien</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
