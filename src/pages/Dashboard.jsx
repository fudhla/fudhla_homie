import { FaUsers, FaMagic, FaCalendarCheck, FaChartLine, FaCircle } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const chartData = [
  { name: "Jan", Facial: 42, Acne: 35, Laser: 12 },
  { name: "Feb", Facial: 38, Acne: 30, Laser: 10 },
  { name: "Mar", Facial: 55, Acne: 40, Laser: 15 },
  { name: "Apr", Facial: 48, Acne: 45, Laser: 12 },
];

export default function Dashboard() {
  return (
    /* Latar Belakang Utama: Putih Bersih dengan sedikit rona Pink sangat halus */
    <div className="p-6 bg-[#FDF2F7] min-h-screen text-[#4A1229] font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#2D0B1A]">Dashboard Glow Care</h1>
          <p className="text-sm text-[#EC4899] font-medium">Monitoring aktivitas harian klinik kecantikan</p>
        </div>
        {/* Tombol Utama: Hot Pink */}
        <button className="bg-[#EC4899] hover:bg-[#D13D81] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#EC4899]/30 transition-all active:scale-95">
          + Booking Baru
        </button>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { l: "Total Pasien", v: "1,284", i: <FaUsers />, c: "text-[#EC4899]" },
          { l: "Treatment Selesai", v: "42", i: <FaMagic />, c: "text-[#FB7185]" },
          { l: "Appointment", v: "15", i: <FaCalendarCheck />, c: "text-[#F472B6]" },
          { l: "Omzet (Hari ini)", v: "8.2M", i: <FaChartLine />, c: "text-[#EC4899]" },
        ].map((s, idx) => (
          /* Card: Putih dengan border pink halus */
          <div key={idx} className="bg-white p-6 rounded-2xl border border-[#EC4899]/10 shadow-sm hover:shadow-md transition-shadow">
            <div className={`text-xl mb-4 ${s.c}`}>{s.i}</div>
            <p className="text-[10px] text-[#2D0B1A]/50 uppercase font-bold tracking-[0.15em]">{s.l}</p>
            <h3 className="text-2xl font-black mt-1 tracking-tight text-[#2D0B1A]">{s.v}</h3>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#EC4899]/10 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-[#2D0B1A]">Analisis Treatment Terpopuler</h3>
            <div className="flex gap-4 text-[10px] font-bold text-[#EC4899]">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#EC4899]"/> FACIAL</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#FB7185]"/> ACNE</div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                {/* Grid Lines: Warna Pink Pucat */}
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#FCE7F3" />
                <XAxis 
                  dataKey="name" 
                  stroke="#4A1229" 
                  fontSize={11} 
                  axisLine={false} 
                  tickLine={false} 
                  dy={10} 
                />
                <YAxis 
                  stroke="#4A1229" 
                  fontSize={11} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                  cursor={{fill: '#FDF2F7'}} 
                  contentStyle={{backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #EC4899', fontSize: '12px', color: '#4A1229'}} 
                />
                <Bar dataKey="Facial" fill="#EC4899" radius={[6, 6, 0, 0]} barSize={30} />
                <Bar dataKey="Acne" fill="#FB7185" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Right: Activity Log */}
        <div className="bg-white p-6 rounded-3xl border border-[#EC4899]/10 shadow-sm">
          <h3 className="font-black mb-5 text-sm uppercase tracking-widest text-[#EC4899]">Antrean Berjalan</h3>
          <div className="space-y-4">
            {[
              { n: "Alya", t: "Facial Gold", s: "Proses" },
              { n: "Rina", t: "Acne Injection", s: "Proses" },
              { n: "Siti", t: "Laser Rejuvenation", s: "Menunggu" }
            ].map((x, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#FDF2F7] rounded-2xl border border-[#EC4899]/5 hover:bg-[#FCE7F3] transition-colors">
                <div>
                  <p className="text-xs font-bold text-[#2D0B1A] mb-0.5">{x.n}</p>
                  <p className="text-[10px] text-[#EC4899] font-medium">{x.t}</p>
                </div>
                <div className="flex items-center gap-2">
                   <span className={`text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-tighter ${
                    x.s === 'Proses' ? 'bg-[#EC4899] text-white' : 'bg-white text-[#EC4899] border border-[#EC4899]'
                  }`}>
                    {x.s}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl border border-dashed border-[#EC4899]/30 text-[#EC4899] text-[10px] font-black uppercase tracking-widest hover:bg-[#EC4899] hover:text-white transition-all">
            Lihat Semua Jadwal
          </button>
        </div>
      </div>
    </div>
  );
}