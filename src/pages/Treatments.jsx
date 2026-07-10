import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaGem, FaStar, FaCrown, FaConciergeBell, FaTimes, FaCheck, FaUser, FaEnvelope } from "react-icons/fa";
import Card from "../components/Card";
import { treatmentsAPI } from "../services/treatmentsAPI";
import { bookingsAPI } from "../services/bookingsAPI";
import { usersAPI } from "../services/usersAPI";
import Loading from "../components/Loading";

const treatmentIcons = [FaGem, FaStar, FaCrown, FaConciergeBell];

export default function Treatments() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", date: "", time: "" });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await treatmentsAPI.fetchAll();
        if (data && data.length > 0) {
          setTreatments(
            data.map((t, i) => ({ ...t, icon: treatmentIcons[i % treatmentIcons.length] }))
          );
        } else {
          setTreatments([
            { id: 1, name: "Facial Deep Cleansing", description: "Pembersihan wajah intensif untuk kulit bersih dan segar.", price: 150000, duration: 45, icon: FaGem },
            { id: 2, name: "Laser Brightening", description: "Teknologi laser untuk mencerahkan kulit dan menyamarkan noda.", price: 500000, duration: 60, icon: FaStar },
            { id: 3, name: "Anti-Aging Silk Peel", description: "Perawatan pengencangan kulit untuk tampilan awet muda.", price: 750000, duration: 90, icon: FaCrown },
          ]);
        }
      } catch (err) {
        console.error("Gagal fetch treatments:", err.message);
        setError("Gagal memuat data treatment dari server.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const openBooking = (treatment) => {
    setSelectedTreatment(treatment);
    
    // Baca user session untuk isi otomatis nama & email
    const session = localStorage.getItem("userSession");
    if (session) {
      try {
        const user = JSON.parse(session);
        setBookingForm({
          name: user.name || "",
          email: user.email || "",
          date: new Date().toISOString().split("T")[0],
          time: "10:00",
        });
      } catch {
        setBookingForm({ name: "", email: "", date: "", time: "10:00" });
      }
    } else {
      setBookingForm({ name: "", email: "", date: "", time: "10:00" });
    }
    
    setBookingSuccess("");
    setBookingError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTreatment(null);
    setBookingSuccess("");
    setBookingError("");
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTreatment) return;
    
    setBookingLoading(true);
    setBookingError("");
    
    try {
      // Cari atau buat user berdasarkan email
      let userId = null;
      const existingUsers = await usersAPI.getUserByEmail(bookingForm.email);
      
      if (existingUsers && existingUsers.length > 0) {
        userId = existingUsers[0].id;
      } else {
        // Buat user baru jika belum ada
        const newUser = await usersAPI.registerUser({
          name: bookingForm.name,
          email: bookingForm.email,
          password: "password123",
          role: "member",
          tier: "Bronze",
          points: 0,
        });
        userId = newUser.id || newUser[0]?.id;
      }

      // Buat booking
      await bookingsAPI.create({
        user_id: userId,
        treatment_id: selectedTreatment.id,
        treatment_name: selectedTreatment.name,
        booking_date: bookingForm.date,
        booking_time: bookingForm.time,
        status: "Menunggu",
      });

      setBookingSuccess(`✅ Booking ${selectedTreatment.name} berhasil dibuat untuk ${bookingForm.name}!`);
      
      // Reset form
      setTimeout(() => {
        closeModal();
      }, 3000);
    } catch (err) {
      setBookingError(err.message || "Gagal membuat booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
  };

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  if (loading) return <Loading />;

  return (
    <div className="font-sans space-y-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#343C6A]">Katalog Perawatan</h1>
          <p className="text-sm text-[#718EBF]">Klik "Pesan Sekarang" untuk booking treatment pasien</p>
        </div>
        <Card className="px-6 py-3 rounded-2xl flex items-center gap-3 text-[#343C6A] font-bold">
          <FaCalendarAlt className="text-[#1877F2]" /> {today}
        </Card>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-700 text-sm font-medium">{error}</div>
      )}

      {/* TREATMENT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments.map((t) => (
          <div key={t.id} className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="p-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 text-2xl mb-4 group-hover:scale-110 transition-transform">
                <t.icon />
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                <FaClock /> {t.duration} Menit
              </span>
              <h3 className="font-bold text-lg text-slate-800 mt-3 group-hover:text-blue-600 transition-colors">{t.name}</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">{t.description}</p>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Mulai Dari</p>
                  <p className="text-lg font-black text-blue-600">{formatPrice(t.price)}</p>
                </div>
                <button 
                  onClick={() => openBooking(t)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition-all shadow-sm cursor-pointer active:scale-95"
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Jadwal placeholder */}
      <div>
        <h2 className="text-xl font-bold text-[#343C6A] mb-6">Jadwal Hari Ini</h2>
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-10 text-center">
          <FaConciergeBell className="text-4xl text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-400 font-medium">
            Booking yang sudah dibuat akan muncul di sini.
          </p>
        </div>
      </div>

      {/* ===== MODAL BOOKING ===== */}
      {showModal && selectedTreatment && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal}></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95">
            
            {/* Close button */}
            <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all cursor-pointer">
              <FaTimes size={14} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 text-xl mb-3">
                {selectedTreatment.icon ? <selectedTreatment.icon /> : <FaConciergeBell />}
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Booking Treatment</h2>
              <p className="text-sm text-blue-600 font-bold mt-1">{selectedTreatment.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">{formatPrice(selectedTreatment.price)} • {selectedTreatment.duration} Menit</p>
            </div>

            {/* Success message */}
            {bookingSuccess && (
              <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm font-bold text-center">
                {bookingSuccess}
              </div>
            )}

            {/* Error message */}
            {bookingError && (
              <div className="mb-4 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-sm font-medium">
                {bookingError}
              </div>
            )}

            {/* Form */}
            {!bookingSuccess && (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                    <FaUser className="inline mr-1" size={10} /> Nama Pasien
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    placeholder="Nama lengkap pasien"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                    <FaEnvelope className="inline mr-1" size={10} /> Email Pasien
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                    placeholder="email@contoh.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                      <FaCalendarAlt className="inline mr-1" size={10} /> Tanggal
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                      <FaClock className="inline mr-1" size={10} /> Jam
                    </label>
                    <input
                      type="time"
                      required
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {bookingLoading ? (
                    <><FaClock className="animate-spin" /> Memproses...</>
                  ) : (
                    <><FaCheck /> Konfirmasi Booking</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}