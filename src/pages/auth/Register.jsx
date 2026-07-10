import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usersAPI } from "../../services/usersAPI";
import AlertBox from "../../components/AlertBox";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
    tier: "Bronze",
    points: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setLoading(true);
    setError("");
    setSuccess("");

    // Log ke terminal browser untuk memastikan fungsi ini berjalan saat tombol diklik
    console.log("Mencoba mendaftarkan data:", formData);

    try {
      // 1. Validasi cek apakah email sudah ada di Supabase
      const userExist = await usersAPI.getUserByEmail(formData.email);
      if (userExist && userExist.length > 0) {
        throw new Error("Email sudah terdaftar! Gunakan email lain.");
      }

      // 2. Kirim data ke Supabase jika email belum terdaftar
      await usersAPI.registerUser(formData);
      
      setSuccess("Pendaftaran Berhasil! Mengalihkan ke halaman login...");
      
      // Pindah ke halaman login setelah 2.5 detik
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      console.error("Detail Error Register:", err);
      // Menampilkan pesan error spesifik dari server/Supabase langsung ke UI aplikasi
      setError(err.response?.data?.message || err.message || "Gagal melakukan pendaftaran.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">GlowCare CRM</h2>
        <p className="text-sm text-center text-slate-500 mb-6">Daftar Akun Keanggotaan Baru</p>

        {/* Kotak Alert Interaktif */}
        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        {/* PASTIKAN onSubmit terpasang di tag <form> */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Alamat Email</label>
            <input
              type="email"
              name="email"
              placeholder="Alamat Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Kata Sandi</label>
            <input
              type="password"
              name="password"
              placeholder="Kata Sandi"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50 text-sm"
            />
          </div>

          {/* PASTIKAN type="submit" */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md disabled:opacity-50 text-sm cursor-pointer mt-2"
          >
            {loading ? "Mohon Tunggu / Mendaftarkan..." : "Daftar Sekarang"}
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-6">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}