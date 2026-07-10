import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaGem, FaStar, FaCrown, FaConciergeBell, FaCheck, FaArrowLeft, FaSpinner, FaCoins, FaChevronRight } from "react-icons/fa";
import { treatmentsAPI } from "../../services/treatmentsAPI";
import { bookingsAPI } from "../../services/bookingsAPI";
import Loading from "../../components/Loading";

const icons = [FaGem, FaStar, FaCrown, FaConciergeBell];

export default function BookingTreatment() {
  const userSession = localStorage.getItem("userSession");
  const [session, setSession] = useState(null);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userSession) return;
    setSession(JSON.parse(userSession));

    async function fetchTreatments() {
      try {
        const data = await treatmentsAPI.fetchAll();
        if (data && data.length > 0) {
          setTreatments(data.map((t, i) => ({ ...t, icon: icons[i % icons.length] })));
        } else {
          setTreatments([
            { id: 1, name: "Facial Deep Cleansing", description: "Pembersihan wajah intensif.", price: 150000, duration: 45, icon: FaGem },
            { id: 2, name: "Laser Brightening", description: "Teknologi laser mencerahkan kulit.", price: 500000, duration: 60, icon: FaStar },
            { id: 3, name: "Anti-Aging Silk Peel", description: "Pengencangan kulit awet muda.", price: 750000, duration: 90, icon: FaCrown },
          ]);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTreatments();

    // Set default date = tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split("T")[0]);
  }, [userSession]);

  if (!userSession) return <Navigate to="/login" replace />;

  const formatPrice = (p) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(p);

  const selectedTreatment = treatments.find((t) => t.id === selectedId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTreatment) return;
    setSubmitting(true);
    setError("");

    try {
      await bookingsAPI.create({
        user_id: session.id,
        treatment_id: selectedTreatment.id,
        treatment_name: selectedTreatment.name,
        booking_date: date,
        booking_time: time,
        status: "Menunggu",
      });
      setSuccess(`✅ Booking ${selectedTreatment.name} berhasil dibuat untuk ${date}!`);
      setSelectedId(null);
    } catch (err) {
      setError(err.message || "Gagal membuat booking.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">

      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/member"
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <FaArrowLeft size={12} /> Kembali ke Dashboard
        </Link>
        <div className="text-right">
          <h1 className="text-2xl font-extrabold text-slate-900">Booking Treatment</h1>
          <p className="text-sm text-slate-500">Pilih perawatan dan jadwalkan janji temu</p>
        </div>
      </div>

      {/* Success / Error */}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-700 font-bold text-center flex items-center justify-center gap-2">
          <FaCheck className="text-emerald-500" /> {success}
        </div>
      )}
      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-rose-600 text-sm text-center">{error}</div>
      )}

      {/* Daftar Treatment */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {treatments.map((t) => {
          const isSelected = selectedId === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => { setSelectedId(t.id); setSuccess(""); setError(""); }}
              className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-3 ${
                isSelected ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
              }`}>
                <Icon />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{t.name}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{t.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-base font-black text-blue-600">{formatPrice(t.price)}</span>
                <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded-md flex items-center gap-1">
                  <FaClock size={9} /> {t.duration}m
                </span>
              </div>
              {isSelected && (
                <div className="mt-3 pt-3 border-t border-blue-200 flex items-center gap-1 text-blue-600 text-xs font-bold">
                  <FaCheck size={10} /> Dipilih
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Form Booking (muncul kalau sudah pilih treatment) */}
      {selectedTreatment && !success && (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-extrabold text-slate-900">Konfirmasi Jadwal</h2>
            <p className="text-xs text-slate-500 mt-1">
              Treatment: <strong className="text-blue-600">{selectedTreatment.name}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                <FaCalendarAlt className="inline mr-1" size={10} /> Tanggal Booking
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                <FaClock className="inline mr-1" size={10} /> Jam Kedatangan
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Info Poin */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
            <FaCoins className="text-amber-500 text-xl" />
            <div>
              <p className="text-xs font-bold text-amber-700">Dapatkan 50 GlowPoints!</p>
              <p className="text-[10px] text-amber-600">Setiap treatment selesai, kamu dapat poin loyalitas.</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {submitting ? (
              <><FaSpinner className="animate-spin" /> Memproses...</>
            ) : (
              <><FaCheck /> Konfirmasi Booking</>
            )}
          </button>
        </form>
      )}

      {/* Tips */}
      {!selectedTreatment && (
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white text-center">
          <FaCalendarAlt className="text-4xl mx-auto mb-3 opacity-60" />
          <h3 className="font-bold text-lg">Pilih Treatment di Atas</h3>
          <p className="text-sm text-blue-200 mt-1">Klik salah satu treatment untuk memulai booking</p>
        </div>
      )}
    </div>
  );
}
