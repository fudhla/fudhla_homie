import { useState } from "react";
import { FaSearch, FaRegBell, FaChevronDown } from "react-icons/fa";

export default function Header() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center gap-6 z-50">
      
      {/* ── Search Bar ── */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Cari treatment, customer, skincare..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[280px] sm:w-[320px] pl-11 pr-4 py-2.5 bg-gray-100/80 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0B3B60] transition-all"
        />
      </div>

      {/* ── Notification Bell ── */}
      <button className="relative flex items-center justify-center text-gray-600 hover:text-gray-900 transition">
        <FaRegBell className="text-[22px]" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-pink-400 rounded-full border-2 border-[#F9FAFB]"></span>
      </button>

      {/* ── Profile ── */}
      <div className="flex items-center gap-2 cursor-pointer group ml-2">
        <img 
          src="https://randomuser.me/api/portraits/women/44.jpg" 
          alt="User Profile" 
          className="w-10 h-10 rounded-full object-cover"
        />
        <FaChevronDown className="text-gray-500 text-[10px] group-hover:text-gray-800 transition" />
      </div>

    </div>
  );
}