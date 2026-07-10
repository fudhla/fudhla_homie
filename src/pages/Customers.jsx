import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPlus, FaPhone, FaCrown, FaFilter, FaEllipsisH, FaCoins } from "react-icons/fa";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { usersAPI } from "../services/usersAPI";
import Loading from "../components/Loading";

export default function Customers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data = await usersAPI.getAllUsers();
        const members = (data || []).filter(u => u.role === "member");
        setCustomers(members.map((m, i) => ({
          id: m.id,
          name: m.name || "Unknown",
          phone: m.email || "-",
          type: m.tier || "Bronze",
          visits: Math.floor(Math.random() * 20) + 1,
          spend: ((m.points || 0) * 5000).toLocaleString(),
          points: m.points || 0,
          avatar: (m.name || "U").split(" ").map(s => s[0]).join("").substring(0, 2).toUpperCase(),
          color: ["bg-[#E0F2FE] text-[#0369A1]", "bg-[#FEF3C7] text-[#D97706]", "bg-[#F1F5F9] text-[#475569]"][i % 3],
        })));
      } catch (err) {
        console.warn("Gunakan data fallback:", err.message);
        setCustomers([
          { id: 1, name: "Rina Aprilia", phone: "0812-7766-5544", type: "Gold", visits: 24, spend: "12.5M", points: 450, avatar: "RA", color: "bg-[#E0F2FE] text-[#0369A1]" },
          { id: 2, name: "Siti Maharani", phone: "0813-2233-4455", type: "Silver", visits: 8, spend: "4.2M", points: 220, avatar: "SM", color: "bg-[#FEF3C7] text-[#D97706]" },
          { id: 3, name: "Dewi Lestari", phone: "0811-9988-7766", type: "Bronze", visits: 3, spend: "1.8M", points: 50, avatar: "DL", color: "bg-[#F1F5F9] text-[#475569]" },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  return (
    <div className="p-8 bg-[#F0F9FF] min-h-screen font-sans text-[#0F172A]">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 relative z-50">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] flex items-center gap-3">
            Database Member <FaCrown className="text-[#D97706] text-xl animate-bounce"/>
          </h1>
          <p className="text-[#0284C7] font-medium mt-1">Sistem Manajemen Loyalitas Pasien GlowCare</p>
        </div>
        
        {/* Tombol yang sudah diperbaiki menggunakan HTML bawaan & z-index aman */}
        <button 
          onClick={() => navigate("/patients/add")}
          className="px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 bg-[#06B6D4] text-white hover:bg-[#0891B2] transition-all shadow-md shadow-cyan-500/20 cursor-pointer active:scale-95"
        >
          <FaPlus size={12}/> Daftarkan Member Baru
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1 max-w-xl">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0284C7]/40" />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            type="text" 
            placeholder="Cari nama member..." 
            className="w-full pl-14 pr-6 py-4 rounded-full bg-white border-none shadow-sm focus:ring-2 focus:ring-[#0284C7]/20 text-[#0F172A] placeholder:text-[#0F172A]/30 transition-all" 
          />
        </div>
        
        <button 
          onClick={() => setSearch("")}
          className="flex items-center gap-2 px-6 py-4 rounded-full bg-white text-[#0F172A]/60 text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <FaFilter size={12} /> Reset Filter
        </button>
      </div>

      {loading ? <Loading /> : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
          <Card key={c.id} className="p-8 rounded-[2.5rem] hover:shadow-2xl hover:shadow-blue-500/10 duration-500 group relative overflow-hidden border-transparent hover:border-[#0284C7]/10">
            
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#F0F9FF] rounded-full group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl ${c.color} ring-4 ring-white shadow-md`}>
                  {c.avatar}
                </div>
                
                <div className="flex flex-col items-end gap-2">
                   <button className="text-[#0F172A]/20 hover:text-[#0284C7] transition-colors cursor-pointer">
                      <FaEllipsisH />
                   </button>
                   <Badge variant={c.type.toLowerCase()}>
                    {c.type}
                  </Badge>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors mb-2">
                {c.name}
              </h3>
              <p className="text-sm text-[#0F172A]/40 font-medium flex items-center gap-2 mb-8">
                <FaPhone size={12} className="text-[#0284C7]/40"/> {c.phone}
              </p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-[#F0F9FF] pt-6">
                <div>
                  <p className="text-[10px] text-[#0F172A]/30 font-bold uppercase tracking-[0.1em] mb-1">Total Visit</p>
                  <p className="font-bold text-[#0F172A]">{c.visits} Kunjungan</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#0F172A]/30 font-bold uppercase tracking-[0.1em] mb-1">GlowPoints</p>
                  <p className="font-bold text-[#0284C7] flex items-center gap-1"><FaCoins className="text-amber-500" size={12} /> {c.points} Pts</p>
                </div>
              </div>
              
              <button 
                onClick={() => navigate(`/patients/add`)}
                className="w-full mt-8 py-4 rounded-2xl bg-[#F0F9FF] text-[#0284C7] text-xs font-bold uppercase tracking-widest hover:bg-[#0284C7] hover:text-white transition-all transform group-hover:translate-y-[-4px] cursor-pointer"
              >
                Atur Poin & Tier
              </button>
            </div>
          </Card>
        ))}
      </div>
      )}

      {/* Footer Branding */}
      <div className="mt-20 flex flex-col items-center opacity-20">
        <div className="h-[1px] w-24 bg-[#0F172A] mb-4"></div>
        <p className="text-[10px] font-black text-[#0F172A] uppercase tracking-[0.5em]">
          GlowCare Clinic Management
        </p>
      </div>
    </div>
  );
}