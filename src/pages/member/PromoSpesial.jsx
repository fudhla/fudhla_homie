import React from "react";
import { FaGift, FaClock } from "react-icons/fa";

export default function PromoSpesial() {
  const promos = [
    { id: 1, title: "Diskon Laser Glow 30%", desc: "Khusus untuk member tingkat Platinum ke atas.", code: "GLOWPLATINUM", end: "31 Juli 2026", color: "from-blue-600 to-indigo-700" },
    { id: 2, title: "Free Chemical Peel", desc: "Dapatkan gratis 1x treatment setelah 5x kedatangan.", code: "FREEPEEL5X", end: "15 Agustus 2026", color: "from-purple-600 to-pink-600" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans min-h-screen bg-slate-50 text-slate-700">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <FaGift className="text-amber-500" /> Promo Spesial Member
        </h1>
        <p className="text-sm text-slate-500">Penawaran eksklusif perawatan kulit khusus untuk Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promos.map((p) => (
          <div key={p.id} className={`bg-gradient-to-br ${p.color} rounded-3xl p-6 text-white shadow-xl relative overflow-hidden`}>
            <div className="relative z-10 space-y-4">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Kupon Aktif</span>
              <h3 className="text-xl font-black">{p.title}</h3>
              <p className="text-sm text-white/80">{p.desc}</p>
              <div className="pt-4 border-t border-white/20 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-white/60 uppercase font-bold">Kode Promo</p>
                  <span className="font-mono font-bold bg-white text-slate-900 px-3 py-1 rounded-lg text-sm">{p.code}</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/60 uppercase font-bold flex items-center gap-1 justify-end"><FaClock/> Berlaku</p>
                  <span className="text-xs font-bold">{p.end}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}