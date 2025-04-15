// App.js => src/App.js

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ import Toaster

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Mahasiswa from "./pages/Mahasiswa";
import AuthLayout from "./components/templates/AuthLayout";
import AdminLayout from "./components/templates/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import MahasiswaDetail from "./pages/MahasiswaDetail";

const App = () => {
  return (
    <>
      {/* ✅ Ini komponen untuk menampilkan toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#333",
            fontWeight: "500",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
        }}
      />

      {/* Routing */}
      <Routes>
        {/* Halaman Login */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Halaman Admin (Nested Routes) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested Admin Routes */}
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="mahasiswa/:id" element={<MahasiswaDetail />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
