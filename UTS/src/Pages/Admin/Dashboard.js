// src/Pages/Admin/Dashboard.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dummy from "../../Data/Dummy"; 

const Dashboard = () => {
  const [progressPercent, setProgressPercent] = useState(0);  // State untuk persentase progress belajar
  const navigate = useNavigate(); // Inisialisasi fungsi navigate

  useEffect(() => {
    // Ambil data modul dari localStorage, default ke array kosong
    const savedModul = JSON.parse(localStorage.getItem("modulList") || "null") || [];
    const total = savedModul.length; // Jumlah total modul
    const completedCount = savedModul.filter(m => m.completed).length; // Hitung modul yang selesai
    const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    setProgressPercent(percent); // Set state persentase
  }, []);

  // Fungsi untuk navigasi ke halaman modul
  const navigateToModul = () => {
    navigate("/admin/modul");
  };

  return (
    <div className="p-6 bg-blue-600 min-h-screen text-white">
      <div className="container mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center mb-6 md:mb-8 animate__animated animate__fadeIn">
          Selamat datang, {Dummy.name}!  {/* Menampilkan nama pengguna dari Dummy */}
        </h1>
        
        {/* User Email */}
        <p className="text-lg text-center mb-6 md:mb-8 animate__animated animate__fadeIn animate__delay-1s">
          {Dummy.email}  {/* Menampilkan email pengguna dari Dummy */}
        </p>

        {/* Progress Card */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="flex justify-between mb-4">
            <span className="text-lg font-semibold text-gray-800">Progress Belajar</span>
            <span className="text-lg font-semibold text-gray-800">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all ease-in-out duration-300"
              style={{ width: `${progressPercent}%` }} // Atur lebar bar sesuai persentase
            ></div>
          </div>
        </div>

        {/* Button */}
        <div className="text-center mt-6 md:mt-8">
          <button
            onClick={navigateToModul}  // Panggil fungsi navigasi saat klik
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-900 transform transition-all hover:scale-105 hover:shadow-2xl duration-300"
          >
            Lanjutkan Belajar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
