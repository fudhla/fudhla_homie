import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaUser, FaNotesMedical } from "react-icons/fa";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skin_type: "Normal",
    medical_notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Kirim data ke Supabase via usersAPI dengan default CRM
      await usersAPI.registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.phone,
        role: "member",
        tier: "Bronze",
        points: 0,
      });

      alert("Pasien baru berhasil didaftarkan!");
      navigate("/patients"); 
    } catch (error) {
      console.error("Gagal menambah pasien:", error.message);
      alert("Gagal menambah pasien: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans text-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/patients")}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs cursor-pointer"
        >
          <FaArrowLeft size={12} /> Kembali
        </button>
        <h1 className="text-xl font-black text-slate-900">Tambah Pasien Baru</h1>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        
        {/* Nama Pasien */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <FaUser className="text-slate-400" size={12} /> Nama Lengkap Pasien
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-600 outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Email & No Telepon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Email Aktif
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh@gmail.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-600 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              No. WhatsApp / Telepon
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="08xxxxxxxxxx"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-600 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Tipe Kulit Pasien */}
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
                className={`p-3 rounded-xl border text-center font-bold text-xs transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  formData.skin_type === opt.label
                    ? "border-blue-600 bg-blue-50 text-blue-600 shadow-2xs"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="text-lg">{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Catatan Medis */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <FaNotesMedical className="text-slate-400" size={12} /> Catatan Keluhan Awal
          </label>
          <textarea
            name="medical_notes"
            rows="4"
            value={formData.medical_notes}
            onChange={handleChange}
            placeholder="Tulis keluhan kulit pasien di sini..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 resize-none"
          ></textarea>
        </div>

        {/* Tombol Simpan */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer"
          >
            <FaCheck size={12} /> {loading ? "Menyimpan..." : "Simpan Data Pasien"}
          </button>
        </div>

      </form>
    </div>
  );
}