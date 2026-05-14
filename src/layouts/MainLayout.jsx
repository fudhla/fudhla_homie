import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen flex bg-[#FFF8FA] font-sans">

      {/* SIDEBAR */}
      <aside className="w-[260px] h-screen fixed left-0 top-0 bg-[#0B3B60] rounded-r-[40px] shadow-[5px_0_30px_rgba(0,0,0,0.05)] z-20 flex flex-col">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-[260px] flex flex-col min-h-screen">

        {/* HEADER */}
        <header className="w-full px-10 pt-10 pb-6 flex justify-end">
          <Header />
        </header>

        {/* CONTENT */}
        <main className="flex-1 w-full px-10 pb-10 max-w-[1400px]">
          <Outlet />
        </main>

      </div>

    </div>
  );
}