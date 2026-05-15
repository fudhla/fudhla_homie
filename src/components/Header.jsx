import { useState } from "react";
import { FaSearch, FaRegBell, FaCog } from "react-icons/fa";

export default function Header() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center justify-between w-full">
      <h2 className="text-2xl font-bold text-[#343C6A]">Overview</h2>
      
      <div className="flex items-center gap-6">
        {/* Search Bar ala BankDash */}
        <div className="relative hidden md:block">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#888EA2]" />
          <input
            type="text"
            placeholder="Search for something"
            className="w-[250px] pl-12 pr-4 py-3 bg-[#F5F7FA] rounded-full text-sm outline-none focus:ring-1 focus:ring-[#1877F2] transition-all text-[#343C6A]"
          />
        </div>

        {/* Icons */}
        <div className="flex gap-4">
          <button className="p-3 bg-[#F5F7FA] text-[#718EBF] rounded-full hover:bg-gray-100 transition-colors">
            <FaCog size={18} />
          </button>
          <button className="p-3 bg-[#F5F7FA] text-[#FE5C73] rounded-full hover:bg-gray-100 transition-colors relative">
            <FaRegBell size={18} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* Profile Avatar */}
        <img 
          src="https://randomuser.me/api/portraits/women/44.jpg" 
          alt="User" 
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
        />
      </div>
    </div>
  );
}