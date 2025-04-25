// src/Routes/Router.js

import React from "react"; 
import { Navigate } from "react-router-dom"; 

const ProtectedRoute = ({ children }) => { // Komponen ProtectedRoute yang menerima props 'children'
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Cek status login dari localStorage

  // Jika pengguna tidak login (isLoggedIn === false), arahkan ke halaman login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Menggunakan Navigate untuk mengalihkan pengguna ke halaman login
  }

  // Jika pengguna sudah login, tampilkan konten yang dibungkus oleh ProtectedRoute (children)
  return children; 
};

export default ProtectedRoute; 
