import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaUser, FaNotesMedical } from "react-icons/fa";

const skinTypeOptions = [
  { emoji: "💧", label: "Kering" },
  { emoji: "✨", label: "Berminyak" },
  { emoji: "⚖️", label: "Kombinasi" },
  { emoji: "🛡️", label: "Sensitif" },
  { emoji: "🌟", label: "Normal" },
];

export default function AddPatient() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", skinType: "", age: "", gender: "Wanita",
    phone: "", email: "", address: "",
    allergies: "", productsUsed: "", notes: "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const steps = ["Data Diri", "Analisis Kulit", "Riwayat Medis"];

  return (
    <div className="p-6 bg-[#061A2B] min-h-screen text-white font-sans">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate("/patients")} className="w-10 h-10 rounded-xl bg-[#133C5E] flex items-center justify-center hover:bg-white/10 transition">
          <FaArrowLeft className="text-sm" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Registrasi Pasien</h1>
          <p className="text-xs text-[#80A1BA]">Input data profil kecantikan klien baru</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-10 max-w-2xl">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= i + 1 ? "bg-[#31B296] text-white" : "bg-[#133C5E] text-[#80A1BA]"}`}>
              {step > i + 1 ? <FaCheck /> : i + 1}
            </div>
            <span className={`text-xs font-bold hidden md:block ${step === i + 1 ? "text-white" : "text-[#456A88]"}`}>{s}</span>
            {i < steps.length - 1 && <div className="flex-1 h-[2px] bg-[#133C5E]" />}
          </div>
        ))}
      </div>

      <div className="max-w-2xl bg-[#133C5E] p-8 rounded-3xl border border-white/5 shadow-2xl">
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-[#31B296] flex items-center gap-2"><FaUser size={16}/> Informasi Kontak</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-[#80A1BA] mb-2 block font-bold uppercase tracking-wider">Nama Lengkap *</label>
                <input value={form.name} onChange={e => set("name", e.target.value)} type="text" placeholder="Nama Pasien" className="w-full bg-[#0B2A46] border border-white/5 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#31B296] outline-none transition-all" />
              </div>
              <div>
                <label className="text-[10px] text-[#80A1BA] mb-2 block font-bold uppercase tracking-wider">Nomor HP *</label>
                <input value={form.phone} onChange={e => set("phone", e.target.value)} type="tel" placeholder="08..." className="w-full bg-[#0B2A46] border border-white/5 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#31B296] outline-none" />
              </div>
            </div>
            <div>
                <label className="text-[10px] text-[#80A1BA] mb-2 block font-bold uppercase tracking-wider">Alamat Domisili</label>
                <textarea value={form.address} onChange={e => set("address", e.target.value)} rows={2} className="w-full bg-[#0B2A46] border border-white/5 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#31B296] outline-none resize-none" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-[#31B296] flex items-center gap-2"> Tipe Kulit & Usia</h3>
            <div className="grid grid-cols-5 gap-2">
              {skinTypeOptions.map((s) => (
                <button key={s.label} onClick={() => set("skinType", s.label)} className={`flex flex-col items-center p-3 rounded-2xl border-2 transition ${form.skinType === s.label ? "border-[#31B296] bg-[#31B296]/10" : "border-white/5 bg-[#0B2A46]"}`}>
                  <span className="text-xl mb-1">{s.emoji}</span>
                  <span className="text-[9px] font-bold uppercase">{s.label}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
               <div>
                  <label className="text-[10px] text-[#80A1BA] mb-2 block font-bold uppercase tracking-wider">Usia</label>
                  <input value={form.age} onChange={e => set("age", e.target.value)} type="number" className="w-full bg-[#0B2A46] border border-white/5 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#31B296] outline-none" />
               </div>
               <div>
                  <label className="text-[10px] text-[#80A1BA] mb-2 block font-bold uppercase tracking-wider">Produk Rutin</label>
                  <input value={form.productsUsed} onChange={e => set("productsUsed", e.target.value)} placeholder="Skincare saat ini" type="text" className="w-full bg-[#0B2A46] border border-white/5 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#31B296] outline-none" />
               </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-[#31B296] flex items-center gap-2"><FaNotesMedical size={16}/> Kontraindikasi</h3>
            <div>
              <label className="text-[10px] text-[#80A1BA] mb-2 block font-bold uppercase tracking-wider">Alergi & Riwayat Obat</label>
              <textarea value={form.allergies} onChange={e => set("allergies", e.target.value)} rows={3} className="w-full bg-[#0B2A46] border border-white/5 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#31B296] outline-none resize-none" placeholder="Alergi antibiotik, pengencer darah, dll..." />
            </div>
            <div>
              <label className="text-[10px] text-[#80A1BA] mb-2 block font-bold uppercase tracking-wider">Keluhan Utama</label>
              <textarea value={form.notes} onChange={e => set("notes", e.target.value)} rows={3} className="w-full bg-[#0B2A46] border border-white/5 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#31B296] outline-none resize-none" placeholder="Flek hitam, jerawat aktif, atau kerutan..." />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-10">
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate("/patients")} className="px-6 py-3 rounded-xl bg-[#0B2A46] text-[#80A1BA] font-bold text-sm hover:bg-white/5 transition-all">
            {step === 1 ? "Batal" : "Kembali"}
          </button>
          <button onClick={() => step < 3 ? setStep(step + 1) : navigate("/patients")} className="px-8 py-3 rounded-xl bg-[#31B296] text-white font-bold text-sm hover:bg-[#289B82] shadow-lg shadow-[#31B296]/20 transition-all">
            {step === 3 ? "Simpan Data" : "Lanjut"}
          </button>
        </div>
      </div>
    </div>
  );
}