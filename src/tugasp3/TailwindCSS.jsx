// TailwindCSS.jsx
import UserForm from "./UserForm";

export default function TailwindCSS() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Container utama dengan dekorasi */}
      <div className="relative w-full max-w-2xl">
        
        {/* Dekorasi Background */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="relative bg-white/80 backdrop-blur-lg shadow-2xl rounded-[2.5rem] border border-white p-8 md:p-12">
          
          {/* HEADER */}
          <div className="mb-10">
            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest rounded-full">
              Tech Academy 2026
            </span>
            <h1 className="text-4xl font-black text-slate-800 mt-4 tracking-tight">
              Akses Dashboard <span className="text-indigo-600">Belajar.</span>
            </h1>
            <p className="text-slate-500 mt-3 font-medium">
              Lengkapi data dirimu untuk memulai perjalanan karir baru di dunia teknologi.
            </p>
          </div>

          <UserForm />

          {/* FOOTER */}
          <p className="text-center mt-10 text-slate-400 text-sm font-medium">
            Dikembangkan 5oleh <span className="text-slate-600 font-bold text-indigo-500">Fudhla</span>
          </p>
        </div>
      </div>
    </div>
  );
}