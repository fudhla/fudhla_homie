import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaTint, FaSearch, FaPlus } from "react-icons/fa";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Table from "../components/Table";

const patientList = [
  { id: 1, name: "Alya Putri", skin: "Berminyak/Acne", status: "Active Treatment", doctor: "dr. Sarah", lastVisit: "2 Hari lalu" },
  { id: 2, name: "Budi Santoso", skin: "Kering/Aging", status: "Maintenance", doctor: "dr. Reza", lastVisit: "1 Minggu lalu" },
  { id: 3, name: "Indah Permata", skin: "Sensitif", status: "Consultation", doctor: "dr. Sarah", lastVisit: "Baru" },
];

export default function Patients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const headers = ["Pasien", "Kondisi Kulit", "Dokter", "Status", "Kunjungan"];

  const filteredPatients = patientList.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.skin.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-sans" style={{ color: "#0f172a" }}>
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>Data Pasien Klinis</h1>
          <p className="text-sm" style={{ color: "#64748b" }}>Monitoring rekam medis dan tipe kulit pasien</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Kolom Pencarian */}
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2" style={{ color: "#94a3b8" }} />
            <input 
              type="text" 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari pasien..." 
              style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", color: "#0f172a" }}
              className="w-full pl-12 pr-4 py-3 border rounded-full text-sm outline-none focus:ring-1 focus:ring-blue-600 transition-all shadow-sm placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={() => navigate("/patients/add")}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <FaPlus size={12} /> Tambah
          </button>
        </div>
      </div>

      {/* Kontainer Tabel Utama */}
      <div style={{ backgroundColor: "#ffffff", borderRadius: "30px", overflow: "hidden" }} className="border border-slate-100 shadow-xl shadow-slate-200/50">
        <Table headers={headers}>
          {filteredPatients.map(p => (
            <tr 
              key={p.id} 
              onClick={() => navigate(`/patients/add`)}
              style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #f1f5f9" }} 
              className="hover:!bg-slate-50 transition-colors cursor-pointer group"
            >
              {/* Nama Pasien */}
              <td className="px-8 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#eff6ff", color: "#2563eb" }}>
                  <FaUserCircle size={24}/> 
                </div>
                <span className="font-bold" style={{ color: "#0f172a" }}>{p.name}</span>
              </td>
              
              {/* Kondisi Kulit */}
              <td className="px-8 py-5 text-sm">
                <span className="flex items-center gap-2" style={{ color: "#475569" }}>
                  <FaTint style={{ color: "#3b82f6" }} /> {p.skin}
                </span>
              </td>
              
              {/* Dokter */}
              <td className="px-8 py-5 text-sm font-semibold" style={{ color: "#0f172a" }}>{p.doctor}</td>
              
              {/* Status Badge */}
              <td className="px-8 py-5">
                <Badge variant={p.status === 'Active Treatment' ? 'active' : 'default'}>
                  {p.status}
                </Badge>
              </td>
              
              {/* Terakhir Berkunjung */}
              <td className="px-8 py-5 text-sm" style={{ color: "#94a3b8" }}>{p.lastVisit}</td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}