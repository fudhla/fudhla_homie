import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { 
  FaCalendarAlt, FaClock, FaGem, FaStar, FaCrown, FaConciergeBell, FaCheck, 
  FaArrowLeft, FaSpinner, FaCoins, FaMoneyBillWave, FaCreditCard, FaMobileAlt,
  FaUniversity, FaWallet, FaArrowRight, FaCheckCircle, FaFileInvoiceDollar
} from "react-icons/fa";
import { treatmentsAPI } from "../../services/treatmentsAPI";
import { bookingsAPI } from "../../services/bookingsAPI";
import Loading from "../../components/Loading";

const icons = [FaGem, FaStar, FaCrown, FaConciergeBell];

const paymentMethods = [
  { id: "cash", label: "Tunai", icon: FaMoneyBillWave, desc: "Bayar langsung di klinik" },
  { id: "debit", label: "Kartu Debit", icon: FaCreditCard, desc: "BCA, Mandiri, BNI, BRI" },
  { id: "credit", label: "Kartu Kredit", icon: FaCreditCard, desc: "Visa, Mastercard, JCB" },
  { id: "ewallet", label: "E-Wallet", icon: FaMobileAlt, desc: "GoPay, OVO, Dana, ShopeePay" },
  { id: "transfer", label: "Transfer Bank", icon: FaUniversity, desc: "Manual transfer ke rekening GlowCare" },
];

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
  
  // Payment state
  const [createdBooking, setCreatedBooking] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentSubmitting, setPaymentSubmitting] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [step, setStep] = useState("booking"); // "booking" | "payment" | "done"

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

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split("T")[0]);
  }, [userSession]);

  if (!userSession) return <Navigate to="/login" replace />;

  const formatPrice = (p) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(p);

  const selectedTreatment = treatments.find((t) => t.id === selectedId);

  // === STEP 1: Buat Booking ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTreatment) return;
    setSubmitting(true);
    setError("");

    try {
      const result = await bookingsAPI.create({
        user_id: session.id,
        user_name: session.name,
        user_email: session.email,
        treatment_id: selectedTreatment.id,
        treatment_name: selectedTreatment.name,
        treatment_price: selectedTreatment.price,
        booking_date: date,
        booking_time: time,
        status: "Menunggu Pembayaran",
        payment_method: null,
        payment_status: "Belum Dibayar",
      });
      
      setCreatedBooking(result);
      setStep("payment");
    } catch (err) {
      setError(err.message || "Gagal membuat booking.");
    } finally {
      setSubmitting(false);
    }
  };

  // === STEP 2: Pilih Pembayaran ===
  const handlePaymentConfirm = async () => {
    if (!selectedPayment || !createdBooking) return;
    setPaymentSubmitting(true);
    
    try {
      const bookingId = createdBooking.id || createdBooking[0]?.id;
      
      await bookingsAPI.updatePayment(bookingId, {
        payment_method: selectedPayment,
        payment_status: "Lunas",
        status: "Dikonfirmasi",
      });
      
      setPaymentDone(true);
      setStep("done");
    } catch (err) {
      setError(err.message || "Gagal memproses pembayaran.");
    } finally {
      setPaymentSubmitting(false);
    }
  };

  const resetAll = () => {
    setSelectedId(null);
    setSuccess("");
    setError("");
    setCreatedBooking(null);
    setSelectedPayment(null);
    setPaymentDone(false);
    setStep("booking");
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">

      {/* Header */}
      <div className="flex items-center justify-between">
        {step === "booking" ? (
          <Link to="/member" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
            <FaArrowLeft size={12} /> Kembali ke Dashboard
          </Link>
        ) : (
          <button onClick={resetAll} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer">
            <FaArrowLeft size={12} /> Booking Baru
          </button>
        )}
        <div className="text-right">
          <h1 className="text-2xl font-extrabold text-slate-900">
            {step === "booking" ? "Booking Treatment" : step === "payment" ? "Pilih Pembayaran" : "Booking Berhasil!"}
          </h1>
          <p className="text-sm text-slate-500">
            {step === "booking" ? "Pilih perawatan dan jadwalkan janji temu" : 
             step === "payment" ? "Pilih metode pembayaran untuk konfirmasi booking" :
             "Treatment sudah dijadwalkan"}
          </p>
        </div>
      </div>

      {/* Error Notification */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-rose-600 text-sm text-center">{error}</div>
      )}

      {/* ========================================================================== */}
      {/* STEP 1: PILIH TREATMENT & JADWAL */}
      {/* ========================================================================== */}
      {step === "booking" && (
        <>
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
          {selectedTreatment && (
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="font-extrabold text-slate-900">Konfirmasi Jadwal</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Treatment: <strong className="text-blue-600">{selectedTreatment.name}</strong>
                  <span className="ml-3 text-blue-600">{formatPrice(selectedTreatment.price)}</span>
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
                  <><FaArrowRight /> Lanjutkan ke Pembayaran</>
                )}
              </button>
            </form>
          )}

          {!selectedTreatment && (
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white text-center">
              <FaCalendarAlt className="text-4xl mx-auto mb-3 opacity-60" />
              <h3 className="font-bold text-lg">Pilih Treatment di Atas</h3>
              <p className="text-sm text-blue-200 mt-1">Klik salah satu treatment untuk memulai booking</p>
            </div>
          )}
        </>
      )}

      {/* ========================================================================== */}
      {/* STEP 2: PILIH METODE PEMBAYARAN */}
      {/* ========================================================================== */}
      {step === "payment" && selectedTreatment && (
        <div className="space-y-6">
          {/* Ringkasan Booking */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-extrabold text-slate-900">Ringkasan Booking</h2>
              <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-3 py-1 rounded-full border border-amber-200">
                Menunggu Pembayaran
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-400">Treatment</p>
                <p className="font-bold text-slate-800">{selectedTreatment.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Total Bayar</p>
                <p className="font-black text-lg text-blue-600">{formatPrice(selectedTreatment.price)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Tanggal</p>
                <p className="font-bold text-slate-800">{date}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Jam</p>
                <p className="font-bold text-slate-800">{time}</p>
              </div>
            </div>
          </div>

          {/* Pilihan Pembayaran */}
          <div>
            <h2 className="font-extrabold text-slate-900 mb-4">Pilih Metode Pembayaran</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paymentMethods.map((pm) => {
                const Icon = pm.icon;
                const isSelected = selectedPayment === pm.id;
                return (
                  <button
                    key={pm.id}
                    onClick={() => setSelectedPayment(pm.id)}
                    className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/10"
                        : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-3 ${
                      isSelected ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-600"
                    }`}>
                      <Icon />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{pm.label}</h3>
                    <p className="text-xs text-slate-500 mt-1">{pm.desc}</p>
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-emerald-200 flex items-center gap-1 text-emerald-600 text-xs font-bold">
                        <FaCheck size={10} /> Dipilih
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info tambahan untuk transfer */}
          {selectedPayment === "transfer" && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-sm">
              <p className="font-bold text-blue-700 mb-2">🏦 Data Rekening GlowCare</p>
              <div className="text-blue-600 space-y-1 text-xs">
                <p>Bank BCA: 123-456-7890 a.n. GlowCare Aesthetic Clinic</p>
                <p>Bank Mandiri: 987-654-3210 a.n. GlowCare Aesthetic Clinic</p>
                <p className="mt-2">Konfirmasi pembayaran akan diverifikasi oleh admin.</p>
              </div>
            </div>
          )}

          {/* Tombol Konfirmasi */}
          <button
            onClick={handlePaymentConfirm}
            disabled={!selectedPayment || paymentSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {paymentSubmitting ? (
              <><FaSpinner className="animate-spin" /> Memproses Pembayaran...</>
            ) : (
              <><FaWallet /> Konfirmasi Pembayaran</>
            )}
          </button>
        </div>
      )}

      {/* ========================================================================== */}
      {/* STEP 3: BOOKING & PEMBAYARAN BERHASIL */}
      {/* ========================================================================== */}
      {step === "done" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-emerald-500 text-4xl" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Booking Berhasil! 🎉</h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
            Treatment <strong className="text-blue-600">{selectedTreatment?.name}</strong> telah dijadwalkan
            pada <strong>{date}</strong> pukul <strong>{time}</strong>.
          </p>
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mt-6 inline-block text-left">
            <p className="text-emerald-700 font-bold flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" /> 
              Pembayaran: <span className="uppercase">{paymentMethods.find(p => p.id === selectedPayment)?.label || "-"}</span>
            </p>
            <p className="text-xs text-emerald-600 mt-1">Status: Lunas ✅</p>
          </div>

          <p className="text-xs text-slate-400 mt-4">
            Kamu akan mendapat notifikasi pengingat H-1 sebelum jadwal treatment.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/member/invoice"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <FaFileInvoiceDollar className="inline mr-1" /> Lihat Invoice
            </Link>
            <Link
              to="/member"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Ke Dashboard
            </Link>
            <button
              onClick={resetAll}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
            >
              Booking Lagi
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
