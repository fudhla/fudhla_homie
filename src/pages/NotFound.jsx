import { Link } from "react-router-dom";

export default function NotFound() {
  const stored = localStorage.getItem("userSession");
  let homeLink = "/";
  let homeText = "Kembali ke Beranda";
  if (stored) {
    try {
      const user = JSON.parse(stored);
      if (user.role === "admin") { homeLink = "/dashboard"; homeText = "Kembali ke Dashboard"; }
      else if (user.role === "member") { homeLink = "/member"; homeText = "Kembali ke Portal Member"; }
    } catch {}
  }

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl m-6 border border-white/5 shadow-2xl">
      <h1 className="text-8xl font-black text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">404</h1>
      <div className="mt-4">
        <h2 className="text-xl font-bold text-white">Opps! Halaman Hilang</h2>
        <p className="text-slate-400/60 mt-2 max-w-xs mx-auto text-sm">
          Halaman yang kamu cari mungkin sedang dalam perawatan kecantikan atau tidak ditemukan.
        </p>
      </div>
      <Link to={homeLink} className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-pink-500/20 active:scale-95">
        {homeText}
      </Link>
    </div>
  );
}
