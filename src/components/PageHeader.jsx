import { FiCalendar, FiChevronDown, FiDownload, FiShare2 } from "react-icons/fi";

export default function PageHeader({
  title,
  breadcrumb,
  children,
  count = 0,
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      {/* LEFT: Title & Status */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {title}
          </h1>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              {count} Total
            </span>
          </div>
        </div>
        <p className="text-sm font-medium text-slate-400">{breadcrumb}</p>
      </div>

      {/* RIGHT: Actions Container */}
      <div className="flex items-center gap-3">
        
        {/* FITUR BARU: Export Button */}
        <button className="group flex h-11 items-center gap-2 rounded-xl border-2 border-slate-100 bg-white px-4 font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-blue-600 hover:border-blue-100">
          <FiDownload className="text-slate-400 group-hover:text-blue-600" size={18} />
          <span className="text-sm">Export</span>
        </button>

        {/* FITUR TAMBAHAN: Share (Icon Only untuk variasi) */}
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-slate-100 bg-white text-slate-400 transition-all hover:bg-slate-50 hover:text-slate-600">
          <FiShare2 size={18} />
        </button>

        {/* VERTICAL DIVIDER */}
        <div className="mx-1 h-8 w-[1px] bg-slate-200" />

        <button className="group flex h-11 cursor-pointer items-center gap-3 rounded-xl bg-slate-900 px-4 shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 hover:shadow-none active:scale-95">
          <FiCalendar className="text-blue-400" size={18} />
          <div className="text-left">
            <p className="text-[10px] font-bold leading-none text-slate-400 uppercase tracking-widest">
              Periode
            </p>
            <p className="text-[13px] font-medium text-white">
              Apr - Mei 2020
            </p>
          </div>
          <FiChevronDown className="ml-1 text-slate-500" />
        </button>

        {children}
      </div>
    </div>
  );
}