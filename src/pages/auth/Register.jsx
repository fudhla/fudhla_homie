import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser, FaSpa } from "react-icons/fa";

const roles = [
  { value: "dokter", label: "Dokter Estetik", emoji: "👩‍⚕️" },
  { value: "terapis", label: "Beauty Therapist", emoji: "✨" },
  { value: "admin", label: "Admin Klinik", emoji: "💼" },
  { value: "kasir", label: "Kasir", emoji: "💳" },
];

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", clinicName: "", role: "", email: "", password: "", confirm: "", agree: false,
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.role) {
      setError("Semua field wajib diisi.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Password dan konfirmasi tidak cocok.");
      return;
    }
    if (!form.agree) {
      setError("Anda harus menyetujui syarat & ketentuan.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="font-sans">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">Buat Akun Baru ✨</h2>
        <p className="text-sm text-[#E9D5DA]/60 leading-relaxed">Daftarkan klinik kecantikan Anda ke Glow Care</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-5 py-3.5 rounded-xl shadow-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-[#E9D5DA]/40 uppercase tracking-wider mb-2 block">Nama Lengkap</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E9D5DA]/20 text-sm" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="dr. Sari Pratiwi"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-white/5 bg-[#4A1229] text-white placeholder-[#E9D5DA]/20 text-sm focus:outline-none focus:border-[#EC4899] focus:ring-1 focus:ring-[#EC4899] transition-all"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-[#E9D5DA]/40 uppercase tracking-wider mb-2 block">Nama Klinik</label>
            <div className="relative">
              <FaSpa className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E9D5DA]/20 text-sm" />
              <input
                type="text"
                value={form.clinicName}
                onChange={(e) => set("clinicName", e.target.value)}
                placeholder="Glow Care Pekanbaru"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-white/5 bg-[#4A1229] text-white placeholder-[#E9D5DA]/20 text-sm focus:outline-none focus:border-[#EC4899] focus:ring-1 focus:ring-[#EC4899] transition-all"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#E9D5DA]/40 uppercase tracking-wider mb-2 block">Jabatan / Peran</label>
          <div className="grid grid-cols-4 gap-3">
            {roles.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => set("role", r.value)}
                className={`flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-xl border text-xs font-bold transition-all ${
                  form.role === r.value
                    ? "border-[#EC4899] bg-[#EC4899]/20 text-[#EC4899] shadow-lg shadow-[#EC4899]/10 transform scale-[1.02]"
                    : "border-white/5 bg-[#4A1229] text-[#E9D5DA]/40 hover:border-white/20 hover:text-[#E9D5DA]"
                }`}
              >
                <span className="text-xl mb-0.5">{r.emoji}</span>
                <span className="leading-tight text-center text-[10px] tracking-wide uppercase">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Email, Password, Confirm fields - Samakan dengan gaya input di atas menggunakan bg-[#4A1229] dan fokus [#EC4899] */}
        {/* ... (Gunakan pola warna yang sama untuk sisa input) ... */}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-2 rounded-xl bg-[#EC4899] hover:bg-[#D13D81] active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-[#EC4899]/20 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? "Mendaftarkan..." : "Buat Akun Sekarang 🌸"}
        </button>
      </form>
    </div>
  );
}