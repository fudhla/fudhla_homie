import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center bg-[#2D0B1A] rounded-3xl m-6 border border-white/5 shadow-2xl">

      <h1 className="text-8xl font-black text-[#EC4899] drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
        404
      </h1>
      
      <div className="mt-4">
        <h2 className="text-xl font-bold text-white">Opps! Halaman Hilang</h2>
        <p className="text-[#E9D5DA]/40 mt-2 max-w-xs mx-auto text-sm">
          Halaman yang kamu cari mungkin sedang dalam perawatan kecantikan atau tidak ditemukan.
        </p>
      </div>

      <Link
        to="/"
        className="mt-8 bg-[#EC4899] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#D13D81] transition-all shadow-lg shadow-[#EC4899]/20 active:scale-95"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}