import data from "./services.json";
import { useState } from "react";

export default function AdminView({ dark }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filtered = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || item.category === category)
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-black ${dark ? "text-white" : "text-indigo-600"}`}>
          Admin Dashboard
        </h1>
        <div className="bg-indigo-500 text-white px-4 py-2 rounded">
          Total: {filtered.length}
        </div>
      </div>

      {/* FILTER */}
      <div className="grid md:grid-cols-2 gap-3">
        <input placeholder="Search..."
          onChange={(e)=>setSearch(e.target.value)}
          className={`p-3 rounded-xl ${dark ? "bg-gray-800 text-white" : "bg-gray-100"}`}
        />

        <select onChange={(e)=>setCategory(e.target.value)}
          className={`p-3 rounded-xl ${dark ? "bg-gray-800 text-white" : "bg-gray-100"}`}>
          <option value="">Kategori</option>
          <option>Programming</option>
          <option>Design</option>
          <option>Marketing</option>
          <option>Business</option>
        </select>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-indigo-500 text-white rounded-xl">
          <p>Total</p>
          <h2 className="text-xl font-bold">{data.length}</h2>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-xl">
          <p>Avg Rating</p>
          <h2 className="text-xl font-bold">
            {(data.reduce((a,b)=>a+b.rating,0)/data.length).toFixed(1)}
          </h2>
        </div>
        <div className="p-4 bg-purple-500 text-white rounded-xl">
          <p>Highest Price</p>
          <h2 className="text-xl font-bold">
            Rp {Math.max(...data.map(d=>d.price))}
          </h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3">Nama</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Rating</th>
              <th>Level</th>
              <th>Durasi</th>
              <th>Lokasi</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(item=>(
              <tr key={item.id} className="hover:bg-indigo-50">
                <td className="p-3 font-bold">{item.name}</td>
                <td>{item.category}</td>
                <td>Rp {item.price}</td>
                <td>⭐ {item.rating}</td>
                <td>{item.details.level}</td>
                <td>{item.details.duration}</td>
                <td>{item.provider.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}