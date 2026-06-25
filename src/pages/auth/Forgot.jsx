import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { usersAPI } from "../../services/usersAPI"; // 👈 Menghubungkan ke API Supabase

export default function Forgot() { // 👈 Menggunakan nama komponen 'Forgot' agar sinkron dengan nama file
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("Alamat email wajib diisi."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Format email tidak valid."); return; }

    setLoading(true);

    try {
      // 1. Cek secara riil apakah email ini terdaftar di tabel users Supabase kamu
      const userExist = await usersAPI.getUserByEmail(email);
      
      if (userExist.length === 0) {
        throw new Error("Alamat email tidak ditemukan dalam sistem database.");
      }

      // 2. Simulasi jeda animasi pengiriman instruksi
      await new Promise((r) => setTimeout(r, 1200));
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Gagal memproses permintaan reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Lupa Password? 🔐</h2>
        <p className="text-gray-400 font-medium">
          Masukkan email terdaftar untuk menerima instruksi reset.
        </p>
      </div>

      {error && (
        <div className="mb-5 bg-red-50 border border-red-100 text-red-500 text-xs px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {success ? (
        <div className="mb-6 bg-blue-50 border border-blue-100 px-5 py-8 rounded-2xl text-center shadow-sm">
          <p className="font-bold text-[#0066FF] mb-2 text-lg">Cek Email Anda! 💌</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Link reset telah dikirim ke <strong className="text-gray-800">{email}</strong>.
          </p>
          <button onClick={() => setSuccess(false)} className="mt-4 text-xs font-bold text-[#0066FF] hover:underline">
            Coba email lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center pl-4 pointer-events-none">
              <FaEnvelope className="text-gray-300 text-sm" />
            </div>
            <input
              type="email"
              value={email}
              disabled={loading} // 👈 Mengunci input saat loading proses cek API
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-gray-300 text-gray-700 disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={loading} // 👈 Mencegah klik ganda saat proses berjalan
            className="w-full bg-[#0066FF] text-white py-4 rounded-full font-bold shadow-xl shadow-blue-500/20 hover:bg-[#0052cc] active:scale-95 transition-all duration-300 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Mengirim..." : "Kirim Instruksi Reset"}
          </button>
        </form>
      )}

      <div className="mt-10 text-center">
        <Link to="/login" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-[#0066FF] font-bold transition-colors">
          <FaArrowLeft /> Kembali ke Login
        </Link>
      </div>
    </div>
  );
}