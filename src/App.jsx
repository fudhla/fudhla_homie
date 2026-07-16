import "./assets/tailwind.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// LAYOUTS
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import MemberPortalLayout from "./layouts/MemberPortalLayout";

// AUTH & GUEST
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import GuestPage from "./pages/guest/GuestPage";

// ADMIN PAGES
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import AddPatient from "./pages/AddPatient";
import Treatments from "./pages/Treatments";
import Customers from "./pages/Customers";
import Staff from "./pages/admin/Staff";
import Inventory from "./pages/admin/Inventory";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import ErrorPage from "./pages/ErrorPage";
import NotFound from "./pages/NotFound";

// ADMIN NEW PAGES
import AdminBookings from "./pages/admin/Bookings";

// MEMBER PORTAL PAGES
import MemberList from "./pages/member/MemberList";
import BookingTreatment from "./pages/member/BookingTreatment";
import PromoSpesial from "./pages/member/PromoSpesial";
import RiwayatKlinis from "./pages/member/RiwayatKlinis";
import Profile from "./pages/member/Profile";
import Loyalty from "./pages/member/Loyalty";
import Invoice from "./pages/member/Invoice";

function App() {
  return (
    <Routes>
      
      {/* HALAMAN UTAMA / GUEST */}
      <Route path="/" element={<GuestPage />} />
     
      {/* GRUP AUTENTIKASI */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/forgot" element={<Forgot />} /> 
      </Route>

      {/* PORTAL MEMBER */}
      <Route path="/member" element={<MemberPortalLayout />}>
        <Route index element={<MemberList />} />
        <Route path="booking" element={<BookingTreatment />} />
        <Route path="promo" element={<PromoSpesial />} />
        <Route path="history" element={<RiwayatKlinis />} />
        <Route path="profile" element={<Profile />} />
        <Route path="loyalty" element={<Loyalty />} />
        <Route path="invoice" element={<Invoice />} />
      </Route>

      {/* ADMIN PANEL */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/add" element={<AddPatient />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/bookings" element={<AdminBookings />} />
      </Route>

      {/* HALAMAN UTILITY ERROR */}
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />

    </Routes>
  );
}

export default App;