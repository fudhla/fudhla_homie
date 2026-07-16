import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { 
  FaFileMedical, FaCalendarAlt, FaUserMd,
  FaSearch, FaFilter, FaDownload, FaPrint, FaChevronDown,
  FaChevronUp, FaCheckCircle, FaClock, FaFlask, FaStethoscope,
  FaPrescriptionBottleAlt, FaShieldAlt
} from "react-icons/fa";

const allHistory = [
  { id: 1, date: "12 Juni 2026", treatment: "Facial Gold Standard", doctor: "dr. Sarah Wijaya, Sp.KK", category: "Perawatan Rutin", diagnosis: "Kulit kombinasi dengan dehidrasi ringan di area pipi.", notes: "Kondisi kulit membaik. Disarankan lanjut sunscreen SPF 50+.", status: "Selesai", rating: 5, followUp: "Kontrol 1 bulan lagi", medicines: ["Sunscreen SPF 50+", "Moisturizer Hyaluronic Acid", "Vitamin C Serum"] },
  { id: 2, date: "28 Mei 2026", treatment: "Konsultasi Awal & Skin Analyzer", doctor: "dr. Sarah Wijaya, Sp.KK", category: "Konsultasi", diagnosis: "Kulit berminyak dengan jerawat ringan di T-zone.", notes: "Disarankan facial deep cleansing rutin 2 minggu sekali.", status: "Selesai", rating: 4, followUp: "Facial treatment minggu depan", medicines: ["Face wash salicylic acid", "Oil-free moisturizer", "Niacinamide serum"] },
  { id: 3, date: "15 April 2026", treatment: "Chemical Peel Medium", doctor: "dr. Reza Pratama, Sp.KK", category: "Perawatan Intensif", diagnosis: "Hiperpigmentasi pasca inflamasi bekas jerawat.", notes: "Prosedur chemical peel berjalan lancar.", status: "Selesai", rating: 5, followUp: "Hindari sinar matahari 7 hari", medicines: ["Gentle cleanser", "Healing ointment", "Sunscreen physical SPF 50"] },
  { id: 4, date: "20 Maret 2026", treatment: "Laser Rejuvenation", doctor: "dr. Maya Anggraini, Sp.KK", category: "Perawatan Intensif", diagnosis: "Kulit kusam, garis halus mulai tampak.", notes: "Sesi laser pertama selesai. Hasil terlihat setelah 1 minggu.", status: "Selesai", rating: 4, followUp: "Sesi ke-2 dalam 3 minggu", medicines: ["Soothing serum", "Antioksidan topical", "Pelembab intensif"] },
  { id: 5, date: "5 Februari 2026", treatment: "Acne Treatment & Ekstraksi", doctor: "dr. Dimas Ardian, Sp.KK", category: "Perawatan Kulit", diagnosis: "Acne vulgaris grade II.", notes: "Ekstraksi komedo dan jerawat dilakukan.", status: "Selesai", rating: 3, followUp: "Kontrol 2 minggu", medicines: ["Clindamycin phosphate gel", "Benzoyl peroxide 5%", "Non-comedogenic moisturizer"] },
  { id: 6, date: "18 Januari 2026", treatment: "Konsultasi Lanjutan", doctor: "dr. Sarah Wijaya, Sp.KK", category: "Konsultasi", diagnosis: "Perkembangan positif. Jerawat aktif berkurang 70%.", notes: "Pasien cukup puas dengan hasil treatment.", status: "Selesai", rating: 5, followUp: "Pertimbangkan laser untuk bekas", medicines: ["Lanjutkan regimen", "Tambahkan Azelaic acid 15%"] },
  { id: 7, date: "22 Desember 2025", treatment: "Anti-Aging Treatment", doctor: "dr. Maya Anggraini, Sp.KK", category: "Perawatan Intensif", diagnosis: "Penuaan dini stage I.", notes: "Perawatan radiofrequency. Efek tightening terasa.", status: "Selesai", rating: 4, followUp: "Sesi ke-2 bulan depan", medicines: ["Retinol serum 0.5%", "Peptide moisturizer", "Collagen supplement"] },
  { id: 8, date: "10 November 2025", treatment: "Facial Deep Cleansing", doctor: "dr. Dimas Ardian, Sp.KK", category: "Perawatan Rutin", diagnosis: "Kulit berminyak dengan komedo.", notes: "Pembersihan wajah intensif.", status: "Selesai", rating: 4, followUp: "Rutin facial tiap 2 minggu", medicines: ["Clay mask", "Salicylic acid toner", "Oil-control sunscreen"] },
];

const catIcons = {
  "Perawatan Rutin": "FaShieldAlt", "Konsultasi": "FaStethoscope",
  "Perawatan Intensif": "FaFlask", "Perawatan Kulit": "FaPrescriptionBottleAlt"
};

const catColors = {
  "Perawatan Rutin": "border-blue-300 bg-blue-50 text-blue-700",
  "Konsultasi": "border-purple-300 bg-purple-50 text-purple-700",
  "Perawatan Intensif": "border-amber-300 bg-amber-50 text-amber-700",
  "Perawatan Kulit": "border-emerald-300 bg-emerald-50 text-emerald-700",
};

export default function RiwayatKlinis() {
  const userSession = localStorage.getItem("userSession");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [expandedId, setExpandedId] = useState(null);
  if (!userSession) return <Navigate to="/login" replace />;
  const categories = ["Semua", ...new Set(allHistory.map(h => h.category))];
  const filtered = allHistory.filter(h => {
    const ms = h.treatment.toLowerCase().includes(search.toLowerCase()) || h.doctor.toLowerCase().includes(search.toLowerCase()) || h.diagnosis.toLowerCase().includes(search.toLowerCase());
    const mc = filterCategory === "Semua" || h.category === filterCategory;
    return ms && mc;
  });
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3"><FaFileMedical className="text-blue-600" /> Rekam Medis &amp; Riwayat Klinis</h1>
          <p className="text-sm text-slate-500 mt-1">{allHistory.length} catatan perawatan dan konsultasi dokter</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-1.5"><FaDownload size={12} /> Export</button>
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center gap-1.5"><FaPrint size={12} /> Cetak</button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari treatment, dokter..." className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
        <div className="relative">
          <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="pl-10 pr-8 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none cursor-pointer appearance-none min-w-[160px]">
            {categories.map(cat => <option key={cat} value={cat}>{cat === "Semua" ? "Semua Kategori" : cat}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Kunjungan</p><p className="text-2xl font-black text-slate-900 mt-1">{allHistory.length}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Perawatan Rutin</p><p className="text-2xl font-black text-blue-600 mt-1">{allHistory.filter(h => h.category === "Perawatan Rutin").length}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Perawatan Intensif</p><p className="text-2xl font-black text-amber-600 mt-1">{allHistory.filter(h => h.category === "Perawatan Intensif").length}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Konsultasi</p><p className="text-2xl font-black text-purple-600 mt-1">{allHistory.filter(h => h.category === "Konsultasi").length}</p></div>
      </div>
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200"><FaFileMedical className="text-5xl text-slate-200 mx-auto mb-4" /><p className="text-slate-400 font-medium">Tidak ada riwayat ditemukan</p></div>
        ) : filtered.map((h) => {
          const isExpanded = expandedId === h.id;
          const catColor = catColors[h.category] || "border-slate-300 bg-slate-50 text-slate-700";
          const renderIcon = (cat) => {
            switch(cat) {
              case "Perawatan Rutin": return <FaShieldAlt />;
              case "Konsultasi": return <FaStethoscope />;
              case "Perawatan Intensif": return <FaFlask />;
              case "Perawatan Kulit": return <FaPrescriptionBottleAlt />;
              default: return <FaFileMedical />;
            }
          };
          return (
            <div key={h.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="p-5 flex items-start justify-between cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : h.id)}>
                <div className="flex items-start gap-4 flex-1">
                  <div className={"w-12 h-12 rounded-xl flex items-center justify-center text-lg shrink-0 " + catColor.split(" ")[1] + " " + catColor.split(" ")[2]}>{renderIcon(h.category)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={"text-[10px] font-bold px-2.5 py-0.5 rounded-full border " + catColor}>{h.category}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1"><FaCalendarAlt size={10} /> {h.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{h.treatment}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><FaUserMd size={10} className="text-blue-400" /> {h.doctor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1"><FaCheckCircle size={8} /> {h.status}</span>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1">{isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}</button>
                </div>
              </div>
              {isExpanded && (
                <div className="px-5 pb-5 pt-0 border-t border-slate-100 mt-0">
                  <div className="pt-4 space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4"><p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1.5">Diagnosis Dokter</p><p className="text-sm text-blue-800">{h.diagnosis}</p></div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4"><p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Catatan Klinis</p><p className="text-sm text-slate-700 italic">"{h.notes}"</p></div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4"><p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2">Resep &amp; Skincare</p><ul className="space-y-1.5">{h.medicines.map((m, i) => <li key={i} className="text-xs text-emerald-800 flex items-start gap-2"><FaCheckCircle size={10} className="text-emerald-500 mt-0.5 shrink-0" />{m}</li>)}</ul></div>
                    <div className="flex items-center gap-2 text-xs text-slate-500"><FaClock size={10} className="text-blue-400" /> Tindak lanjut: <strong className="text-slate-700">{h.followUp}</strong></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
