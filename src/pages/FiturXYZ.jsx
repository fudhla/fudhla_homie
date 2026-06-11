import React, { useState } from "react";

export default function FiturXYZ() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKategori, setSelectedKategori] = useState("all");
  const [showSelectMenu, setShowSelectMenu] = useState(false);

  return (
    <div className="p-8 space-y-8 font-sans max-w-4xl mx-auto text-left animate-fade-in">
      
      {/* Header Halaman */}
      <div className="border-b border-[#E6EFF5] pb-4">
        <h1 className="text-2xl font-black text-[#343C6A]">Fitur XYZ - GlowCare</h1>
        <p className="text-sm text-[#718EBF] mt-1">Penerapan 3 Komponen Premium (Alert, Select, Dialog).</p>
      </div>

      {/* Komponen 1: ALERT (Peringatan Sistem) */}
      <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#1877F2] text-[#1e40af] flex flex-col gap-1 shadow-sm">
        <h5 className="font-bold text-sm tracking-tight">Informasi Sistem</h5>
        <p className="text-xs leading-relaxed text-[#1e40af]/90">
          Halaman ini dikerjakan di branch <strong className="text-[#1877F2]">coba-fitur-xyz</strong> dan menggunakan emulasi struktur komponen premium untuk kompatibilitas penuh Tailwind v4.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-[#E6EFF5] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative">
        
        {/* Komponen 2: SELECT (Dropdown Filter Custom) */}
        <div className="space-y-2 relative">
          <label className="block text-xs font-bold text-[#475569]">Filter Kategori Layanan:</label>
          
          {/* Trigger Dropdown */}
          <button 
            onClick={() => setShowSelectMenu(!showSelectMenu)}
            className="w-[200px] bg-white border border-[#E6EFF5] hover:border-slate-300 px-4 py-2 rounded-xl text-sm flex items-center justify-between shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1877F2] text-[#343C6A] font-medium transition-all"
          >
            <span>
              {selectedKategori === "all" && "Semua Layanan"}
              {selectedKategori === "skincare" && "Skincare Racikan"}
              {selectedKategori === "treatment" && "Tindakan Medis"}
            </span>
            <span className="text-xs text-slate-400">▼</span>
          </button>

          {/* Konten Menu Dropdown */}
          {showSelectMenu && (
            <>
              {/* Overlay penutup klik luar */}
              <div className="fixed inset-0 z-10" onClick={() => setShowSelectMenu(false)} />
              
              <div className="absolute left-0 mt-1 w-[200px] bg-white border border-[#E6EFF5] rounded-xl shadow-lg z-20 p-1 animate-in fade-in slide-in-from-top-1 duration-150">
                <button 
                  onClick={() => { setSelectedKategori("all"); setShowSelectMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${selectedKategori === "all" ? "bg-[#EFF6FF] text-[#1877F2] font-semibold" : "text-[#343C6A] hover:bg-slate-50"}`}
                >
                  Semua Layanan
                </button>
                <button 
                  onClick={() => { setSelectedKategori("skincare"); setShowSelectMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${selectedKategori === "skincare" ? "bg-[#EFF6FF] text-[#1877F2] font-semibold" : "text-[#343C6A] hover:bg-slate-50"}`}
                >
                  Skincare Racikan
                </button>
                <button 
                  onClick={() => { setSelectedKategori("treatment"); setShowSelectMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${selectedKategori === "treatment" ? "bg-[#EFF6FF] text-[#1877F2] font-semibold" : "text-[#343C6A] hover:bg-slate-50"}`}
                >
                  Tindakan Medis
                </button>
              </div>
            </>
          )}
        </div>

        {/* Komponen 3: DIALOG (Modal Pop-up Custom) */}
        <div>
          {/* Trigger Button */}
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-[#1877F2] hover:bg-[#1464CD] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#1877F2]/20 active:scale-95"
          >
            + Tambah Data
          </button>

          {/* Struktur Dialog Modal Backdrop & Window */}
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop gelapkan latar belakang */}
              <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" 
                onClick={() => setIsOpen(false)} 
              />
              
              {/* Kotak Konten Modal */}
              <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative z-10 border border-slate-100 animate-in zoom-in-95 duration-200">
                
                {/* Header Modal */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-[#343C6A]">Tambah Data Medis Baru</h3>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-xs text-[#718EBF] leading-normal">
                    Gunakan form ini untuk menambahkan item baru ke dalam sistem manajemen praktikum GlowCare.
                  </p>
                </div>

                {/* Form Body */}
                <div className="py-2">
                  <input 
                    type="text" 
                    placeholder="Masukkan nama item..." 
                    className="w-full text-sm border border-[#E6EFF5] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1877F2] text-[#343C6A]" 
                    autoFocus
                  />
                </div>

                {/* Footer Modal Action */}
                <div className="mt-6 flex justify-end gap-3">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="bg-[#1877F2] hover:bg-[#1464CD] text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm"
                  >
                    Simpan Data
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}