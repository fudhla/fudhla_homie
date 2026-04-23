// UserForm.jsx
import { useState } from "react";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";

export default function UserForm() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    skill: "",
    jalur: "",
    komitmen: "",
  });

  const [errors, setErrors] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    // Reset error saat user mengetik
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    let err = {};
    // Validasi Nama (3 syarat)
    if (!form.nama) err.nama = "Nama lengkap tidak boleh kosong";
    else if (/\d/.test(form.nama)) err.nama = "Nama tidak boleh mengandung angka";
    else if (form.nama.length < 5) err.nama = "Nama minimal 5 karakter";

    // Validasi Email (3 syarat)
    if (!form.email) err.email = "Email wajib diisi";
    else if (!form.email.includes("@")) err.email = "Gunakan format email yang valid";
    else if (!form.email.endsWith(".com")) err.email = "Hanya menerima domain .com";

    // Validasi Skill (3 syarat)
    if (!form.skill) err.skill = "Field ini wajib diisi";
    else if (form.skill.length > 20) err.skill = "Terlalu panjang (maks 20 karakter)";
    else if (form.skill.length < 2) err.skill = "Terlalu pendek";

    if (!form.jalur) err.jalur = "Silakan pilih jalur belajar";
    if (!form.komitmen) err.komitmen = "Pilih komitmen waktu Anda";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowResult(true);
    }
  };

  // Cek apakah form sudah terisi (untuk conditional rendering tombol)
  const isNotEmpty = form.nama && form.email && form.skill && form.jalur && form.komitmen;

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit}>
        <InputField
          label="Nama Lengkap"
          type="text"
          placeholder="Masukkan nama sesuai KTP"
          value={form.nama}
          onChange={(e) => handleChange("nama", e.target.value)}
          error={errors.nama}
        />

        <InputField
          label="Email Kerja"
          type="email"
          placeholder="nama@perusahaan.com"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
        />

        <InputField
          label="Keahlian Utama"
          type="text"
          placeholder="Contoh: ReactJS, Python, dsb"
          value={form.skill}
          onChange={(e) => handleChange("skill", e.target.value)}
          error={errors.skill}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Jalur Belajar"
            value={form.jalur}
            onChange={(e) => handleChange("jalur", e.target.value)}
            options={["Frontend", "Backend", "Fullstack"]}
            error={errors.jalur}
          />

          <SelectField
            label="Komitmen"
            value={form.komitmen}
            onChange={(e) => handleChange("komitmen", e.target.value)}
            options={["Part Time", "Full Time"]}
            error={errors.komitmen}
          />
        </div>

        {/* Conditional Rendering Tombol Submit */}
        {isNotEmpty && (
          <button
            type="submit"
            className="w-full mt-4 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-200"
          >
            Selesaikan Pendaftaran
          </button>
        )}
      </form>

      {/* Tampilan Hasil (Conditional Rendering) */}
      {showResult && (
        <div className="mt-8 p-6 bg-emerald-50 border-2 border-emerald-100 rounded-3xl animate-bounce-short">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white mr-3">✓</div>
            <h3 className="text-emerald-800 font-bold text-lg">Pendaftaran Diterima!</h3>
          </div>
          <div className="grid grid-cols-2 gap-y-2 text-sm text-emerald-700">
            <p className="font-semibold">Nama:</p><p>{form.nama}</p>
            <p className="font-semibold">Email:</p><p>{form.email}</p>
            <p className="font-semibold">Jalur:</p><p className="uppercase">{form.jalur}</p>
          </div>
        </div>
      )}
    </div>
  );
}