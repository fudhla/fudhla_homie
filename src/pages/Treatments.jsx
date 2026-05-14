import { FaClock, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";

const schedule = [
  { id: 1, time: "10:00", patient: "Rina Aprilia", service: "Laser Rejuvenation", room: "Room 04", status: "On Progress" },
  { id: 2, time: "11:30", patient: "Siti Maharani", service: "Facial Detox", room: "Room 02", status: "Waiting" },
  { id: 3, time: "13:00", patient: "Hendra K.", service: "Botox Injection", room: "Room 01", status: "Waiting" },
];

export default function Treatments() {
  return (
    <div className="p-6 text-[#2D0B1A] font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#2D0B1A]">Jadwal Treatment</h1>
          <p className="text-sm text-[#EC4899] font-medium">Manajemen antrean ruangan dan terapis hari ini</p>
        </div>

        {/* Date Display */}
        <div className="bg-white px-5 py-2.5 rounded-2xl border border-[#EC4899]/10 flex items-center gap-3 shadow-sm">
          <FaCalendarAlt className="text-[#EC4899]" />
          <span className="text-sm font-black text-[#2D0B1A]">14 Mei 2026</span>
        </div>
      </div>

      {/* Schedule List */}
      <div className="space-y-4">
        {schedule.map(t => (
          <div key={t.id} className="bg-white p-5 rounded-[2rem] border border-[#EC4899]/5 flex flex-col md:flex-row items-center justify-between shadow-sm transition-all hover:shadow-md hover:border-[#EC4899]/20 group">
            
            <div className="flex items-center gap-6 w-full">
              {/* Time Slot with Glassmorphism touch */}
              <div className="text-center border-r border-[#FCE7F3] pr-6 min-w-[90px]">
                <p className="text-xl font-black text-[#EC4899] leading-none mb-1">{t.time}</p>
                <p className="text-[10px] text-[#4A1229]/30 font-black uppercase tracking-widest">WIB</p>
              </div>

              {/* Patient Detail */}
              <div>
                <h4 className="font-bold text-lg tracking-tight text-[#2D0B1A] group-hover:text-[#EC4899] transition-colors">
                  {t.patient}
                </h4>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-sm text-[#4A1229]/60 font-medium">{t.service}</span>
                  <span className="text-[9px] font-black text-[#EC4899] bg-[#FDF2F7] px-2 py-0.5 rounded-md border border-[#EC4899]/10 uppercase">
                    {t.room}
                  </span>
                </div>
              </div>
            </div>

            {/* Status & Quick Actions */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-end mt-5 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-[#FCE7F3]">
              
              <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.1em] shadow-sm transition-all ${
                t.status === 'On Progress' 
                  ? 'bg-[#EC4899] text-white shadow-[#EC4899]/20 animate-pulse' 
                  : 'bg-white text-[#4A1229]/40 border border-[#4A1229]/10'
              }`}>
                {t.status}
              </span>

              <button className="w-12 h-12 rounded-2xl bg-[#FDF2F7] flex items-center justify-center hover:bg-[#EC4899] transition-all group/btn border border-[#EC4899]/5 shadow-sm active:scale-95">
                <FaCheckCircle size={20} className="text-[#EC4899] group-hover/btn:text-white transition-colors" />
              </button>
            </div>

          </div>
        ))}
      </div>
      
      {/* Aesthetic Footer */}
      <div className="mt-12 flex items-center justify-center gap-4 opacity-20">
        <div className="h-[1px] w-12 bg-[#4A1229]" />
        <p className="text-[10px] font-black text-[#4A1229] uppercase tracking-[0.4em]">
          Glow Care Clinic
        </p>
        <div className="h-[1px] w-12 bg-[#4A1229]" />
      </div>
    </div>
  );
}