import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { FaGift, FaClock, FaTag, FaCopy, FaCheckCircle, FaFire, FaPercent, FaStar, FaGem, FaCrown } from "react-icons/fa";

const allPromos = [
  { id: 1, title: "Diskon Laser Glow 30%", desc: "Khusus untuk member Gold & Platinum. Treatment laser brightening untuk kulit cerah merata.", code: "GLOW30", end: "31 Juli 2026", type: "Diskon", minTier: "Gold", color: "from-blue-600 to-indigo-700", badge: "HOT" },
  { id: 2, title: "Free Chemical Peel", desc: "Dapatkan gratis 1x chemical peel setelah 5x treatment facial rutin.", code: "FREEPEEL", end: "15 Agustus 2026", type: "Gratis", minTier: "Silver", color: "from-purple-600 to-pink-600", badge: "POPULER" },
  { id: 3, title: "Paket 3+1 Facial", desc: "Beli 3x facial, gratis 1x facial. Berlaku untuk semua jenis facial.", code: "FACIAL4", end: "30 September 2026", type: "Paket", minTier: "Bronze", color: "from-emerald-500 to-teal-600", badge: "HEMAT" },
  { id: 4, title: "Birthday Bundle Spesial", desc: "Dapatkan treatment gratis + gift set eksklusif di bulan ulang tahunmu!", code: "BDAY2026", end: "31 Desember 2026", type: "Spesial", minTier: "Semua", color: "from-rose-500 to-red-600", badge: "ULTIMATE" },
  { id: 5, title: "Cashback 15% E-Wallet", desc: "Bayar pakai GoPay/OVO/Dana dapat cashback 15% maks. Rp 75.000.", code: "CASHBACK", end: "15 Agustus 2026", type: "Cashback", minTier: "Semua", color: "from-orange-500 to-amber-600", badge: "TERBARU" },
  { id: 6, title: "Referral Bonus 50rb", desc: "Ajak teman daftar & treatment, kamu dapat Rp 50.000 + 25 GlowPoints!", code: "REF50", end: "30 September 2026", type: "Referral", minTier: "Semua", color: "from-sky-500 to-cyan-600", badge: "BONUS" },
];

const tierIconMap = { Gold: FaCrown, Silver: FaStar, Bronze: FaGem, Semua: FaStar };

export default function PromoSpesial() {
  const userSession = localStorage.getItem("userSession");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Semua");
  const [copiedId, setCopiedId] = useState(null);
  if (!userSession) return <Navigate to="/login" replace />;
  const userTier = JSON.parse(userSession).tier || "Bronze";
  const types = ["Semua", "Diskon", "Gratis", "Paket", "Cashback", "Referral", "Spesial"];
  const filtered = allPromos.filter(p => {
    const ms = p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase());
    const mt = filterType === "Semua" || p.type === filterType;
    return ms && mt;
  });
  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code).then(() => { setCopiedId(id); setTimeout(() => setCopiedId(null), 2000); }).catch(() => {});
  };
  const canAccess = (promo) => promo.minTier === "Semua" || promo.minTier === userTier || (userTier === "Gold" && promo.minTier !== "Gold") || (userTier === "Silver" && promo.minTier === "Bronze") || promo.minTier === "Bronze";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3"><FaGift className="text-rose-500" /> Promo & Penawaran Spesial</h1>
        <p className="text-sm text-slate-500 mt-1">Klaim promo eksklusif dan nikmati hemat perawatan kulit</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari promo atau kode..." className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none cursor-pointer">
          {types.map(t => <option key={t} value={t}>{t === "Semua" ? "Semua Kategori" : t}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-16"><FaGift className="text-5xl text-slate-200 mx-auto mb-4" /><p className="text-slate-400">Tidak ada promo ditemukan</p></div>
        ) : filtered.map((p) => {
          const TierIcon = tierIconMap[p.minTier] || FaStar;
          const available = canAccess(p);
          return (
            <div key={p.id} className={"bg-gradient-to-br " + p.color + " rounded-3xl text-white shadow-xl relative overflow-hidden " + (available ? "" : "opacity-60")}>
              {p.badge && <span className="absolute top-4 right-4 bg-white/25 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">{p.badge}</span>}
              <div className="relative z-10 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <FaFire className="text-2xl text-white/70" />
                  <span className="bg-white/20 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{p.type}</span>
                </div>
                <div>
                  <h3 className="text-lg font-black">{p.title}</h3>
                  <p className="text-xs text-white/80 mt-2 leading-relaxed">{p.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white/60">
                  <TierIcon size={10} /> Min. {p.minTier}
                </div>
                <div className="pt-4 border-t border-white/20 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] text-white/60 uppercase font-bold tracking-wider">Kode Promo</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleCopy(p.code, p.id)} disabled={!available} className="font-mono font-black bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs tracking-wider hover:bg-white/30 transition-all cursor-pointer border border-white/10 flex items-center gap-1.5">
                        {copiedId === p.id ? <><FaCheckCircle size={10} /> Tersalin!</> : <><FaCopy size={10} /> {p.code}</>}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-white/60">
                    <span className="flex items-center gap-1"><FaClock size={9} /> Berlaku hingga {p.end}</span>
                    {!available && <span className="bg-white/10 px-2 py-0.5 rounded-full text-white/50">Tier tidak sesuai</span>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
