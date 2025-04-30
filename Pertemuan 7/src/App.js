// App.js => src/App.js


import React from "react"; 
import { Routes, Route, Navigate } from "react-router-dom"; 
import { Toaster } from "react-hot-toast"; 

import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import Mahasiswa from "./Pages/Mahasiswa/Mahasiswa";
import AuthLayout from "./Layouts/AuthLayout";
import AdminLayout from "./Layouts/AdminLayout";
import ProtectedRoute from "./Routes/ProtectedRoute";
import MahasiswaDetail from "./Pages/MahasiswaDetail";

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