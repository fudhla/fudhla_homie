import { FaUsers, FaHandSparkles, FaCalendarCheck, FaChartLine, FaEllipsisV } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Data Mock untuk Grafik Kunjungan
const chartData = [
  { day: 'Sat', patients: 24 },
  { day: 'Sun', patients: 15 },
  { day: 'Mon', patients: 35 },
  { day: 'Tue', patients: 45 },
  { day: 'Wed', patients: 30 },
  { day: 'Thu', patients: 50 },
  { day: 'Fri', patients: 40 },
];

export default function Dashboard() {
  const stats = [
    { label: "Total Pasien", value: "1,284", icon: <FaUsers />, color: "bg-[#FFF5D9] text-[#FFBB38]" },
    { label: "Treatment", value: "42", icon: <FaHandSparkles />, color: "bg-[#E7EDFF] text-[#396AFF]" },
    { label: "Appointment", value: "15", icon: <FaCalendarCheck />, color: "bg-[#FFE0EB] text-[#FF82AC]" },
    { label: "Revenue", value: "Rp 8.2M", icon: <FaChartLine />, color: "bg-[#DCFAF8] text-[#16DBCC]" },
  ];

  const queues = [
    { id: 1, name: "Alya Putri", treatment: "Facial Gold", time: "09:00", doctor: "dr. Sarah", avatar: "AP", color: "bg-blue-100 text-blue-600" },
    { id: 2, name: "Budi Santoso", treatment: "Laser Glow", time: "10:30", doctor: "dr. Reza", avatar: "BS", color: "bg-green-100 text-green-600" },
    { id: 3, name: "Indah Permata", treatment: "Chemical Peel", time: "11:15", doctor: "dr. Sarah", avatar: "IP", color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="space-y-8 font-sans">
      
      {/* 1. Header Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[25px] flex items-center gap-5 shadow-sm border border-[#E6EFF5] hover:shadow-md transition-shadow">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${s.color}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-sm text-[#718EBF] font-semibold">{s.label}</p>
              <h3 className="text-2xl font-bold text-[#232323]">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. Klinik Activity Chart (Weekly Patients) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[30px] shadow-sm border border-[#E6EFF5]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-[#343C6A]">Statistik Kunjungan Pasien</h3>
            <select className="bg-transparent text-sm text-[#718EBF] outline-none font-medium cursor-pointer">
              <option>7 Hari Terakhir</option>
              <option>30 Hari Terakhir</option>
            </select>
          </div>
          
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F3F5" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#718EBF', fontSize: 12}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#718EBF', fontSize: 12}}
                />
                <Tooltip 
                  cursor={{fill: '#F5F7FA'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="patients" radius={[10, 10, 10, 10]} barSize={30}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#1877F2' : '#EDF1F7'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Real-time Queue (Antrean Hari Ini) */}
        <div className="bg-white p-8 rounded-[30px] shadow-sm border border-[#E6EFF5]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-[#343C6A]">Antrean Hari Ini</h3>
            <button className="text-[#1877F2] text-sm font-bold hover:underline">Lihat Semua</button>
          </div>
          
          <div className="space-y-6">
            {queues.map((q) => (
              <div key={q.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm ${q.color}`}>
                    {q.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-[#232323] group-hover:text-[#1877F2] transition-colors">{q.name}</p>
                    <p className="text-xs text-[#718EBF] font-medium">{q.treatment} • <span className="text-blue-500">{q.time}</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-[#B1B1B1] uppercase">{q.doctor}</p>
                  <button className="p-1 text-gray-300 hover:text-gray-600">
                    <FaEllipsisV size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Banner Promo / Note Medis (Hiasan tambahan) */}
          <div className="mt-10 p-5 bg-gradient-to-br from-[#1877F2] to-[#396AFF] rounded-[25px] text-white relative overflow-hidden">
             <div className="relative z-10">
               <p className="text-[10px] font-bold uppercase opacity-80 mb-1">Tips Hari Ini</p>
               <p className="text-xs leading-relaxed">Jangan lupa ingatkan pasien Laser untuk menggunakan sunscreen!</p>
             </div>
             <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>

      </div>
    </div>
  );
}