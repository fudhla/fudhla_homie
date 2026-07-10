import React from "react";
import { FaCrown, FaUsers, FaGem, FaMedal } from "react-icons/fa";

export default function MemberCard({ total, goldCount, silverCount, bronzeCount, totalPoints }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-xl text-white shadow-xs">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs opacity-80 font-medium">Total Anggota</p>
            <h3 className="text-2xl font-bold mt-1">{total || 0} Pasien</h3>
          </div>
          <FaUsers className="text-3xl opacity-30" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-5 rounded-xl text-white shadow-xs">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs opacity-80 font-medium">Gold Member</p>
            <h3 className="text-2xl font-bold mt-1">{goldCount || 0}</h3>
          </div>
          <FaCrown className="text-3xl opacity-30" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-500 to-slate-600 p-5 rounded-xl text-white shadow-xs">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs opacity-80 font-medium">Silver + Bronze</p>
            <h3 className="text-2xl font-bold mt-1">{(silverCount || 0) + (bronzeCount || 0)}</h3>
          </div>
          <FaMedal className="text-3xl opacity-30" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-5 rounded-xl text-white shadow-xs">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs opacity-80 font-medium">Total Poin</p>
            <h3 className="text-2xl font-bold mt-1">{(totalPoints || 0).toLocaleString()} Pts</h3>
          </div>
          <FaGem className="text-3xl opacity-30" />
        </div>
      </div>
    </div>
  );
}