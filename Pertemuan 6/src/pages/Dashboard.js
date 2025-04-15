// Dashboard.js => src/pages/Dashboard.js

import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [jumlahMahasiswa, setJumlahMahasiswa] = useState(0);
  const [jumlahAktif, setJumlahAktif] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("mahasiswa")) || [];
    setJumlahMahasiswa(data.length);
    setJumlahAktif(data.filter((mhs) => mhs.status).length);
  }, []);

  const dataChart = [
    { name: "Total", value: jumlahMahasiswa },
    { name: "Aktif", value: jumlahAktif },
    { name: "Non-Aktif", value: jumlahMahasiswa - jumlahAktif },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>
      <p className="text-gray-600 mb-8">Selamat datang! Berikut ringkasan data sistem saat ini.</p>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-5 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-sm font-medium text-blue-700">Jumlah Mahasiswa</h2>
          <p className="text-2xl font-bold text-blue-900 mt-1">{jumlahMahasiswa}</p>
        </div>
        <div className="bg-green-100 p-5 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-sm font-medium text-green-700">Mahasiswa Aktif</h2>
          <p className="text-2xl font-bold text-green-900 mt-1">{jumlahAktif}</p>
        </div>
        <div className="bg-red-100 p-5 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-sm font-medium text-red-700">Mahasiswa Tidak Aktif</h2>
          <p className="text-2xl font-bold text-red-900 mt-1">{jumlahMahasiswa - jumlahAktif}</p>
        </div>
      </div>

      {/* Grafik */}
      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Grafik Mahasiswa</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataChart}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
