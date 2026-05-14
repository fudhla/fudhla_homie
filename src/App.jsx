import "./assets/tailwind.css";
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Loading from "./components/Loading";
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const Login    = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot   = lazy(() => import("./pages/auth/Forgot"));
const Dashboard   = lazy(() => import("./pages/Dashboard"));
const ErrorPage   = lazy(() => import("./pages/ErrorPage"));
const Patients   = lazy(() => import("./pages/Patients"));
const AddPatient = lazy(() => import("./pages/AddPatient"));
const Treatments    = lazy(() => import("./pages/Treatments"));
const Customers    = lazy(() => import("./pages/Customers"));


function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* ── Auth ── */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot"   element={<Forgot />} />
        </Route>

        {/* ── Main ── */}
        <Route element={<MainLayout />}>

          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* patients */}
          <Route path="/patients"     element={<Patients />} />
         <Route path="/patients/add" element={<AddPatient />} />

          {/* treatments */}
          <Route path="/treatments"     element={<Treatments />} />

          {/* customers */}
          <Route path="/customers"     element={<Customers />} />

          {/* Error Pages */}
          <Route path="/400" element={<ErrorPage code="400" />} />
          <Route path="/401" element={<ErrorPage code="401" />} />
          <Route path="/403" element={<ErrorPage code="403" />} />
          <Route path="*"    element={<ErrorPage code="404" />} />

        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;