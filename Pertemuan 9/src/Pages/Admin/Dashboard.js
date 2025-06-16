// Dashboard.js => src/Pages/Admin/Dashboard.js

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AxiosInstance from "../../Utils/Helpers/AxiosInstance";
import { Users, BookOpen, UserCheck } from "lucide-react";
import { useAuthStateContext } from "../../Context/AuthContext";

const Dashboard = () => {
  const { user } = useAuthStateContext();
  const [jumlahMahasiswa, setJumlahMahasiswa] = useState(0);
  const [jumlahDosen, setJumlahDosen] = useState(0);
  const [jumlahMataKuliah, setJumlahMataKuliah] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        if (user.role === "admin") {
          const [resMahasiswa, resDosen, resMatkul] = await Promise.all([
            AxiosInstance.get("/mahasiswa"),
            AxiosInstance.get("/dosen"),
            AxiosInstance.get("/matakuliah"),
          ]);

          setJumlahMahasiswa(resMahasiswa.data.length);
          setJumlahDosen(resDosen.data.length);
          setJumlahMataKuliah(resMatkul.data.length);
        }

        // Untuk role lain bisa tambah request sesuai kebutuhan nanti

        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err);
        setLoading(false);
        toast.error("Gagal mengambil data. Pastikan server berjalan!");
      }
    };

    fetchAllData();
  }, [user.role]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-700 text-lg animate-pulse">
        Memuat data dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-6 rounded-xl shadow-md text-center text-red-700 text-lg">
        Error: Gagal memuat data dashboard. Silakan coba lagi.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md">
      <h1 className="text-4xl font-bold text-indigo-700 mb-2">
        Dashboard {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
      </h1>
      <p className="text-gray-600 mb-8">
        Selamat datang, {user.nama}! Berikut informasi untuk role: <strong>{user.role}</strong>.
      </p>

      {/* Konten untuk Admin */}
      {user.role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-indigo-100 p-6 rounded-xl shadow hover:shadow-lg transition transform hover:scale-105">
            <div className="flex items-center gap-4">
              <Users className="w-10 h-10 text-indigo-600" />
              <div>
                <h2 className="text-md font-medium text-indigo-800">Jumlah Mahasiswa</h2>
                <p className="text-3xl font-bold text-indigo-900">{jumlahMahasiswa}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg transition transform hover:scale-105">
            <div className="flex items-center gap-4">
              <UserCheck className="w-10 h-10 text-green-600" />
              <div>
                <h2 className="text-md font-medium text-green-800">Jumlah Dosen</h2>
                <p className="text-3xl font-bold text-green-900">{jumlahDosen}</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 p-6 rounded-xl shadow hover:shadow-lg transition transform hover:scale-105">
            <div className="flex items-center gap-4">
              <BookOpen className="w-10 h-10 text-yellow-600" />
              <div>
                <h2 className="text-md font-medium text-yellow-800">Jumlah Mata Kuliah</h2>
                <p className="text-3xl font-bold text-yellow-900">{jumlahMataKuliah}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Konten untuk Dosen */}
      {user.role === "dosen" && (
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-blue-600">Panel Dosen</h2>
          <p className="text-gray-700 mt-2">Ini adalah area khusus untuk dosen. Silakan lihat kelas yang Anda ampu.</p>
        </div>
      )}

      {/* Konten untuk Mahasiswa */}
      {user.role === "mahasiswa" && (
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-blue-600">Panel Mahasiswa</h2>
          <p className="text-gray-700 mt-2">Selamat belajar! Cek jadwal dan materi kuliah Anda di sini.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
