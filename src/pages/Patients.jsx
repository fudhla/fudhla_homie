import React from "react";
import { FaUserCircle, FaTint, FaSearch } from "react-icons/fa";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Table from "../components/Table";

const patientList = [
  { id: 1, name: "Alya Putri", skin: "Berminyak/Acne", status: "Active Treatment", doctor: "dr. Sarah", lastVisit: "2 Hari lalu" },
  { id: 2, name: "Budi Santoso", skin: "Kering/Aging", status: "Maintenance", doctor: "dr. Reza", lastVisit: "1 Minggu lalu" },
  { id: 3, name: "Indah Permata", skin: "Sensitif", status: "Consultation", doctor: "dr. Sarah", lastVisit: "Baru" },
];

export default function Patients() {
  const headers = ["Pasien", "Kondisi Kulit", "Dokter", "Status", "Kunjungan"];

  return (
    <div className="font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#343C6A]">Data Pasien Klinis</h1>
          <p className="text-sm text-[#718EBF]">Monitoring rekam medis dan tipe kulit pasien</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#888EA2]" />
          <input 
            type="text" 
            placeholder="Search for patient..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#E6EFF5] rounded-full text-sm outline-none focus:ring-1 focus:ring-[#1877F2] transition-all shadow-sm"
          />
        </div>
      </div>

      <Card className="rounded-[30px]">
        <Table headers={headers}>
          {patientList.map(p => (
            <tr key={p.id} className="hover:bg-[#F5F7FA] transition-colors cursor-pointer group">
              <td className="px-8 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1877F2]">
                  <FaUserCircle size={24}/> 
                </div>
                <span className="font-bold text-[#232323]">{p.name}</span>
              </td>
              <td className="px-8 py-5 text-sm text-[#718EBF]">
                <span className="flex items-center gap-2"><FaTint className="text-blue-400" /> {p.skin}</span>
              </td>
              <td className="px-8 py-5 text-sm font-semibold text-[#232323]">{p.doctor}</td>
              <td className="px-8 py-5">
                <Badge variant={p.status === 'Active Treatment' ? 'active' : 'default'}>
                  {p.status}
                </Badge>
              </td>
              <td className="px-8 py-5 text-sm text-[#B1B1B1]">{p.lastVisit}</td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}