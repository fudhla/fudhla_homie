import GuestView from "./GuestView";
import AdminView from "./AdminView";
import { useState } from "react";

export default function ResponsiveDesign() {
  const [page, setPage] = useState("guest");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 p-6">

      <div className="max-w-6xl mx-auto space-y-6">

        {/* NAV */}
        <div className="flex gap-3">
          <button onClick={()=>setPage("guest")} className="px-5 py-2 rounded-xl bg-indigo-600 text-white">
            Guest
          </button>
          <button onClick={()=>setPage("admin")} className="px-5 py-2 rounded-xl bg-gray-800 text-white">
            Admin
          </button>
        </div>

        {/* CONTENT */}
        <div className="bg-white p-6 rounded-3xl shadow-xl">
          {page === "guest" && <GuestView />}
          {page === "admin" && <AdminView />}
        </div>

      </div>
    </div>
  );
}