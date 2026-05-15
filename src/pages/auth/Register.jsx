import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaBuilding } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", clinic: "", email: "", password: "", role: "admin" });

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registrasi Berhasil!");
    navigate("/login");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Join Us!</h2>
        <p className="text-gray-400 font-medium">Mulai kelola klinik Anda secara profesional</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input 
              type="text" placeholder="Nama" 
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-xl outline-none focus:border-blue-500 transition-all text-sm"
              onChange={(e) => setForm({...form, name: e.target.value})}
            />
          </div>
          <div className="relative">
            <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input 
              type="text" placeholder="Klinik" 
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-xl outline-none focus:border-blue-500 transition-all text-sm"
              onChange={(e) => setForm({...form, clinic: e.target.value})}
            />
          </div>
        </div>

        <div className="relative">
          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
          <input 
            type="email" placeholder="Email Address" 
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-xl outline-none focus:border-blue-500 transition-all text-sm"
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
          <input 
            type="password" placeholder="Password" 
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-xl outline-none focus:border-blue-500 transition-all text-sm"
            onChange={(e) => setForm({...form, password: e.target.value})}
          />
        </div>

        <div className="py-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Pilih Peran Anda</label>
          <div className="grid grid-cols-3 gap-2">
            {["Dokter", "Admin", "Kasir"].map((role) => (
              <button
                key={role} type="button"
                onClick={() => setForm({...form, role: role.toLowerCase()})}
                className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                  form.role === role.toLowerCase() ? "bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-100 text-gray-400"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0066FF] text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all mt-4"
        >
          Buat Akun
        </button>

        <p className="text-center text-xs text-gray-400 font-bold mt-6">
          Sudah punya akun? <Link to="/login" className="text-[#0066FF] hover:underline">Masuk</Link>
        </p>
      </form>
    </motion.div>
  );
}