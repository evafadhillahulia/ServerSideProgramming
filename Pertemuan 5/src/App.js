// APP JS (App.js) ==> src/App.js

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Mahasiswa from "./pages/Mahasiswa";
import AuthLayout from "./components/templates/AuthLayout";
import AdminLayout from "./components/templates/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import MahasiswaDetail from "./pages/MahasiswaDetail";

const App = () => {
  return (
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
        <Route index element={<Navigate to="dashboard" />} /> {/* Default redirect */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="mahasiswa" element={<Mahasiswa />} />
        <Route path="mahasiswa/:id" element={<MahasiswaDetail />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
