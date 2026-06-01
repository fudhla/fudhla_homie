import "./assets/tailwind.css";
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Route Tanpa Sidebar (Login/Register) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Route Dengan Sidebar (Dashboard & Manajemen) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/add" element={<AddPatient />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/components" element={<ComponentsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;