// src/App.js

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import AuthLayout from "./Layouts/AuthLayout";
import AdminLayout from "./Layouts/AdminLayout";
import ProtectedRoute from "./Routes/Router";
import Modul from "./Pages/Admin/Modul/Modul"; 

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes> 
        {/* Area Auth (Login) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Area Admin – dibungkus ProtectedRoute */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* /admin → redirect ke /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Modul */}
          <Route path="modul" element={<Modul />} />
        </Route>

        {/* Fallback semua path lain ke /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;
