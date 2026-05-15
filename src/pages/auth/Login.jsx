import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("user", "true");
    navigate("/");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Hello Again!</h2>
        <p className="text-gray-400 font-medium">Welcome Back</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="relative">
          <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            type="email"
            required
            className="w-full pl-14 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:border-[#0066FF] focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-300"
            placeholder="Email Address"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            type={showPass ? "text" : "password"}
            required
            className="w-full pl-14 pr-14 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:border-[#0066FF] focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-300"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button 
            type="button" 
            onClick={() => setShowPass(!showPass)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-600"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0066FF] text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-600 active:scale-[0.98] transition-all"
        >
          Login
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