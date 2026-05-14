import { Link } from "react-router-dom";

export default function ErrorPage({
  code = "404",
  description = "Halaman yang kamu cari mungkin sedang dalam perawatan kecantikan atau tidak ditemukan.",
  image,
}) {
  return (
    
    <div className="flex items-center justify-center min-h-screen bg-[#2D0B1A] px-4 font-sans">
      <div className="text-center max-w-md">

        {/* Image */}
        {image && (
          <img
            src={image}
            alt={`error-${code}`}
            className="w-56 mx-auto mb-8 drop-shadow-[0_0_20px_rgba(236,72,153,0.2)] opacity-90"
          />
        )}

        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#EC4899] drop-shadow-lg tracking-widest">
          {code}
        </h1>

        <h2 className="text-xl font-bold text-[#EC4899] mt-4 uppercase tracking-[0.2em]">
          {code === "404" && "Page Not Found"}
          {code === "400" && "Bad Request"}
          {code === "401" && "Unauthorized"}
          {code === "403" && "Forbidden"}
          {code === "500" && "Server Error"}
        </h2>

        <p className="text-[#E9D5DA]/40 mt-3 text-sm leading-relaxed max-w-sm mx-auto">
          {description}
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-[#EC4899] hover:bg-[#D13D81] text-white text-sm font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-[#EC4899]/20 transition-all active:scale-95"
        >
          ← Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}