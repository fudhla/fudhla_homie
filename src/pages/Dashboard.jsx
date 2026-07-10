import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaHandSparkles, FaCalendarCheck, FaChartLine, FaUserPlus, FaCrown, FaCoins, FaGem, FaStar, FaArrowRight } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { usersAPI } from "../services/usersAPI";
import { treatmentsAPI } from "../services/treatmentsAPI";
import { bookingsAPI } from "../services/bookingsAPI";
import Loading from "../components/Loading";

const chartData = [
  { day: 'Sen', patients: 24 },
  { day: 'Sel', patients: 15 },
  { day: 'Rab', patients: 35 },
  { day: 'Kam', patients: 45 },
  { day: 'Jum', patients: 30 },
  { day: 'Sab', patients: 50 },
  { day: 'Min', patients: 40 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalTreatments, setTotalTreatments] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [goldCount, setGoldCount] = useState(0);
  const [silverCount, setSilverCount] = useState(0);
  const [bronzeCount, setBronzeCount] = useState(0);
  const [queues, setQueues] = useState([]);
  const [recentMembers, setRecentMembers] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [users, treatments, bookings] = await Promise.all([
          usersAPI.fetchUsers(),
          treatmentsAPI.fetchAll(),
          bookingsAPI.fetchAll(),
        ]);
        
        const memberUsers = (users || []).filter(u => u.role === "member");
        setTotalPatients(memberUsers.length);
        setTotalTreatments(treatments?.length || 0);
        setTotalBookings(bookings?.length || 0);
        
        // Hitung distribusi tier
        setGoldCount(memberUsers.filter(m => m.tier === "Gold").length);
        setSilverCount(memberUsers.filter(m => m.tier === "Silver").length);
        setBronzeCount(memberUsers.filter(m => m.tier === "Bronze" || !m.tier).length);

        // 3 member terbaru
        setRecentMembers(memberUsers.slice(0, 3));

        // 3 booking terakhir
        const recent = (bookings || []).slice(0, 3);
        setQueues(recent.map((b, i) => ({
          id: b.id,
          name: `User #${b.user_id}`,
          treatment: b.treatment_name || `Treatment #${b.treatment_id}`,
          time: b.booking_date ? new Date(b.booking_date).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "-",
          doctor: "dr. GlowCare",
          avatar: `U${i + 1}`,
          color: ["bg-blue-100 text-blue-600", "bg-green-100 text-green-600", "bg-purple-100 text-purple-600"][i],
        })));
      } catch (err) {
        console.warn("Fallback data:", err.message);
        setTotalPatients(1284);
        setTotalTreatments(42);
        setTotalBookings(15);
        setGoldCount(320);
        setSilverCount(580);
        setBronzeCount(384);
        setQueues([
          { id: 1, name: "Alya Putri", treatment: "Facial Gold", time: "09:00", doctor: "dr. Sarah", avatar: "AP", color: "bg-blue-100 text-blue-600" },
          { id: 2, name: "Budi Santoso", treatment: "Laser Glow", time: "10:30", doctor: "dr. Reza", avatar: "BS", color: "bg-green-100 text-green-600" },
          { id: 3, name: "Indah Permata", treatment: "Chemical Peel", time: "11:15", doctor: "dr. Sarah", avatar: "IP", color: "bg-purple-100 text-purple-600" },
        ]);
        setRecentMembers([
          { id: 1, name: "Rina Aprilia", tier: "Gold", points: 450, email: "rina@email.com" },
          { id: 2, name: "Dewi Lestari", tier: "Bronze", points: 50, email: "dewi@email.com" },
          { id: 3, name: "Siti Maharani", tier: "Silver", points: 220, email: "siti@email.com" },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const stats = [
    { label: "Total Pasien", value: totalPatients.toLocaleString(), icon: <FaUsers />, color: "bg-[#FFF5D9] text-[#FFBB38]", desc: "Pasien terdaftar" },
    { label: "Treatment Aktif", value: totalTreatments.toLocaleString(), icon: <FaHandSparkles />, color: "bg-[#E7EDFF] text-[#396AFF]", desc: "Jenis perawatan" },
    { label: "Total Booking", value: totalBookings.toLocaleString(), icon: <FaCalendarCheck />, color: "bg-[#FFE0EB] text-[#FF82AC]", desc: "Janji temu" },
    { label: "Pendapatan", value: `Rp ${(totalBookings * 350000).toLocaleString()}`, icon: <FaChartLine />, color: "bg-[#DCFAF8] text-[#16DBCC]", desc: "Estimasi omset" },
  ];

  if (loading) return <Loading />;

  const tierData = [
    { label: "Gold", count: goldCount, icon: FaCrown, color: "amber", bg: "bg-amber-50", text: "text-amber-600", bar: "bg-amber-400" },
    { label: "Silver", count: silverCount, icon: FaStar, color: "slate", bg: "bg-slate-50", text: "text-slate-600", bar: "bg-slate-400" },
    { label: "Bronze", count: bronzeCount, icon: FaGem, color: "orange", bg: "bg-orange-50", text: "text-orange-600", bar: "bg-orange-400" },
  ];

  return (
    <div className="space-y-8 font-sans">
      
      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[25px] shadow-sm border border-[#E6EFF5] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${s.color}`}>{s.icon}</div>
              <span className="text-[10px] text-[#B1B1B1] font-medium">{s.desc}</span>
            </div>
            <h3 className="text-2xl font-bold text-[#343C6A]">{s.value}</h3>
            <p className="text-sm text-[#718EBF] font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* ===== CHART ===== */}
        <div className="xl:col-span-2 bg-white p-8 rounded-[30px] shadow-sm border border-[#E6EFF5]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-[#343C6A]">Kunjungan Pasien (7 Hari)</h3>
            <select className="bg-transparent text-sm text-[#718EBF] outline-none font-medium cursor-pointer border border-slate-200 rounded-lg px-3 py-2">
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F3F5" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#718EBF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#718EBF', fontSize: 12}} />
                <Tooltip cursor={{fill: '#F5F7FA'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="patients" radius={[10, 10, 10, 10]} barSize={35}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#1877F2' : '#EDF1F7'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ===== TIER DISTRIBUTION ===== */}
        <div className="bg-white p-8 rounded-[30px] shadow-sm border border-[#E6EFF5]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-[#343C6A]">Distribusi Member</h3>
            <button onClick={() => navigate("/customers")} className="text-[#1877F2] text-sm font-bold hover:underline cursor-pointer flex items-center gap-1">
              Detail <FaArrowRight size={10} />
            </button>
          </div>

          <div className="space-y-5">
            {tierData.map((t) => (
              <div key={t.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`flex items-center gap-2 text-sm font-bold ${t.text}`}>
                    <t.icon size={14} /> {t.label}
                  </span>
                  <span className="text-sm font-bold text-[#343C6A]">{t.count}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className={`h-full ${t.bar} rounded-full transition-all duration-700`} style={{ width: `${totalPatients > 0 ? (t.count / totalPatients) * 100 : 0}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
            <button onClick={() => navigate("/patients/add")} className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]">
              <FaUserPlus /> Daftarkan Pasien Baru
            </button>
          </div>
        </div>

      </div>

      {/* ===== BOTTOM GRID: Queue + Recent Members ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Queue */}
        <div className="bg-white p-8 rounded-[30px] shadow-sm border border-[#E6EFF5]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-[#343C6A]">Antrean Hari Ini</h3>
            <button onClick={() => navigate("/treatments")} className="text-[#1877F2] text-sm font-bold hover:underline cursor-pointer">Lihat Semua</button>
          </div>
          
          {queues.length > 0 ? (
            <div className="space-y-4">
              {queues.map((q) => (
                <div key={q.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm ${q.color}`}>{q.avatar}</div>
                    <div>
                      <p className="font-bold text-[#232323] group-hover:text-[#1877F2] transition-colors">{q.name}</p>
                      <p className="text-xs text-[#718EBF]">{q.treatment} • <span className="text-blue-500 font-bold">{q.time}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-[#B1B1B1] uppercase">{q.doctor}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-[#B1B1B1]">
              <FaCalendarCheck className="text-4xl mx-auto mb-3 opacity-40" />
              <p className="text-sm">Belum ada antrean hari ini</p>
            </div>
          )}
        </div>

        {/* Recent Members */}
        <div className="bg-white p-8 rounded-[30px] shadow-sm border border-[#E6EFF5]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-[#343C6A]">Member Terbaru</h3>
            <button onClick={() => navigate("/customers")} className="text-[#1877F2] text-sm font-bold hover:underline cursor-pointer">
              Lihat Semua
            </button>
          </div>
          
          {recentMembers.length > 0 ? (
            <div className="space-y-4">
              {recentMembers.map((m, i) => (
                <div key={m.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      {(m.name || "U").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-[#232323] group-hover:text-[#1877F2] transition-colors">{m.name || "Member"}</p>
                      <p className="text-xs text-[#718EBF]">{m.email || "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      m.tier === "Gold" ? "bg-amber-50 text-amber-600" :
                      m.tier === "Silver" ? "bg-slate-50 text-slate-600" :
                      "bg-orange-50 text-orange-600"
                    }`}>
                      {m.tier || "Bronze"}
                    </span>
                    <span className="text-xs font-bold text-purple-600 flex items-center gap-1">
                      <FaCoins className="text-amber-500" size={10} /> {m.points || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-[#B1B1B1]">
              <FaUsers className="text-4xl mx-auto mb-3 opacity-40" />
              <p className="text-sm">Belum ada member terdaftar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}