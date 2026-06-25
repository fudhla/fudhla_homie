import "./assets/tailwind.css"; 
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import Loading from "./components/Loading";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const Login      = lazy(() => import("./pages/auth/Login"));
const Register   = lazy(() => import("./pages/auth/Register")); 
const Forgot     = lazy(() => import("./pages/auth/Forgot")); 
const Dashboard  = lazy(() => import("./pages/Dashboard"));
const GuestPage  = lazy(() => import("./pages/guest/GuestPage"));

const AddPatient     = lazy(() => import("./pages/AddPatient"));
const Treatments     = lazy(() => import("./pages/Treatments"));
const Customers      = lazy(() => import("./pages/Customers"));
const ComponentsPage = lazy(() => import("./pages/Components")); 
const MemberList     = lazy(() => import("./pages/member/MemberList"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        
        {/* 1. LANDING PAGE GUEST */}
        <Route path="/" element={<GuestPage />} />
       
        {/* 2. AUTHENTICATION */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/forgot" element={<Forgot />} /> 
        </Route>

        {/* 3. PORTAL MEMBER */}
        <Route path="/member" element={<MemberList />} />

        {/* 4. ADMIN PANEL */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<AddPatient />} />
          <Route path="/patients/add" element={<AddPatient />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/components" element={<ComponentsPage />} />
        </Route>

        {/* FALLBACK REDIRECT */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Suspense>
  );
}

export default App;