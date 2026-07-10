import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { usersAPI } from "../../services/usersAPI"; // INTEGRASI API
import AlertBox from "../../components/AlertBox"; // KOMPONEN ALERT

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // STATE LOADING
  const [error, setError] = useState(""); // STATE ERROR

  const handleLogin = async (e) => { // DIUBAH MENJADI ASYNC
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Ambil data user dari Supabase berdasarkan email yang diinput
      const data = await usersAPI.getUserByEmail(formData.email);

      // Jika data tidak ditemukan di database
      if (!data || data.length === 0) {
        throw new Error("Alamat email tidak ditemukan.");
      }

      const user = data[0];

      // 2. Validasi kecocokan kata sandi
      if (user.password !== formData.password) {
        throw new Error("Kata sandi yang Anda masukkan salah.");
      }

      // 3. Jika sukses, simpan sesi status ke localStorage
      localStorage.setItem("user", "true");
      // Simpan userSession lengkap dengan default CRM (tier & points)
      // agar widget member di GuestPage bisa menampilkan data loyalty
      localStorage.setItem("userSession", JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tier: user.tier || "Bronze",
        points: user.points ?? 0,
        created_at: user.created_at,
      }));
      
      // 4. Pengalihan halaman otomatis berdasarkan role user dari database
      if (user.role === "member") {
        navigate("/member");
      } else {
        // DIUBAH: Dialihkan ke /dashboard karena rute / sudah dipakai oleh halaman Guest
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Terjadi kegagalan saat masuk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Hello Again!</h2>
        <p className="text-gray-400 font-medium">Welcome Back</p>
      </div>

      {/* MENAMPILKAN ALERT BOX TEPAT DI ATAS FORM JIKA TERJADI ERROR */}
      {error && <AlertBox type="error">{error}</AlertBox>}

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="relative">
          <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            type="email"
            required
            disabled={loading} // LOCK INPUT SAAT LOADING KONEKSI
            className="w-full pl-14 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:border-[#0066FF] focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-300 disabled:opacity-60"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            type={showPass ? "text" : "password"}
            required
            disabled={loading} // LOCK INPUT SAAT LOADING KONEKSI
            className="w-full pl-14 pr-14 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:border-[#0066FF] focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-300 disabled:opacity-60"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button 
            type="button" 
            onClick={() => setShowPass(!showPass)}
            disabled={loading}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-600 disabled:opacity-50"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading} // MATIKAN KLIK GANDA SAAT LOADING
          className="w-full bg-[#0066FF] text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Memvalidasi..." : "Login"} {/* TEKS DINAMIS */}
        </button>

        <div className="flex flex-col gap-4 mt-8 text-center">
          <Link to="/forgot" className="text-xs font-bold text-gray-400 hover:text-blue-600">
            Forgot Password
          </Link>
          <p className="text-sm text-gray-400">
            Belum punya akun? <Link to="/register" className="text-[#0066FF] font-bold hover:underline">Daftar Sekarang</Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
}