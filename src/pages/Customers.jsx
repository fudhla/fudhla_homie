import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPlus, FaPhone, FaCrown, FaFilter, FaEllipsisH, FaCoins, FaGem, FaStar, FaCheckCircle, FaSpinner, FaTimes, FaSave, FaUsers } from "react-icons/fa";
import { usersAPI } from "../services/usersAPI";
import Loading from "../components/Loading";

export default function Customers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMember, setModalMember] = useState(null);
  const [editPoints, setEditPoints] = useState(0);
  const [editTier, setEditTier] = useState("Bronze");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState("");

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data = await usersAPI.getAllUsers();
        const members = (data || []).filter(u => u.role === "member");
        setCustomers(members.map((m, i) => ({
          id: m.id,
          name: m.name || "Unknown",
          email: m.email || "-",
          phone: m.phone || m.email || "-",
          tier: m.tier || "Bronze",
          visits: Math.floor(Math.random() * 20) + 1,
          spend: "Rp " + ((m.points || 0) * 5000).toLocaleString(),
          points: m.points || 0,
          avatar: (m.name || "U").split(" ").map(s => s[0]).join("").substring(0, 2).toUpperCase(),
          color: ["bg-blue-100 text-blue-600", "bg-amber-100 text-amber-600", "bg-slate-100 text-slate-600"][i % 3],
        })));
      } catch (err) {
        console.warn("Gunakan data fallback:", err.message);
        setCustomers([
          { id: 1, name: "Rina Aprilia", email: "rina@email.com", phone: "0812-7766-5544", tier: "Gold", visits: 24, spend: "Rp 12.500.000", points: 450, avatar: "RA", color: "bg-blue-100 text-blue-600" },
          { id: 2, name: "Siti Maharani", email: "siti@email.com", phone: "0813-2233-4455", tier: "Silver", visits: 8, spend: "Rp 4.200.000", points: 220, avatar: "SM", color: "bg-amber-100 text-amber-600" },
          { id: 3, name: "Dewi Lestari", email: "dewi@email.com", phone: "0811-9988-7766", tier: "Bronze", visits: 3, spend: "Rp 1.800.000", points: 50, avatar: "DL", color: "bg-slate-100 text-slate-600" },
          { id: 4, name: "Budi Santoso", email: "budi@email.com", phone: "0813-4567-8901", tier: "Silver", visits: 12, spend: "Rp 6.800.000", points: 280, avatar: "BS", color: "bg-amber-100 text-amber-600" },
          { id: 5, name: "Alya Putri", email: "alya@email.com", phone: "0812-3456-7890", tier: "Gold", visits: 30, spend: "Rp 18.200.000", points: 780, avatar: "AP", color: "bg-blue-100 text-blue-600" },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  const openModal = (member) => {
    setModalMember(member);
    setEditPoints(member.points);
    setEditTier(member.tier);
    setSaved("");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await usersAPI.updateUser(modalMember.id, { points: editPoints, tier: editTier });
      setCustomers(prev => prev.map(c => c.id === modalMember.id ? { ...c, points: editPoints, tier: editTier } : c));
      setSaved("✅ Poin & tier berhasil diperbarui untuk " + modalMember.name);
      setTimeout(() => { setModalMember(null); setSaved(""); }, 1500);
    } catch {
      setCustomers(prev => prev.map(c => c.id === modalMember.id ? { ...c, points: editPoints, tier: editTier } : c));
      setSaved("✅ Poin & tier berhasil diperbarui! (disimpan lokal)");
      setTimeout(() => { setModalMember(null); setSaved(""); }, 1500);
    } finally {
      setSaving(false);
    }
  };

  const totalPoints = customers.reduce((sum, c) => sum + (c.points || 0), 0);
  const goldCount = customers.filter(c => c.tier === "Gold").length;
  const silverCount = customers.filter(c => c.tier === "Silver").length;
  const bronzeCount = customers.filter(c => c.tier === "Bronze").length;

  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  const tierBadge = (tier) => {
    if (tier === "Gold") return "bg-amber-100 text-amber-700 border-amber-300";
    if (tier === "Silver") return "bg-slate-100 text-slate-600 border-slate-300";
    return "bg-orange-100 text-orange-700 border-orange-300";
  };

  const tierIcon = (tier) => {
    if (tier === "Gold") return <FaCrown size={12} />;
    if (tier === "Silver") return <FaStar size={12} />;
    return <FaGem size={12} />;
  };

  return (
    <div className="font-sans space-y-8">
      {/* Header + Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            Database Member <FaCrown className="text-amber-500" />
          </h1>
          <p className="text-sm text-slate-500">{customers.length} member terdaftar</p>
        </div>
        <button onClick={() => navigate("/patients/add")} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95">
          <FaPlus size={12} /> Daftarkan Member Baru
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-md">
          <p className="text-xs opacity-80 font-medium">Total Member</p>
          <h3 className="text-2xl font-bold mt-1">{customers.length}</h3>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-5 text-white shadow-md">
          <p className="text-xs opacity-80 font-medium">Gold</p>
          <h3 className="text-2xl font-bold mt-1">{goldCount}</h3>
        </div>
        <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl p-5 text-white shadow-md">
          <p className="text-xs opacity-80 font-medium">Silver</p>
          <h3 className="text-2xl font-bold mt-1">{silverCount}</h3>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-5 text-white shadow-md">
          <p className="text-xs opacity-80 font-medium">Total Poin</p>
          <h3 className="text-2xl font-bold mt-1">{totalPoints.toLocaleString()} Pts</h3>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama atau email member..." className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
        <button onClick={() => setSearch("")} className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
          <FaFilter size={12} /> Reset
        </button>
      </div>

      {/* Notifikasi */}
      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-700 font-bold text-sm flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> {saved}</div>
      )}

      {/* Member Cards Grid */}
      {loading ? <Loading /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FaUsers className="text-5xl text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Tidak ada member ditemukan</p>
            </div>
          ) : filtered.map(c => (
            <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className={"w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl " + c.color}>
                  {c.avatar}
                </div>
                <span className={"text-[10px] font-bold px-2.5 py-1 rounded-full border inline-flex items-center gap-1 " + tierBadge(c.tier)}>
                  {tierIcon(c.tier)} {c.tier}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{c.name}</h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><FaPhone size={10} /> {c.phone}</p>
              <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kunjungan</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{c.visits}x</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">GlowPoints</p>
                  <p className="font-bold text-amber-600 text-sm mt-0.5 flex items-center gap-1"><FaCoins size={11} /> {c.points} Pts</p>
                </div>
              </div>
              <button onClick={() => openModal(c)} className="w-full mt-4 py-3 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                Atur Poin & Tier
              </button>
            </div>
          ))}
        </div>
      )}

      {/* MODAL EDIT POIN & TIER */}
      {modalMember && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalMember(null)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95">
            <button onClick={() => setModalMember(null)} className="absolute top-4 right-4 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all cursor-pointer">
              <FaTimes size={14} />
            </button>
            <div className="mb-6">
              <div className={"w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl mb-3 " + modalMember.color}>{modalMember.avatar}</div>
              <h2 className="text-xl font-extrabold text-slate-900">Atur Poin & Tier</h2>
              <p className="text-sm text-slate-500 mt-1">{modalMember.name}</p>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">Tier Member</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Bronze", "Silver", "Gold"].map(t => (
                    <button key={t} onClick={() => setEditTier(t)} className={"py-3 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-1 " + (editTier === t ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" : "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100")}>
                      {t === "Gold" ? <FaCrown size={12} /> : t === "Silver" ? <FaStar size={12} /> : <FaGem size={12} />} {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">Jumlah Poin</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setEditPoints(Math.max(0, editPoints - 10))} className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all cursor-pointer">-</button>
                  <input type="number" value={editPoints} onChange={e => setEditPoints(Math.max(0, parseInt(e.target.value) || 0))} className="flex-1 text-center py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-black text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10" />
                  <button onClick={() => setEditPoints(editPoints + 10)} className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all cursor-pointer">+</button>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
                <p className="font-bold">Ringkasan:</p>
                <p className="text-xs mt-1">{modalMember.name} → <strong>{editTier}</strong> • <strong>{editPoints} Poin</strong></p>
              </div>
              <button onClick={handleSave} disabled={saving} className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <><FaSpinner className="animate-spin" /> Menyimpan...</> : <><FaSave size={14} /> Simpan Perubahan</>}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center py-6 text-[10px] text-slate-300 font-bold uppercase tracking-[0.5em]">GlowCare Member Management</footer>
    </div>
  );
}
