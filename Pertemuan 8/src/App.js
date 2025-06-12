// src/App.js

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register"; // <-- Tambahkan ini
import Dashboard from "./Pages/Admin/Dashboard";
import Mahasiswa from "./Pages/Mahasiswa/Mahasiswa";
import AuthLayout from "./Layouts/AuthLayout";
import AdminLayout from "./Layouts/AdminLayout";
import ProtectedRoute from "./Routes/ProtectedRoute";
import MahasiswaDetail from "./Pages/MahasiswaDetail";
import DosenDetail from "./Pages/Dosen/DosenDetail";
import Dosen from "./Pages/Dosen/Dosen";
import MataKuliah from "./Pages/MataKuliah/MataKuliah";
import MataKuliahDetail from "./Pages/MataKuliah/MataKuliahDetail";

const App = () => {
  return (
    <>
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

      <Routes>
        {/* Halaman Auth (Login & Register) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* <- Tambahkan ini */}
        </Route>

        {/* Halaman Admin (Protected Nested Routes) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="mahasiswa/:id" element={<MahasiswaDetail />} />
          <Route path="dosen" element={<Dosen />} />
          <Route path="dosen/:id" element={<DosenDetail />} />
          <Route path="matakuliah" element={<MataKuliah />} />
          <Route path="matakuliah/:id" element={<MataKuliahDetail />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
