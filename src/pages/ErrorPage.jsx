import { Link } from "react-router-dom";

export default function ErrorPage({ code = "404", description = "Halaman yang kamu cari tidak ditemukan atau sedang dalam perbaikan." }) {
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
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4 font-sans">
      <div className="text-center max-w-md bg-white p-12 rounded-[40px] shadow-sm border border-slate-200">
        <h1 className="text-9xl font-black text-blue-500/10 mb-4">{code}</h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          {code === "404" ? "Opps! Page Not Found" : "Something Went Wrong"}
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">{description}</p>
        <Link to={homeLink} className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold px-10 py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-500/20 hover:shadow-xl">
          {homeText}
        </Link>
      </div>
    </div>
  );
}
