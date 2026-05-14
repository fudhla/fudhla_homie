import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Simulasi/Dummy Login
      await new Promise(r => setTimeout(r, 1000));
      localStorage.setItem("user", JSON.stringify({ name: "Admin" }));
      navigate("/");
    } catch (err) {
      setError("Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-8">
        <h2 className="text-white text-3xl font-bold mb-2 flex items-center">
          Selamat Datang <span className="ml-2 text-2xl">💖</span>
        </h2>
        <p className="text-[#E9D5DA]/60 text-sm">Masuk ke akun Glow Care Anda</p>
      </div>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#E9D5DA]/40 uppercase">Email</label>
          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-4 text-[#E9D5DA]/20 text-sm" />
            <input
              type="text"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-12 pr-4 py-3.5 bg-[#4A1229] border border-white/5 rounded-xl text-sm text-white placeholder-[#E9D5DA]/20 focus:outline-none focus:border-[#EC4899] focus:ring-1 focus:ring-[#EC4899] transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#E9D5DA]/40 uppercase">Password</label>
          <div className="relative flex items-center">
            <FaLock className="absolute left-4 text-[#E9D5DA]/20 text-sm" />
            <input
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-3.5 bg-[#4A1229] border border-white/5 rounded-xl text-sm text-white placeholder-[#E9D5DA]/20 focus:outline-none focus:border-[#EC4899] focus:ring-1 focus:ring-[#EC4899] transition-all"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 text-[#E9D5DA]/20 hover:text-white">
              {showPass ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-[#EC4899] text-white py-3.5 rounded-xl font-bold hover:bg-[#D13D81] transition-all shadow-lg shadow-[#EC4899]/20 disabled:opacity-70"
        >
          {loading ? "Memproses..." : "Masuk Sekarang"}
        </button>
      </form>

      <p className="text-center text-sm text-[#E9D5DA]/40 mt-8">
        Belum punya akun?{" "}
        <Link to="/register" className="text-[#EC4899] font-bold hover:underline">Daftar</Link>
      </p>
    </div>
  );
}