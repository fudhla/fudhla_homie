import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaClock, FaSearch, FaCheckCircle, FaSpinner, FaTimes, FaWallet, FaFilter } from "react-icons/fa";
import { bookingsAPI } from "../../services/bookingsAPI";
import Loading from "../../components/Loading";

const statusList = ["Menunggu Pembayaran", "Dikonfirmasi", "On Progress", "Selesai", "Dibatalkan"];

const statusColors = {
  "Menunggu Pembayaran": "bg-amber-50 text-amber-600 border-amber-200",
  "Dikonfirmasi": "bg-blue-50 text-blue-600 border-blue-200",
  "On Progress": "bg-purple-50 text-purple-600 border-purple-200",
  "Selesai": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "Dibatalkan": "bg-rose-50 text-rose-600 border-rose-200",
};

export default function AdminBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookings = async () => {
    try {
      const data = await bookingsAPI.fetchAll();
      if (data && data.length > 0) {
        setBookings(data);
      } else {
        setBookings([
          { id: 1, user_id: 1, user_name: "Alya Putri", treatment_name: "Facial Deep Cleansing", booking_date: "2026-07-17", booking_time: "09:00", status: "Dikonfirmasi", payment_method: "Tunai", payment_status: "Lunas" },
          { id: 2, user_id: 2, user_name: "Budi Santoso", treatment_name: "Laser Brightening", booking_date: "2026-07-17", booking_time: "10:30", status: "On Progress", payment_method: "Kartu Debit", payment_status: "Lunas" },
          { id: 3, user_id: 3, user_name: "Indah Permata", treatment_name: "Anti-Aging Silk Peel", booking_date: "2026-07-17", booking_time: "13:00", status: "Menunggu Pembayaran", payment_method: null, payment_status: "Belum Dibayar" },
          { id: 4, user_id: 4, user_name: "Siti Maharani", treatment_name: "Facial Deep Cleansing", booking_date: "2026-07-18", booking_time: "14:00", status: "Dikonfirmasi", payment_method: "E-Wallet", payment_status: "Lunas" },
          { id: 5, user_id: 5, user_name: "Dewi Lestari", treatment_name: "Chemical Peel", booking_date: "2026-07-16", booking_time: "11:00", status: "Selesai", payment_method: "Transfer Bank", payment_status: "Lunas" },
        ]);
      }
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      if (newStatus === "Selesai") {
        await bookingsAPI.completeBooking(id);
      } else {
        await bookingsAPI.updateStatus(id, newStatus);
      }
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } catch {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = bookings.filter(b => {
    const ms = (b.user_name || "").toLowerCase().includes(search.toLowerCase()) || (b.treatment_name || "").toLowerCase().includes(search.toLowerCase());
    const mf = filterStatus === "all" || b.status === filterStatus;
    return ms && mf;
  });

  if (loading) return <Loading />;

  const pendingCount = bookings.filter(b => b.status === "Menunggu Pembayaran" || b.status === "Menunggu").length;

  return (
    <div className="font-sans space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <FaCalendarAlt className="text-blue-600" /> Manajemen Booking
          </h1>
          <p className="text-sm text-slate-500">{bookings.length} total booking</p>
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm font-bold">
            <FaClock /> {pendingCount} booking menunggu
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari pasien atau treatment..." className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none cursor-pointer">
          <option value="all">Semua Status</option>
          {statusList.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Pasien", "Treatment", "Tanggal & Jam", "Pembayaran", "Status", "Aksi"].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-16 text-slate-400"><FaCalendarAlt className="text-4xl mx-auto mb-3 opacity-40" /><p>Tidak ada booking ditemukan</p></td></tr>
              ) : filtered.map(b => (
                <tr key={b.id} className="border-b border-slate-50 hover:bg-blue-50/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {(b.user_name || "U").charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800">{b.user_name || "User #" + b.user_id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{b.treatment_name || "Treatment"}</td>
                  <td className="px-6 py-4 text-slate-500">
                    <p>{b.booking_date ? new Date(b.booking_date).toLocaleDateString("id-ID", { weekday: "short", year: "numeric", month: "short", day: "numeric" }) : "-"}</p>
                    <p className="text-xs text-blue-500 font-bold">{b.booking_time || "-"}</p>
                  </td>
                  <td className="px-6 py-4">
                    {b.payment_status === "Lunas" ? (
                      <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1 w-fit">
                        <FaCheckCircle size={8} /> {b.payment_method || "Lunas"}
                      </span>
                    ) : (
                      <span className="text-[10px] bg-amber-50 text-amber-600 font-bold px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1 w-fit">
                        <FaWallet size={8} /> Belum Dibayar
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={"text-[10px] font-bold px-2.5 py-1 rounded-full border " + (statusColors[b.status] || "bg-slate-50 text-slate-600 border-slate-200")}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={b.status}
                      onChange={e => handleStatusUpdate(b.id, e.target.value)}
                      disabled={updatingId === b.id}
                      className="text-xs font-bold px-2 py-1.5 bg-white border border-slate-200 rounded-lg outline-none cursor-pointer disabled:opacity-50"
                    >
                      {statusList.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {updatingId === b.id && <FaSpinner className="animate-spin inline ml-2 text-blue-500" size={12} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
