import React from "react";
import { FaFileMedical, FaNotesMedical, FaCalendarAlt } from "react-icons/fa";

export default function RiwayatKlinis() {
  const history = [
    { id: 1, date: "12 Juni 2026", treatment: "Facial Gold Standard", doctor: "dr. Sarah", notes: "Kondisi kulit membaik, kemerahan berkurang. Disarankan lanjut sunscreen reguler." },
    { id: 2, date: "28 Mei 2026", treatment: "Konsultasi Awal & Skin Analyzer", doctor: "dr. Sarah", notes: "Tipe kulit berminyak dengan kecenderungan jerawat ringan di area T-zone." },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans min-h-screen bg-slate-50 text-slate-700">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <FaFileMedical className="text-blue-600" /> Rekam Medis & Riwayat Klinis
        </h1>
        <p className="text-sm text-slate-500">Daftar perawatan kulit dan catatan dokter yang pernah Anda lakukan</p>
      </div>

      <div className="space-y-4">
        {history.map((h) => (
          <div key={h.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
              <FaNotesMedical size={20} />
            </div>
            <div className="space-y-2 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{h.treatment}</h3>
                  <p className="text-xs text-slate-500 font-medium">Dokter: <span className="text-slate-800 font-semibold">{h.doctor}</span></p>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <FaCalendarAlt size={10} className="text-slate-400" /> {h.date}
                </span>
              </div>
              <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed italic">
                "{h.notes}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}