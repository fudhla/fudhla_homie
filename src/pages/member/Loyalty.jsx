import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { FaCrown, FaCoins, FaGem, FaStar, FaCheckCircle, FaSpinner, FaHistory, FaArrowRight, FaTrophy, FaGift } from "react-icons/fa";
import { usersAPI } from "../../services/usersAPI";

const tierInfo = [
  { name: "Gold", minPoints: 500, icon: FaCrown, color: "from-amber-400 to-yellow-600", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-300", benefits: ["Diskon 20% semua treatment", "Prioritas booking eksklusif", "Free konsultasi bulanan", "Birthday gift spesial", "Free 1x laser/tahun", "Akses event VIP"] },
  { name: "Silver", minPoints: 200, icon: FaStar, color: "from-slate-400 to-slate-600", bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-300", benefits: ["Diskon 10% treatment tertentu", "Free 1x chemical peel/tahun", "Early access promo", "Undangan event eksklusif"] },
  { name: "Bronze", minPoints: 0, icon: FaGem, color: "from-orange-400 to-amber-700", bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-300", benefits: ["Poin loyalitas 50/treatment", "Akses portal member", "Notifikasi promo terbaru", "Konsultasi gratis 30 menit"] },
];

const pointsHistory = [
  { id: 1, date: "12 Juni 2026", desc: "Facial Gold Standard", points: 50, type: "plus" },
  { id: 2, date: "28 Mei 2026", desc: "Konsultasi Awal", points: 25, type: "plus" },
  { id: 3, date: "15 April 2026", desc: "Chemical Peel Medium", points: 50, type: "plus" },
  { id: 4, date: "20 Maret 2026", desc: "Laser Rejuvenation", points: 50, type: "plus" },
  { id: 5, date: "5 Februari 2026", desc: "Acne Treatment", points: 50, type: "plus" },
  { id: 6, date: "10 Januari 2026", desc: "Tukar Poin - Masker Sheet", points: 30, type: "minus" },
];

export default function Loyalty() {
  const stored = localStorage.getItem("userSession");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (!stored) { setLoading(false); return; }
    try {
      const parsed = JSON.parse(stored);
      usersAPI.getUserByEmail(parsed.email).then(data => {
        if (data && data.length > 0) {
          const latest = data[0];
          setSession({ tier: latest.tier || parsed.tier, points: latest.points ?? parsed.points });
          localStorage.setItem("userSession", JSON.stringify({ ...parsed, tier: latest.tier || parsed.tier, points: latest.points ?? parsed.points }));
        } else { setSession(parsed); }
      }).catch(() => { setSession(parsed); }).finally(() => setLoading(false));
    } catch { setLoading(false); }
  }, [stored]);

  if (!stored) return <Navigate to="/login" replace />;
  if (loading) return <div className="flex justify-center py-20"><FaSpinner className="animate-spin text-blue-600 text-3xl" /></div>;
  if (!session) return null;

  const currentPoints = session.points || 0;
  const currentTier = session.tier || "Bronze";
  const nextTier = currentTier === "Bronze" ? tierInfo[1] : currentTier === "Silver" ? tierInfo[0] : null;
  const pointsToNext = nextTier ? nextTier.minPoints - currentPoints : 0;
  const progress = nextTier ? Math.min(100, (currentPoints / nextTier.minPoints) * 100) : 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 font-sans">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2"><FaCrown className="text-amber-500" /> GlowPoints & Program Loyalitas</h1>
        <p className="text-sm text-slate-500">Kumpulkan poin, naikkan tier, nikmati benefit eksklusif</p>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-purple-200 font-bold uppercase tracking-widest">Tier Saat Ini</p>
              <h2 className="text-3xl font-black mt-1 flex items-center gap-3">{currentTier} <FaCrown className="text-amber-300 text-2xl" /></h2>
            </div>
            <button onClick={() => setShowHistory(!showHistory)} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/20 transition-all cursor-pointer border border-white/10 flex items-center gap-1.5">{showHistory ? "Tutup" : <><FaHistory /> Riwayat</>}</button>
          </div>
          <div className="mt-4 flex items-center gap-8">
            <div><p className="text-[10px] text-purple-200 uppercase tracking-wider">GlowPoints</p><p className="text-2xl font-black flex items-center gap-2"><FaCoins className="text-amber-300" /> {currentPoints.toLocaleString()}</p></div>
            {nextTier && <div><p className="text-[10px] text-purple-200 uppercase tracking-wider">Menuju {nextTier.name}</p><p className="text-sm font-bold">Butuh {pointsToNext} poin lagi</p></div>}
          </div>
          {nextTier && (
            <div className="mt-4 w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-700" style={{ width: progress + "%" }} />
            </div>
          )}
        </div>
      </div>

      {showHistory && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50"><h3 className="font-bold text-slate-800 flex items-center gap-2"><FaHistory className="text-blue-500" /> Riwayat Poin</h3></div>
          <div className="p-6 space-y-3">
            {pointsHistory.map(ph => (
              <div key={ph.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={"w-8 h-8 rounded-lg flex items-center justify-center text-xs " + (ph.type === "plus" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600")}>{ph.type === "plus" ? "+" : "-"}</div>
                  <div><p className="font-bold text-slate-800 text-xs">{ph.desc}</p><p className="text-[10px] text-slate-400">{ph.date}</p></div>
                </div>
                <span className={"text-xs font-black " + (ph.type === "plus" ? "text-emerald-600" : "text-rose-600")}>{ph.type === "plus" ? "+" : "-"}{ph.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tierInfo.map((t) => {
          const TierIcon = t.icon;
          const isUnlocked = currentPoints >= t.minPoints || currentTier === t.name;
          return (
            <div key={t.name} className={t.bg + " " + t.border + " border rounded-2xl p-5 " + (isUnlocked ? "opacity-100" : "opacity-60")}>
              <div className="flex items-center justify-between mb-3"><TierIcon className={"text-2xl " + t.text} />{isUnlocked && <FaCheckCircle className="text-emerald-500" />}</div>
              <h3 className={"font-black text-lg " + t.text}>{t.name}</h3>
              <p className="text-xs text-slate-500 mb-3">{t.minPoints > 0 ? t.minPoints + "+ Poin" : "Mulai dari sini"}</p>
              <ul className="space-y-1.5">{t.benefits.map((b, i) => <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5"><FaCheckCircle className="text-emerald-400 mt-0.5 shrink-0" size={10} /> {b}</li>)}</ul>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 text-center">
        <FaGift className="text-4xl text-amber-400 mx-auto mb-3" />
        <h3 className="font-bold text-lg text-amber-800">Ajak Teman Dapatkan Bonus!</h3>
        <p className="text-sm text-amber-600 mt-1">Setiap referral berhasil, kamu dan teman dapat 25 poin + diskon 10%</p>
        <button className="mt-4 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95">Bagikan Kode Referral</button>
      </div>
    </div>
  );
}
