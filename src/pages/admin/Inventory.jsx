import React, { useState } from "react";
import { FaSearch, FaBox, FaExclamationTriangle } from "react-icons/fa";
import Badge from "../../components/Badge";

const products = [
  { id: 1, name: "Hyaluronic Acid Serum", category: "Skincare", stock: 45, minStock: 10, price: 185000, unit: "botol" },
  { id: 2, name: "Niacinamide 10%", category: "Skincare", stock: 32, minStock: 15, price: 125000, unit: "botol" },
  { id: 3, name: "Vitamin C Brightening", category: "Skincare", stock: 8, minStock: 20, price: 210000, unit: "botol" },
  { id: 4, name: "Sunscreen SPF 50 PA+++", category: "Skincare", stock: 67, minStock: 25, price: 95000, unit: "tube" },
  { id: 5, name: "Chemical Peel Glycolic 30%", category: "Medical", stock: 3, minStock: 10, price: 450000, unit: "botol" },
  { id: 6, name: "Surgical Mask Box (50)", category: "Medical", stock: 120, minStock: 30, price: 55000, unit: "box" },
  { id: 7, name: "Laser Handpiece Tip", category: "Alat", stock: 15, minStock: 5, price: 2500000, unit: "pcs" },
  { id: 8, name: "Glove Latex Box (100)", category: "Medical", stock: 6, minStock: 20, price: 85000, unit: "box" },
];

export default function Inventory() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="font-sans space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#343C6A]">Inventaris Produk</h1>
          <p className="text-sm text-[#718EBF]">Manajemen stok skincare, alat medis, & perlengkapan</p>
        </div>
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari produk..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="px-6 py-4 font-bold text-slate-600">Produk</th>
              <th className="px-6 py-4 font-bold text-slate-600">Kategori</th>
              <th className="px-6 py-4 font-bold text-slate-600">Stok</th>
              <th className="px-6 py-4 font-bold text-slate-600">Min. Stok</th>
              <th className="px-6 py-4 font-bold text-slate-600">Harga</th>
              <th className="px-6 py-4 font-bold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800"><FaBox className="inline mr-2 text-blue-500" />{p.name}</td>
                <td className="px-6 py-4 text-slate-500"><Badge type={p.category === "Medical" ? "danger" : p.category === "Alat" ? "warning" : "primary"}>{p.category}</Badge></td>
                <td className="px-6 py-4 font-bold text-slate-800">{p.stock} {p.unit}</td>
                <td className="px-6 py-4 text-slate-500">{p.minStock} {p.unit}</td>
                <td className="px-6 py-4 font-bold text-blue-600">Rp {p.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  {p.stock <= p.minStock ? (
                    <span className="flex items-center gap-1 text-rose-600 font-bold text-xs"><FaExclamationTriangle /> Restock</span>
                  ) : (
                    <span className="text-emerald-600 font-bold text-xs">Aman</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
