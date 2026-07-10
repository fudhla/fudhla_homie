import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaGem, FaStar, FaCrown, FaConciergeBell } from "react-icons/fa";
import Card from "../components/Card";
import { treatmentsAPI } from "../services/treatmentsAPI";
import Loading from "../components/Loading";

const treatmentIcons = [FaGem, FaStar, FaCrown, FaConciergeBell];

export default function Treatments() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
  };

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  if (loading) return <Loading />;

  return (
    <div className="font-sans space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#343C6A]">Katalog Perawatan</h1>
          <p className="text-sm text-[#718EBF]">Daftar layanan treatment GlowCare</p>
        </div>
        <Card className="px-6 py-3 rounded-2xl flex items-center gap-3 text-[#343C6A] font-bold">
          <FaCalendarAlt className="text-[#1877F2]" /> {today}
        </Card>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-700 text-sm font-medium">{error}</div>
      )}

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
                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg border border-emerald-200">Tersedia</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-[#343C6A] mb-6">Jadwal Hari Ini</h2>
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-10 text-center">
          <FaConciergeBell className="text-4xl text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-400 font-medium">
            Jadwal booking akan muncul setelah SQL Migration dijalankan.
          </p>
        </div>
      </div>
    </div>
  );
}