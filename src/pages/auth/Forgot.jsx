import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Alamat email wajib diisi.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Format email tidak valid.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="font-sans">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">Lupa Password? 🔐</h2>
        <p className="text-sm text-[#E9D5DA]/60 leading-relaxed">
          Jangan khawatir! Masukkan email yang terdaftar, dan kami akan mengirimkan instruksi untuk mengatur ulang password Anda.
        </p>
      </div>

      {/* Pesan Error */}
      {error && (
        <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl shadow-lg">
          {error}
        </div>
      )}

      {/* Pesan Sukses: Menggunakan aksen Pink [#EC4899] */}
      {success ? (
        <div className="mb-6 bg-[#EC4899]/10 border border-[#EC4899]/20 px-5 py-6 rounded-2xl text-center shadow-xl">
          <p className="font-bold text-[#EC4899] mb-2 text-lg">Cek Email Anda! 💌</p>
          <p className="text-sm text-[#E9D5DA]/60 leading-relaxed">
            Link untuk mereset password telah dikirim ke <strong className="text-white">{email}</strong>. Silakan periksa kotak masuk atau folder spam Anda.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Input Email: Background [#4A1229] */}
          <div>
            <label className="text-xs font-bold text-[#E9D5DA]/40 uppercase tracking-wider mb-2 block">
              Alamat Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E9D5DA]/20 text-sm" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="beauty@glowcare.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/5 bg-[#4A1229] text-white placeholder-[#E9D5DA]/20 text-sm focus:outline-none focus:border-[#EC4899] focus:ring-1 focus:ring-[#EC4899] transition-all"
              />
            </div>
          </div>

          {/* Submit Button: Background [#EC4899] */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-4 rounded-xl bg-[#EC4899] hover:bg-[#D13D81] active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-[#EC4899]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Mengirim Link...
              </>
            ) : (
              "Kirim Link Reset 📨"
            )}
          </button>
        </form>
      )}

      {/* Back to Login: Hover text-[#EC4899] */}
      <div className="mt-8 text-center">
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-xs text-[#E9D5DA]/40 hover:text-[#EC4899] font-bold tracking-wide transition-colors"
        >
          <FaArrowLeft className="text-[10px]" /> Kembali ke Halaman Masuk
        </Link>
      </div>
    </div>
  );
}