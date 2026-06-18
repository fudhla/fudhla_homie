// 1. Sesuaikan target import ini dengan lokasi file CSS yang sudah kita bersihkan tadi
import "./assets/tailwind.css"; 
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom"; // <-- Sudah diperbaiki di sini ya!
import Loading from "./components/Loading";

// Gunakan Lazy Loading untuk performa dan menghindari konflik import
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const Login      = lazy(() => import("./pages/auth/Login"));
const Dashboard  = lazy(() => import("./pages/Dashboard"));
const Patients   = lazy(() => import("./pages/Patients"));
const AddPatient = lazy(() => import("./pages/AddPatient"));
const Treatments = lazy(() => import("./pages/Treatments"));
const Customers  = lazy(() => import("./pages/Customers"));
const ComponentsPage = lazy(() => import("./pages/Components"));

// Tambahkan lazy import untuk halaman tugas kuliahmu
const FiturXYZ   = lazy(() => import("./pages/FiturXYZ")); 

// Target import khusus untuk modul folder member baru
const MemberList = lazy(() => import("./pages/member/MemberList"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Route Tanpa Sidebar (Login/Register) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Route Khusus Member - Ditulis mandiri agar tampil FULL tanpa terpengaruh Sidebar Admin */}
        <Route path="/member" element={<MemberList />} />

        {/* Route Dengan Sidebar (Dashboard & Manajemen) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/add" element={<AddPatient />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/components" element={<ComponentsPage />} />
          
          {/* Tambahkan Rute Fitur XYZ di sini agar muncul di dalam layout utama */}
          <Route path="/fitur-xyz" element={<FiturXYZ />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;