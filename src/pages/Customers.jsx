import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPlus, FaPhone, FaCrown, FaStar } from "react-icons/fa";

const customersData = [
  { id: 1, name: "Rina Aprilia", phone: "0812-7766-5544", type: "Platinum", visits: 24, spend: "12.5M", avatar: "RA", avatarBg: "bg-amber-100 text-amber-600 border-amber-200" },
  { id: 2, name: "Siti Maharani", phone: "0813-2233-4455", type: "Gold", visits: 8, spend: "4.2M", avatar: "SM", avatarBg: "bg-yellow-50 text-yellow-600 border-yellow-200" },
  { id: 3, name: "Dewi Lestari", phone: "0811-9988-7766", type: "Silver", visits: 3, spend: "1.8M", avatar: "DL", avatarBg: "bg-slate-100 text-slate-500 border-slate-200" },
];

export default function Customers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    /* Container Transparan - Tanpa BG Utama */
    <div className="p-6 text-[#2D0B1A] font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2 tracking-tight text-[#2D0B1A]">
              Database Member <FaCrown className="text-amber-500 text-sm"/>
          </h1>
          <p className="text-sm text-[#EC4899] font-medium">Manajemen loyalitas dan profil belanja klien</p>
        </div>
        
        <button 
          onClick={() => navigate("/patients/add")} 
          className="bg-[#EC4899] px-6 py-3 rounded-2xl font-bold text-sm text-white flex items-center gap-2 hover:bg-[#D13D81] transition-all shadow-lg shadow-[#EC4899]/20 active:scale-95"
        >
          <FaPlus size={12}/> Member Baru
        </button>
      </div>

      {/* Search Input: Clean White Style */}
      <div className="relative max-w-md mb-8">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EC4899]/40 text-sm" />
        <input 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          type="text" 
          placeholder="Cari nama member..." 
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-[#EC4899]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#EC4899]/10 text-[#2D0B1A] placeholder:text-[#2D0B1A]/20 shadow-sm" 
        />
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {customersData.map(c => (
          /* Card: White Background */
          <div key={c.id} className="bg-white p-6 rounded-[2rem] border border-[#EC4899]/5 hover:border-[#EC4899]/20 transition-all group shadow-sm hover:shadow-xl">
            <div className="flex justify-between items-start mb-6">
              {/* Avatar Box */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg border ${c.avatarBg} shadow-sm`}>
                {c.avatar}
              </div>
              
              {/* Badge Member Type */}
              <span className={`text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest border ${
                c.type === 'Platinum' ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-200' : 'bg-[#FDF2F7] text-[#EC4899] border-[#EC4899]/10'
              }`}>
                {c.type}
              </span>
            </div>

            <h3 className="text-xl font-black mb-1 tracking-tight text-[#2D0B1A] group-hover:text-[#EC4899] transition-colors">
              {c.name}
            </h3>
            <p className="text-xs text-[#4A1229]/50 font-bold flex items-center gap-2 mb-8">
              <FaPhone size={10} className="text-[#EC4899]"/> {c.phone}
            </p>
            
            <div className="grid grid-cols-2 gap-4 border-t border-[#FDF2F7] pt-5">
              <div>
                <p className="text-[10px] text-[#4A1229]/30 font-black uppercase tracking-widest mb-1">Kunjungan</p>
                <p className="font-black text-[#2D0B1A] text-sm">{c.visits} Kali</p>
              </div>
              <div>
                <p className="text-[10px] text-[#4A1229]/30 font-black uppercase tracking-widest mb-1">Revenue</p>
                <p className="font-black text-[#EC4899] text-sm">{c.spend}</p>
              </div>
            </div>
            
            {/* View Profile Button (Hidden until hover) */}
            <button className="w-full mt-6 py-2.5 rounded-xl border border-[#EC4899]/20 text-[#EC4899] text-[10px] font-black uppercase tracking-widest hover:bg-[#EC4899] hover:text-white transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
              Lihat Detail Profil
            </button>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-[10px] font-black text-[#4A1229]/20 uppercase tracking-[0.4em]">
        Glow Care Loyalty Program
      </p>
    </div>
  );
}