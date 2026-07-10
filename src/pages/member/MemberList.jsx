import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { 
  FaUserCircle, FaTrophy, FaCoins, FaCalendarAlt, FaClock, FaGift,
  FaFileMedical, FaStar, FaArrowRight, FaGem, FaMapMarkerAlt,
  FaPhoneAlt, FaCalendarCheck, FaSpinner, FaCheckCircle
} from "react-icons/fa";
import { bookingsAPI } from "../../services/bookingsAPI";
import Loading from "../../components/Loading";

const tierConfig = {
  Gold:    { color: "from-amber-400 to-yellow-600", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-300", icon: FaTrophy },
  Silver:  { color: "from-slate-400 to-slate-600",  bg: "bg-slate-50",  text: "text-slate-600", border: "border-slate-300", icon: FaStar },
  Bronze:  { color: "from-orange-400 to-amber-700", bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-300", icon: FaGem },
};

export default function MemberList() {
  const userSession = localStorage.getItem("userSession");
  const [session, setSession] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userSession) return;

    const parsed = JSON.parse(userSession);
    setSession(parsed);

    async function fetchMyBookings() {
      try {
        const data = await bookingsAPI.getByUserId(parsed.id);
        setBookings(data || []);
      } catch (err) {
        console.error("Gagal memuat booking:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMyBookings();
  }, [userSession]);

  if (!userSession) {
    return <Navigate to="/login" replace />;
  }

  const tierKey = session?.tier === "Gold" ? "Gold" : session?.tier === "Silver" ? "Silver" : "Bronze";
  const tier = tierConfig[tierKey];
  const TierIcon = tier.icon;

  const upcomingBookings = bookings.filter(b => b.status === "Menunggu" || b.status === "Dikonfirmasi" || b.status === "On Progress");
  const historyBookings = bookings.filter(b => b.status === "Selesai" || b.status === "Dibatalkan");

  const totalVisits = historyBookings.filter(b => b.status === "Selesai").length;
  const pointsToNext =
    tierKey === "Bronze" ? 200 - (session?.points || 0) :
    tierKey === "Silver" ? 500 - (session?.points || 0) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">

      {/* 1. HERO PROFILE MEMBER */}
      <div className="bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl border border-white/10 shrink-0">
            <FaUserCircle />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-extrabold">
                Halo, {session?.name || "Pasien GlowCare"}! 👋
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${tier.bg} ${tier.text} border ${tier.border}`}>
                <TierIcon size={12} /> {tierKey}
              </span>
            </div>
            <p className="text-slate-300 text-sm mt-1">{session?.email}</p>
            <p className="text-xs text-slate-500 mt-1">
              Bergabung sejak{" "}
              {session?.created_at
                ? new Date(session.created_at).toLocaleDateString("id-ID", {
                    year: "numeric", month: "long", day: "numeric",
                  })
                : "-"}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10 text-center min-w-[120px]">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">GlowPoints</p>
              <p className="text-2xl font-black mt-1 flex items-center justify-center gap-1.5">
                <FaCoins className="text-amber-400" size={18} />
                {(session?.points || 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10 text-center min-w-[120px]">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Kunjungan</p>
              <p className="text-2xl font-black mt-1 flex items-center justify-center gap-1.5">
                <FaCalendarCheck className="text-blue-400" size={16} />
                {totalVisits}x
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-5 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-80 font-medium">GlowPoints Aktif</p>
              <h3 className="text-2xl font-bold mt-1">{(session?.points || 0).toLocaleString()} Pts</h3>
            </div>
            <FaCoins className="text-3xl opacity-30" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-5 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-80 font-medium">Status Keanggotaan</p>
              <h3 className="text-2xl font-bold mt-1">{tierKey}</h3>
            </div>
            <TierIcon className="text-3xl opacity-30" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-5 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-80 font-medium">Booking Aktif</p>
              <h3 className="text-2xl font-bold mt-1">{upcomingBookings.length}</h3>
            </div>
            <FaCalendarAlt className="text-3xl opacity-30" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-5 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-80 font-medium">Treatment Selesai</p>
              <h3 className="text-2xl font-bold mt-1">{totalVisits}</h3>
            </div>
            <FaCheckCircle className="text-3xl opacity-30" />
          </div>
        </div>
      </div>

      {/* 3. PROGRESS MENUJU TIER */}
      {tierKey !== "Gold" && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FaTrophy className="text-amber-500" />
              <span className="font-bold text-slate-800 text-sm">
                {tierKey === "Bronze" ? "Progress menuju Silver" : "Progress menuju Gold"}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-500">
              {session?.points || 0} / {tierKey === "Bronze" ? "200" : "500"} Pts
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, ((session?.points || 0) / (tierKey === "Bronze" ? 200 : 500)) * 100)}%`,
              }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Butuh <strong className="text-amber-600">{Math.max(0, pointsToNext)} poin</strong> lagi untuk naik ke tier berikutnya
          </p>
        </div>
      )}

      {/* 4. UPCOMING BOOKINGS */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-600" />
            <h2 className="font-bold text-slate-800">Booking Mendatang</h2>
          </div>
          <Link
            to="/member/booking"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
          >
            Pesan Treatment <FaArrowRight size={10} />
          </Link>
        </div>

        <div className="p-6">
          {loading ? (
            <Loading />
          ) : upcomingBookings.length > 0 ? (
            <div className="space-y-3">
              {upcomingBookings.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm ${
                      b.status === "Menunggu" ? "bg-amber-500" :
                      b.status === "Dikonfirmasi" ? "bg-blue-500" :
                      "bg-purple-500"
                    }`}>
                      {b.status === "Menunggu" ? <FaClock /> :
                       b.status === "Dikonfirmasi" ? <FaCheckCircle /> :
                       <FaSpinner />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{b.treatment_name || b.service || "Treatment"}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <FaCalendarAlt size={10} /> {b.booking_date ? new Date(b.booking_date).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "-"}
                        {b.booking_time && <><FaClock size={10} /> {b.booking_time}</>}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    b.status === "Menunggu" ? "bg-amber-50 text-amber-600 border border-amber-200" :
                    b.status === "Dikonfirmasi" ? "bg-blue-50 text-blue-600 border border-blue-200" :
                    "bg-purple-50 text-purple-600 border border-purple-200"
                  }`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FaCalendarAlt className="text-4xl text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Belum ada booking aktif</p>
              <Link
                to="/member/booking"
                className="inline-block mt-3 px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all"
              >
                Booking Treatment Sekarang
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 5. RIWAYAT TREATMENT */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaFileMedical className="text-emerald-600" />
            <h2 className="font-bold text-slate-800">Riwayat Treatment</h2>
          </div>
          <Link
            to="/member/history"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
          >
            Lihat Semua <FaArrowRight size={10} />
          </Link>
        </div>

        <div className="p-6">
          {loading ? (
            <Loading />
          ) : historyBookings.length > 0 ? (
            <div className="space-y-3">
              {historyBookings.slice(0, 5).map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm ${
                      b.status === "Selesai" ? "bg-emerald-500" : "bg-slate-400"
                    }`}>
                      {b.status === "Selesai" ? <FaCheckCircle /> : <FaClock />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{b.treatment_name || b.service || "Treatment"}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {b.booking_date ? new Date(b.booking_date).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }) : "-"}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    b.status === "Selesai" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
                    "bg-slate-50 text-slate-500 border border-slate-200"
                  }`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FaFileMedical className="text-4xl text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Belum ada riwayat treatment</p>
            </div>
          )}
        </div>
      </div>

      {/* 6. QUICK LINKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/member/promo"
          className="group bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl p-6 text-white shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <div>
              <FaGift className="text-3xl mb-3 opacity-80" />
              <h3 className="font-extrabold text-lg">Promo Spesial</h3>
              <p className="text-sm text-white/70">Lihat penawaran eksklusif untuk Anda</p>
            </div>
            <FaArrowRight className="text-2xl opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
          </div>
        </Link>

        <Link
          to="/member/history"
          className="group bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <div>
              <FaFileMedical className="text-3xl mb-3 opacity-80" />
              <h3 className="font-extrabold text-lg">Rekam Medis</h3>
              <p className="text-sm text-white/70">Catatan perawatan & diagnosis dokter</p>
            </div>
            <FaArrowRight className="text-2xl opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
          </div>
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-slate-200">
        <div className="flex items-center justify-center gap-4 text-xs text-slate-400 mb-2">
          <span className="flex items-center gap-1"><FaMapMarkerAlt /> Jakarta Selatan</span>
          <span className="flex items-center gap-1"><FaPhoneAlt /> +62 812-3456-7890</span>
        </div>
        <p className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()} GlowCare Aesthetic Clinic. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

