import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF6F8] p-4 sm:p-8 font-sans">
      
      <div className="flex w-full max-w-[1000px] min-h-[600px] bg-white rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#0B3B60] p-12 relative overflow-hidden">
          
          {/* Logo */}
          <div className="z-10">
            <h1 className="text-white text-3xl font-extrabold tracking-tight">
              GLOWCARE.
            </h1>
          </div>

          {/* Text */}
          <div className="z-10 mb-24 -mt-16">
            <h2 className="text-white text-[2.5rem] leading-[1.15] font-semibold mb-4">
              Rawat kecantikan dan kesehatan kulit Anda bersama Glow Care ✨
            </h2>
          </div>

          {/* Pattern */}
          <div className="absolute bottom-8 left-12 grid grid-cols-5 grid-rows-4 gap-0 w-[240px] h-[192px] z-0">
            <div className="bg-pink-300 rounded-tl-full"></div>
            <div className="bg-pink-400 rounded-br-full"></div>
            <div className="bg-rose-300 rounded-tr-full"></div>
            <div className="bg-yellow-200 rounded-bl-full"></div>
            <div className="bg-pink-500 rounded-tr-full"></div>

            <div className="bg-pink-200 rounded-br-full"></div>
            <div className="bg-pink-300 rounded-bl-full"></div>
            <div className="bg-rose-200 rounded-full"></div>
            <div className="bg-yellow-100"></div>
            <div className="bg-pink-200 rounded-tl-full"></div>

            <div className="bg-pink-300 rounded-tr-full"></div>
            <div className="bg-pink-100"></div>
            <div className="bg-rose-300 rounded-br-full"></div>
            <div className="bg-yellow-200 rounded-tl-full"></div>
            <div className="bg-pink-400"></div>

            <div className="bg-pink-200 rounded-bl-full"></div>
            <div className="bg-pink-400 rounded-tr-full"></div>
            <div className="bg-rose-300 rounded-tl-full"></div>
            <div className="bg-yellow-100 rounded-br-full"></div>
            <div className="bg-pink-500 rounded-br-[80%]"></div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col justify-center px-8 py-10 sm:px-16 lg:px-20 bg-white">
          <Outlet />
        </div>

      </div>
    </div>
  );
}