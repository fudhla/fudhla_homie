import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; 
import Header from "../components/Header";

export default function MainLayout() {
  const userSession = localStorage.getItem("userSession");
  
  // 1. Jika tidak ada sesi login sama sekali, kembalikan ke login
  if (!userSession) return <Navigate to="/login" replace />;

  const user = JSON.parse(userSession);

  // 2. Jika yang masuk BUKAN admin (alias member), tendang ke halaman portal member
  if (user.role !== "admin") return <Navigate to="/member" replace />;

  return (
    <div className="flex h-screen w-full bg-[#F5F7FA] overflow-hidden">
      <aside className="w-[250px] h-full hidden lg:block flex-shrink-0">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="w-full px-8 py-5 bg-white border-b border-[#E6EFF5]">
          <Header />
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}