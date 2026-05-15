import { Link } from "react-router-dom";

export default function ErrorPage({ code = "404", description = "Halaman yang kamu cari tidak ditemukan atau sedang dalam perbaikan." }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA] px-4 font-sans">
      <div className="text-center max-w-md bg-white p-12 rounded-[40px] shadow-sm border border-[#E6EFF5]">
        <h1 className="text-9xl font-black text-[#1877F2]/10 mb-4">{code}</h1>
        <h2 className="text-2xl font-bold text-[#343C6A] mb-4">
          {code === "404" ? "Opps! Page Not Found" : "Something Went Wrong"}
        </h2>
        <p className="text-[#718EBF] text-sm leading-relaxed mb-8">
          {description}
        </p>
        <Link
          to="/"
          className="inline-block bg-[#1877F2] hover:bg-blue-700 text-white text-sm font-bold px-10 py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
}