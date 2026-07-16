import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaUser, FaNotesMedical, FaEnvelope, FaPhone, FaSpinner, FaTimes } from "react-icons/fa";
import { usersAPI } from "../services/usersAPI";

const skinTypeOptions = [
  { emoji: "💧", label: "Kering" },
  { emoji: "✨", label: "Berminyak" },
  { emoji: "⚖️", label: "Kombinasi" },
  { emoji: "🌸", label: "Sensitif" },
  { emoji: "✅", label: "Normal" }
];

export default function AddPatient() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skin_type: "Normal",
    medical_notes: ""
  });

  // Auto-hide success/error after 5 seconds
  useEffect(() => {
    if (success || error) {
      const t = setTimeout(() => { setSuccess(""); setError(""); }, 5000);
      return () => clearTimeout(t);
    }
  }, [success, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Cek apakah email sudah terdaftar
      const existing = await usersAPI.getUserByEmail(formData.email);
      if (existing && existing.length > 0) {
        throw new Error("Email sudah terdaftar. Gunakan email lain.");
      }

      // Kirim data ke Supabase via usersAPI
      await usersAPI.registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.phone,
        role: "member",
        tier: "Bronze",
        points: 0,
        phone: formData.phone,
        skin_type: formData.skin_type,
        medical_notes: formData.medical_notes,
      });

      setSuccess(`✅ Pasien ${formData.name} berhasil didaftarkan!`);
      
      // Redirect setelah 1.5 detik
      setTimeout(() => navigate("/patients"), 1500);
    } catch (err) {
      setError(err.message || "Gagal menambah pasien.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/patients")}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm cursor-pointer"
        >
          <FaArrowLeft size={12} /> Kembali
        </button>
        <h1 className="text-xl font-black text-slate-900">Tambah Pasien Baru</h1>
      </div>

      {/* Success Notification */}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <span className="text-emerald-700 font-bold text-sm flex items-center gap-2"><FaCheck className="text-emerald-500" /> {success}</span>
          <button onClick={() => setSuccess("")} className="text-emerald-400 hover:text-emerald-600 cursor-pointer"><FaTimes size={14} /></button>
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <span className="text-rose-600 font-bold text-sm">{error}</span>
          <button onClick={() => setError("")} className="text-rose-400 hover:text-rose-600 cursor-pointer"><FaTimes size={14} /></button>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
        
        {/* Nama Pasien */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <FaUser className="text-blue-400" size={12} /> Nama Lengkap Pasien
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap..."
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Email & No Telepon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <FaEnvelope className="text-blue-400" size={12} /> Email Aktif
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh@gmail.com"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <FaPhone className="text-blue-400" size={12} /> No. WhatsApp
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="08xxxxxxxxxx"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Tipe Kulit */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Jenis / Tipe Kondisi Kulit
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {skinTypeOptions.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, skin_type: opt.label }))}
                className={`p-3 rounded-xl border-2 text-center font-bold text-xs transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  formData.skin_type === opt.label
                    ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                <span className="text-xl">{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Catatan Medis */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <FaNotesMedical className="text-blue-400" size={12} /> Catatan Keluhan Awal
          </label>
          <textarea
            name="medical_notes"
            rows="4"
            value={formData.medical_notes}
            onChange={handleChange}
            placeholder="Tulis keluhan kulit atau catatan awal pasien di sini..."
            className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 resize-none"
          ></textarea>
        </div>

        {/* Tombol Simpan */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] text-slate-400">* Data akan tersimpan di database GlowCare</p>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 cursor-pointer active:scale-[0.98]"
          >
            {loading ? <><FaSpinner className="animate-spin" /> Menyimpan...</> : <><FaCheck size={12} /> Simpan Data Pasien</>}
          </button>
        </div>

      </form>
    </div>
  );
}