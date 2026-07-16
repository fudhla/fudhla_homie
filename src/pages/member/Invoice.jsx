import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { FaFileInvoiceDollar, FaCheckCircle, FaPrint, FaDownload, FaArrowLeft, FaCrown, FaUser, FaCalendarAlt, FaClock, FaMoneyBillWave, FaSpinner } from "react-icons/fa";
import { bookingsAPI } from "../../services/bookingsAPI";

const paymentMethodLabels = {
  cash: "Tunai", debit: "Kartu Debit", credit: "Kartu Kredit",
  ewallet: "E-Wallet", transfer: "Transfer Bank",
};

const invoiceData = {
  number: "INV/GC/2026/001",
  clinic: { name: "GlowCare Aesthetic Clinic", address: "Jl. Estetika Raya No. 45, Jakarta Selatan", phone: "+62 812-3456-7890", email: "support@glowcare.com" },
  tax: "11%",
};

export default function Invoice() {
  const userSession = localStorage.getItem("userSession");
  const [session, setSession] = useState(null);
  const [latestBooking, setLatestBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userSession) { setLoading(false); return; }
    const parsed = JSON.parse(userSession);
    setSession(parsed);

    async function fetchLatest() {
      try {
        const data = await bookingsAPI.getByUserId(parsed.id);
        if (data && data.length > 0) {
          setLatestBooking(data[0]);
        }
      } catch {} finally { setLoading(false); }
    }
    fetchLatest();
  }, [userSession]);

  if (!userSession) return <Navigate to="/login" replace />;
  if (loading) return <div className="flex justify-center py-20"><FaSpinner className="animate-spin text-blue-600 text-3xl" /></div>;

  const b = latestBooking;
  if (!b) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <FaFileInvoiceDollar className="text-6xl text-slate-200 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-800">Belum ada invoice</h2>
        <p className="text-sm text-slate-400 mt-2">Lakukan booking treatment untuk melihat invoice.</p>
        <Link to="/member/booking" className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl">Booking Treatment</Link>
      </div>
    );
  }

  const subtotal = b.treatment_price || 350000;
  const taxAmount = Math.round(subtotal * 0.11);
  const total = subtotal + taxAmount;

  const formatPrice = (p) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(p);

  const paymentLabel = b.payment_method ? (paymentMethodLabels[b.payment_method] || b.payment_method) : "Belum Dibayar";
  const isPaid = b.payment_status === "Lunas";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <Link to="/member" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"><FaArrowLeft size={12} /> Kembali</Link>
        <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2"><FaFileInvoiceDollar className="text-blue-600" /> Invoice</h1>
      </div>

      {/* Status Badge */}
      <div className={"rounded-2xl p-4 flex items-center gap-3 " + (isPaid ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200")}>
        {isPaid ? <FaCheckCircle className="text-emerald-500 text-xl" /> : <FaClock className="text-amber-500 text-xl" />}
        <div>
          <p className={"font-bold " + (isPaid ? "text-emerald-700" : "text-amber-700")}>{isPaid ? "Pembayaran Lunas" : "Menunggu Pembayaran"}</p>
          <p className={"text-xs " + (isPaid ? "text-emerald-600" : "text-amber-600")}>{invoiceData.number}</p>
        </div>
      </div>

      {/* Invoice Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden" id="invoice-print">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <FaCrown className="text-2xl text-amber-200" />
            <div>
              <h2 className="text-xl font-black">{invoiceData.clinic.name}</h2>
              <p className="text-xs text-blue-200">{invoiceData.clinic.address}</p>
            </div>
          </div>
          <div className="flex justify-between text-xs text-blue-200">
            <p>{invoiceData.clinic.phone} | {invoiceData.clinic.email}</p>
            <p className="font-bold text-white">{invoiceData.number}</p>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pasien</p>
              <p className="font-bold text-slate-800 mt-1 flex items-center gap-1"><FaUser size={11} /> {session?.name || b.user_name || "-"}</p>
              <p className="text-xs text-slate-500">{session?.email || "-"}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tanggal Invoice</p>
              <p className="font-bold text-slate-800 mt-1">{new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <table className="w-full text-sm">
              <thead><tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider"><td className="pb-2">Treatment</td><td className="pb-2 text-right">Jadwal</td><td className="pb-2 text-right">Harga</td></tr></thead>
              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="py-3 font-bold text-slate-800">{b.treatment_name || "Treatment"}</td>
                  <td className="py-3 text-right text-slate-500">
                    {b.booking_date ? new Date(b.booking_date).toLocaleDateString("id-ID", { weekday: "short", month: "short", day: "numeric" }) : "-"}
                    {b.booking_time && <span className="block text-xs text-blue-500 font-bold">{b.booking_time}</span>}
                  </td>
                  <td className="py-3 text-right font-bold text-slate-800">{formatPrice(subtotal)}</td>
                </tr>
              </tbody>
              <tfoot className="border-t border-slate-100">
                <tr><td colSpan={2} className="py-2 text-xs text-slate-500">Subtotal</td><td className="py-2 text-right text-sm text-slate-700">{formatPrice(subtotal)}</td></tr>
                <tr><td colSpan={2} className="py-2 text-xs text-slate-500">PPN ({invoiceData.tax})</td><td className="py-2 text-right text-sm text-slate-700">{formatPrice(taxAmount)}</td></tr>
                <tr className="border-t border-slate-100"><td colSpan={2} className="py-3 font-bold text-slate-800">Total</td><td className="py-3 text-right text-lg font-black text-blue-600">{formatPrice(total)}</td></tr>
              </tfoot>
            </table>
          </div>

          <div className="border-t border-slate-100 pt-4 flex justify-between text-sm">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Metode Pembayaran</p>
              <p className="font-bold text-slate-800 mt-1 flex items-center gap-1"><FaMoneyBillWave size={12} className="text-emerald-500" /> {paymentLabel}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</p>
              <p className={"font-bold mt-1 " + (isPaid ? "text-emerald-600" : "text-amber-600")}>{isPaid ? "LUNAS" : "BELUM DIBAYAR"}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border-t border-slate-200 p-4 text-center text-[10px] text-slate-400">
          Terima kasih telah mempercayakan perawatan kulit Anda kepada GlowCare Aesthetic Clinic.
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-3">
        <button onClick={() => window.print()} className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-2">
          <FaPrint size={14} /> Cetak / Print
        </button>
        <Link to="/member" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
          Ke Dashboard
        </Link>
      </div>
    </div>
  );
}
