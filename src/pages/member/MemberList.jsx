import React, { useState, useEffect, useRef } from "react"; 
import { Navigate } from "react-router-dom"; 
import { FaCrown, FaSearch, FaUserCheck } from "react-icons/fa";
import MemberCard from "./MemberCard";
import { usersAPI } from "../../services/usersAPI"; 

export default function MemberList() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const userSession = localStorage.getItem("userSession");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    async function fetchMembers() {
      try {
        setLoading(true);
        const data = await usersAPI.getAllUsers?.() || []; 
        const onlyMembers = data.filter(user => user.role === "member");
        setMembers(onlyMembers);
      } catch (error) {
        console.error("Gagal memuat data member:", error.message);
      } finally {
        setLoading(false);
      }
    }

    if (userSession) {
      fetchMembers();
    }
  }, [userSession]);

  if (!userSession) {
    return <Navigate to="/login" replace />;
  }

  const filteredMembers = members.filter((m) =>
    (m.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (m.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Banner Selamat Datang */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <span className="bg-blue-500/30 text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Selamat Datang Kembali
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-3">Halo, Pengguna setia GlowCare!</h1>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Pantau poin loyalitas, tingkat keanggotaan medis, dan dapatkan penawaran perawatan kulit eksklusif langsung dari dasbor pribadi Anda.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 top-0 opacity-10 hidden md:flex items-center pr-8">
          <FaCrown className="text-[12rem]" />
        </div>
      </div>

      {/* Memanggil Komponen Kartu Statistik */}
      <MemberCard total={members.length} />

      {/* Area List Data Anggota */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaUserCheck className="text-blue-600" />
            <h2 className="font-bold text-slate-800">Daftar Akun</h2>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center gap-2 max-w-xs w-full shadow-2xs">
            <FaSearch className="text-slate-400 text-xs" />
            <input 
              ref={inputRef}
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama atau email..." 
              className="bg-transparent text-xs text-slate-700 outline-none w-full placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="p-10 text-center text-sm text-slate-500">Memuat data dari database Supabase...</p>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 text-xs uppercase tracking-wider">
                  <th className="p-4">ID User</th>
                  <th className="p-4">Nama Pasien</th>
                  <th className="p-4">Email Terdaftar</th>
                  <th className="p-4">Hak Akses / Role</th>
                  <th className="p-4">Tanggal Bergabung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 font-mono text-xs font-bold text-blue-600">USR-{m.id}</td>
                    <td className="p-4 font-semibold text-slate-800">{m.name}</td>
                    <td className="p-4 font-medium text-slate-600">{m.email}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200 uppercase">
                        {m.role}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      {new Date(m.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-sm text-slate-400">
                      Tidak ada data member yang cocok dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}