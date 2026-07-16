import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaTint, FaSearch, FaPlus, FaCrown, FaGem, FaStar, FaPhone, FaEnvelope } from "react-icons/fa";
import { usersAPI } from "../services/usersAPI";
import Loading from "../components/Loading";

// Data pasien fallback yang kaya
const fallbackPatients = [
  { id: 1, name: "Alya Putri", email: "alya@email.com", phone: "0812-3456-7890", skin: "Berminyak/Acne", status: "Active Treatment", doctor: "dr. Sarah Wijaya", lastVisit: "2 Hari lalu", tier: "Gold", points: 450 },
  { id: 2, name: "Budi Santoso", email: "budi@email.com", phone: "0813-4567-8901", skin: "Kering/Aging", status: "Maintenance", doctor: "dr. Reza Pratama", lastVisit: "1 Minggu lalu", tier: "Silver", points: 220 },
  { id: 3, name: "Indah Permata", email: "indah@email.com", phone: "0814-5678-9012", skin: "Sensitif", status: "Consultation", doctor: "dr. Sarah Wijaya", lastVisit: "Baru", tier: "Bronze", points: 50 },
  { id: 4, name: "Rina Aprilia", email: "rina@email.com", phone: "0815-6789-0123", skin: "Kombinasi", status: "Active Treatment", doctor: "dr. Dimas Ardian", lastVisit: "5 Hari lalu", tier: "Gold", points: 780 },
  { id: 5, name: "Siti Maharani", email: "siti@email.com", phone: "0816-7890-1234", skin: "Normal", status: "Scheduled", doctor: "dr. Maya Anggraini", lastVisit: "3 Hari lalu", tier: "Silver", points: 280 },
  { id: 6, name: "Dewi Lestari", email: "dewi@email.com", phone: "0817-8901-2345", skin: "Berminyak", status: "Completed", doctor: "dr. Reza Pratama", lastVisit: "2 Minggu lalu", tier: "Bronze", points: 80 },
];

export default function Patients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTier, setFilterTier] = useState("all");

  useEffect(() => {
    async function fetchPatients() {
      try {
        const data = await usersAPI.fetchUsers();
        const members = (data || []).filter(u => u.role === "member");
        if (members.length > 0) {
          setPatients(members.map((m, i) => ({
            id: m.id,
            name: m.name || "Unknown",
            email: m.email || "-",
            phone: m.phone || "-",
            skin: m.skin_type || "-",
            status: m.status || "Active",
            doctor: m.doctor || ["dr. Sarah Wijaya", "dr. Reza Pratama", "dr. Dimas Ardian"][i % 3],
            lastVisit: m.last_visit || "-",
            tier: m.tier || "Bronze",
            points: m.points || 0,
          })));
        } else {
          setPatients(fallbackPatients);
        }
      } catch {
        setPatients(fallbackPatients);
      } finally {
        setLoading(false);
      }
    }
    fetchPatients();
  }, []);

  // Filter berdasarkan search + tier
  const filteredPatients = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase());
    const matchTier = filterTier === "all" || p.tier === filterTier;
    return matchSearch && matchTier;
  });

  const tierConfig = {
    Gold: { icon: FaCrown, bg: "bg-amber-50 text-amber-700 border-amber-200" },
    Silver: { icon: FaStar, bg: "bg-slate-50 text-slate-600 border-slate-300" },
    Bronze: { icon: FaGem, bg: "bg-orange-50 text-orange-700 border-orange-200" },
  };

  const statusStyle = (status) => {
    const map = {
      "Active Treatment": "bg-emerald-50 text-emerald-700 border-emerald-200",
      "Maintenance": "bg-blue-50 text-blue-700 border-blue-200",
      "Consultation": "bg-purple-50 text-purple-700 border-purple-200",
      "Scheduled": "bg-amber-50 text-amber-700 border-amber-200",
      "Completed": "bg-slate-50 text-slate-600 border-slate-200",
    };
    return map[status] || "bg-slate-50 text-slate-600 border-slate-200";
  };

  if (loading) return <Loading />;

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#343C6A]">Manajemen Pasien</h1>
          <p className="text-sm text-[#718EBF]">{patients.length} pasien terdaftar di GlowCare</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama/email..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <select
            value={filterTier}
            onChange={e => setFilterTier(e.target.value)}
            className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none cursor-pointer"
          >
            <option value="all">All Tier</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>
          <button
            onClick={() => navigate("/patients/add")}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <FaPlus size={12} /> Tambah
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Pasien</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{patients.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Treatment Aktif</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{patients.filter(p => p.status === "Active Treatment").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gold Member</p>
          <p className="text-2xl font-black text-amber-600 mt-1">{patients.filter(p => p.tier === "Gold").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Konsultasi Baru</p>
          <p className="text-2xl font-black text-purple-600 mt-1">{patients.filter(p => p.status === "Consultation" || p.status === "Scheduled").length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Pasien", "Kontak", "Kondisi Kulit", "Dokter", "Status", "Tier", "Kunjungan"].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-slate-400">
                    <FaUserCircle className="text-4xl mx-auto mb-3 opacity-40" />
                    <p className="text-sm">Tidak ada pasien ditemukan</p>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => {
                  const TierIcon = (tierConfig[p.tier] || tierConfig.Bronze).icon;
                  return (
                    <tr
                      key={p.id}
                      className="border-b border-slate-50 hover:bg-blue-50/40 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 font-bold">
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{p.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-slate-500 flex items-center gap-1"><FaEnvelope size={10} /> {p.email}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><FaPhone size={10} /> {p.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                          <FaTint className="text-blue-500" size={12} /> {p.skin}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700">{p.doctor}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusStyle(p.status)}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${(tierConfig[p.tier] || tierConfig.Bronze).bg}`}>
                          <TierIcon size={10} /> {p.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {p.lastVisit}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}