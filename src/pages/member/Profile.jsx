import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaCrown, FaCoins, FaGem, FaStar, FaEdit, FaSpinner, FaPhone, FaMapMarkerAlt, FaSave, FaTimes, FaShieldAlt, FaLock, FaCheckCircle, FaFlask, FaPrescriptionBottleAlt } from "react-icons/fa";
import { usersAPI } from "../../services/usersAPI";

export default function Profile() {
  const stored = localStorage.getItem("userSession");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", phone: "", address: "", skinType: "", allergies: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: "", newpass: "", confirm: "" });
  const [passMsg, setPassMsg] = useState("");

  useEffect(() => {
    if (!stored) { setLoading(false); return; }
    try {
      const parsed = JSON.parse(stored);
      usersAPI.getUserByEmail(parsed.email).then(data => {
        if (data && data.length > 0) {
          const latest = data[0];
          setSession({ ...parsed, tier: latest.tier || parsed.tier, points: latest.points ?? parsed.points, name: latest.name || parsed.name, phone: latest.phone || "", address: latest.address || "", skin_type: latest.skin_type || "", allergies: latest.allergies || "" });
          localStorage.setItem("userSession", JSON.stringify({ ...parsed, tier: latest.tier || parsed.tier, points: latest.points ?? parsed.points }));
        } else { setSession(parsed); }
      }).catch(() => { setSession(parsed); }).finally(() => setLoading(false));
    } catch { setLoading(false); }
  }, [stored]);

  if (!stored) return <Navigate to="/login" replace />;
  if (loading) return <div className="flex justify-center py-20"><FaSpinner className="animate-spin text-blue-600 text-3xl" /></div>;
  if (!session) return null;

  const tierConfig = {
    Gold: { icon: FaCrown, color: "from-amber-400 to-yellow-600", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-300" },
    Silver: { icon: FaStar, color: "from-slate-400 to-slate-600", bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-300" },
    Bronze: { icon: FaGem, color: "from-orange-400 to-amber-700", bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-300" },
  };
  const tier = tierConfig[session.tier] || tierConfig.Bronze;
  const TierIcon = tier.icon;

  const toggleEdit = () => {
    if (!editing) {
      setEditForm({ name: session.name || "", phone: session.phone || "", address: session.address || "", skinType: session.skin_type || "", allergies: session.allergies || "" });
    }
    setEditing(!editing);
    setSaved(false);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setTimeout(() => {
      setSession({ ...session, name: editForm.name, phone: editForm.phone, address: editForm.address, skin_type: editForm.skinType, allergies: editForm.allergies });
      const updated = { ...JSON.parse(stored), name: editForm.name, phone: editForm.phone, address: editForm.address, skin_type: editForm.skinType, allergies: editForm.allergies };
      localStorage.setItem("userSession", JSON.stringify(updated));
      setSaving(false);
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  const handlePasswordSubmit = () => {
    setPassMsg("");
    if (!passwordForm.current || !passwordForm.newpass || !passwordForm.confirm) {
      setPassMsg("Semua field password harus diisi.");
      return;
    }
    if (passwordForm.newpass.length < 6) {
      setPassMsg("Password baru minimal 6 karakter.");
      return;
    }
    if (passwordForm.newpass !== passwordForm.confirm) {
      setPassMsg("Password baru dan konfirmasi tidak cocok.");
      return;
    }
    setPassMsg("✅ Password berhasil diperbarui! (simulasi)");
    setPasswordForm({ current: "", newpass: "", confirm: "" });
    setTimeout(() => setPassMsg(""), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 font-sans">
      <div className="bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-6xl border border-white/10 shrink-0"><FaUserCircle /></div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-extrabold">{session.name || "Pasien GlowCare"}</h1>
              <span className={"px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 " + tier.bg + " " + tier.text + " border " + tier.border}><TierIcon size={12} /> {session.tier || "Bronze"}</span>
            </div>
            <p className="text-slate-300 text-sm flex items-center gap-2 mt-1"><FaEnvelope size={12} /> {session.email}</p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2"><FaCalendarAlt size={10} /> Bergabung sejak {session.created_at ? new Date(session.created_at).toLocaleDateString("id-ID", { year: "numeric", month: "long" }) : "2026"}</p>
          </div>
          <button onClick={toggleEdit} className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl text-sm font-bold hover:bg-white/20 transition-all cursor-pointer flex items-center gap-2 border border-white/10"><FaEdit size={12} /> Edit Profil</button>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-700 font-bold text-sm flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> Profil berhasil diperbarui!</div>
      )}

      {editing ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <h3 className="font-bold text-slate-900 flex items-center gap-2"><FaEdit className="text-blue-500" /> Edit Profil</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Nama Lengkap</label><input type="text" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20" /></div>
            <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">No. Telepon</label><input type="text" value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20" /></div>
            <div className="md:col-span-2"><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Alamat</label><input type="text" value={editForm.address} onChange={e => setEditForm({ ...editForm, address: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20" /></div>
            <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Tipe Kulit</label><input type="text" value={editForm.skinType} onChange={e => setEditForm({ ...editForm, skinType: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20" /></div>
            <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Alergi (jika ada)</label><input type="text" value={editForm.allergies} onChange={e => setEditForm({ ...editForm, allergies: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20" /></div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button onClick={handleSaveProfile} disabled={saving} className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2">{saving ? <><FaSpinner className="animate-spin" /> Menyimpan...</> : <><FaSave size={12} /> Simpan Perubahan</>}</button>
            <button onClick={toggleEdit} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-2"><FaTimes size={12} /> Batal</button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className={"border rounded-2xl p-6 " + tier.bg + " " + tier.border}>
              <div className="flex items-center gap-3"><TierIcon className={"text-3xl " + tier.text} /><div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Status Member</p><h3 className={"text-xl font-black " + tier.text}>{session.tier || "Bronze"}</h3></div></div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-center gap-3"><FaCoins className="text-3xl text-amber-600" /><div><p className="text-xs text-amber-700 font-bold uppercase tracking-wider">GlowPoints</p><h3 className="text-xl font-black text-amber-700">{(session.points || 0).toLocaleString()} Pts</h3></div></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50"><h3 className="font-bold text-slate-800 flex items-center gap-2"><FaShieldAlt className="text-blue-500" /> Informasi Akun</h3></div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
              <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</p><p className="font-semibold text-slate-800 mt-1 flex items-center gap-1"><FaEnvelope size={12} className="text-slate-400" /> {session.email}</p></div>
              <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Telepon</p><p className="font-semibold text-slate-800 mt-1 flex items-center gap-1"><FaPhone size={12} className="text-slate-400" /> {session.phone || "Belum diisi"}</p></div>
              <div className="md:col-span-2"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alamat</p><p className="font-semibold text-slate-800 mt-1 flex items-center gap-1"><FaMapMarkerAlt size={12} className="text-slate-400" /> {session.address || "Belum diisi"}</p></div>
              <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tipe Kulit</p><p className="font-semibold text-slate-800 mt-1 flex items-center gap-1"><FaFlask size={12} className="text-slate-400" /> {session.skin_type || "Belum diisi"}</p></div>
              <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alergi</p><p className="font-semibold text-slate-800 mt-1 flex items-center gap-1"><FaPrescriptionBottleAlt size={12} className="text-slate-400" /> {session.allergies || "Tidak ada"}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><FaLock className="text-rose-500" /> Keamanan Akun</h3>
              <button onClick={() => setShowPassword(!showPassword)} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">{showPassword ? "Tutup" : "Ganti Password"}</button>
            </div>
            {showPassword && (
              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-400">Masukkan kata sandi baru untuk akun Anda.</p>
                {passMsg && (
                  <div className={"text-sm font-bold px-4 py-2 rounded-xl " + (passMsg.includes("✅") ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600")}>{passMsg}</div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Password Lama</label><input type="password" value={passwordForm.current} onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none" /></div>
                  <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Password Baru</label><input type="password" value={passwordForm.newpass} onChange={e => setPasswordForm({ ...passwordForm, newpass: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none" /></div>
                  <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Konfirmasi</label><input type="password" value={passwordForm.confirm} onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none" /></div>
                </div>
                <button onClick={handlePasswordSubmit} className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"><FaSave size={12} /> Update Password</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
