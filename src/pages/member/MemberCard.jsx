import React from "react";
import { FaCrown, FaUsers, FaGem } from "react-icons/fa";

export default function MemberCard({ total }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-xl text-white shadow-xs">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs opacity-80 font-medium">Total Anggota</p>
            <h3 className="text-2xl font-bold mt-1">{total} Pasien</h3>
          </div>
          <FaUsers className="text-3xl opacity-30" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-5 rounded-xl text-white shadow-xs">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs opacity-80 font-medium">Tingkat Platinum</p>
            <h3 className="text-2xl font-bold mt-1">1 Pasien</h3>
          </div>
          <FaCrown className="text-3xl opacity-30" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-5 rounded-xl text-white shadow-xs">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs opacity-80 font-medium">Total Poin Terdistribusi</p>
            <h3 className="text-2xl font-bold mt-1">4.500 Pts</h3>
          </div>
          <FaGem className="text-3xl opacity-30" />
        </div>
      </div>
    </div>
  );
}