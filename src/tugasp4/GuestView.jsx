import data from "./services.json";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GuestView({ dark }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200); // fake loading
  }, []);

  let filtered = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || item.category === category) &&
    (level === "" || item.details.level === level)
  );

  if (sort === "price") filtered.sort((a,b)=>a.price-b.price);
  if (sort === "rating") filtered.sort((a,b)=>b.rating-a.rating);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-black ${dark ? "text-white" : "text-indigo-600"}`}>
          Course Explorer 🚀
        </h1>
      </div>

      {/* FILTER */}
      <div className="grid md:grid-cols-4 gap-3">
        <input onChange={(e)=>setSearch(e.target.value)} placeholder="Search..."
          className={`p-3 rounded-xl ${dark ? "bg-gray-800 text-white" : "bg-gray-100"}`}/>

        <select onChange={(e)=>setCategory(e.target.value)}
          className={`p-3 rounded-xl ${dark ? "bg-gray-800 text-white" : "bg-gray-100"}`}>
          <option value="">Kategori</option>
          <option>Programming</option>
          <option>Design</option>
          <option>Marketing</option>
          <option>Business</option>
        </select>

        <select onChange={(e)=>setLevel(e.target.value)}
          className={`p-3 rounded-xl ${dark ? "bg-gray-800 text-white" : "bg-gray-100"}`}>
          <option value="">Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <select onChange={(e)=>setSort(e.target.value)}
          className={`p-3 rounded-xl ${dark ? "bg-gray-800 text-white" : "bg-gray-100"}`}>
          <option value="">Sort</option>
          <option value="price">Harga</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_,i)=>(
            <div key={i} className="h-40 bg-gray-300 animate-pulse rounded-xl"/>
          ))}
        </div>
      ) : (

      /* DATA */
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(item => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-2xl shadow cursor-pointer ${
              dark ? "bg-gray-800 text-white" : "bg-white"
            }`}
            onClick={()=>setSelected(item)}
          >
            <img src={item.image} className="h-40 w-full object-cover rounded-xl"/>
            <h3 className="font-bold mt-2">{item.name}</h3>
            <p className="text-sm opacity-60">{item.provider.location}</p>

            <div className="flex justify-between mt-2">
              <span className="text-indigo-500 font-bold">Rp {item.price}</span>
              <span>⭐ {item.rating}</span>
            </div>
          </motion.div>
        ))}
      </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={()=>setSelected(null)}
          >
            <motion.div 
              className="bg-white p-6 rounded-2xl w-[90%] max-w-md"
              initial={{scale:0.7}} animate={{scale:1}} exit={{scale:0.7}}
              onClick={(e)=>e.stopPropagation()}
            >
              <img src={selected.image} className="rounded-xl mb-3"/>
              <h2 className="font-bold text-xl">{selected.name}</h2>
              <p>{selected.provider.location}</p>
              <p>Level: {selected.details.level}</p>
              <p>Durasi: {selected.details.duration}</p>

              <button onClick={()=>setSelected(null)} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}