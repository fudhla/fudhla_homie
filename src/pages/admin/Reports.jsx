import React from "react";
import { FaFileInvoiceDollar, FaUsers, FaChartLine, FaCalendarAlt } from "react-icons/fa";

const monthlyData = [
  { month: "Jan", revenue: 185000000, patients: 128 },
  { month: "Feb", revenue: 210000000, patients: 145 },
  { month: "Mar", revenue: 195000000, patients: 138 },
  { month: "Apr", revenue: 250000000, patients: 162 },
  { month: "Mei", revenue: 230000000, patients: 155 },
  { month: "Jun", revenue: 275000000, patients: 178 },
];

export default function Reports() {
  const formatRp = (n) => "Rp " + n.toLocaleString();

  return (
    <div className="font-sans space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#343C6A]">Laporan Keuangan</h1>
        <p className="text-sm text-[#718EBF]">Ringkasan pendapatan & performa klinik</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <FaFileInvoiceDollar className="text-emerald-500 text-2xl mb-3" />
          <p className="text-sm text-slate-500 font-medium">Total Pendapatan (Bulan Ini)</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{formatRp(275000000)}</h3>
          <span className="text-xs text-emerald-600 font-bold">↑ 15% dari bulan lalu</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <FaUsers className="text-blue-500 text-2xl mb-3" />
          <p className="text-sm text-slate-500 font-medium">Rata-rata Kunjungan/Hari</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">24 Pasien</h3>
          <span className="text-xs text-blue-600 font-bold">↑ 8% dari bulan lalu</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <FaChartLine className="text-purple-500 text-2xl mb-3" />
          <p className="text-sm text-slate-500 font-medium">Rata-rata Transaksi</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{formatRp(1850000)}</h3>
          <span className="text-xs text-purple-600 font-bold">Per kunjungan</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-slate-900">Pendapatan Bulanan 2026</h2>
          <FaCalendarAlt className="text-slate-400" />
        </div>
        <div className="space-y-3">
          {monthlyData.map((m) => (
            <div key={m.month} className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-500 w-8">{m.month}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                  style={{ width: `${(m.revenue / 300000000) * 100}%` }}
                >
                  {m.revenue > 200000000 ? formatRp(m.revenue) : ""}
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400 w-16 text-right">{m.patients} psn</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
