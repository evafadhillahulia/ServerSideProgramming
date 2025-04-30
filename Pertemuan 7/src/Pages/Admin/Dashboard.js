// Dashboard.js => src/Pages/Admin/Dashboard.js

import React, { useEffect, useState } from "react";
// Import komponen dari Recharts untuk membuat grafik batang
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Komponen utama Dashboard
const Dashboard = () => {
  // State untuk menyimpan jumlah total mahasiswa
  const [jumlahMahasiswa, setJumlahMahasiswa] = useState(0);
  // State untuk menyimpan jumlah mahasiswa yang aktif
  const [jumlahAktif, setJumlahAktif] = useState(0);

  // useEffect dijalankan setelah komponen dirender pertama kali
  useEffect(() => {
    // Ambil data mahasiswa dari localStorage, jika tidak ada defaultnya array kosong
    const data = JSON.parse(localStorage.getItem("mahasiswa")) || [];
    // Set jumlah total mahasiswa berdasarkan panjang data
    setJumlahMahasiswa(data.length);
    // Hitung jumlah mahasiswa yang aktif (status = true)
    setJumlahAktif(data.filter((mhs) => mhs.status).length);
  }, []);

  // Data untuk grafik batang
  const dataChart = [
    { name: "Total", value: jumlahMahasiswa }, // Jumlah total mahasiswa
    { name: "Aktif", value: jumlahAktif },     // Mahasiswa aktif
    { name: "Non-Aktif", value: jumlahMahasiswa - jumlahAktif }, // Mahasiswa non-aktif
  ];

  return (
    // Container utama dengan background putih, padding, dan tampilan melengkung (rounded)
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Judul halaman dashboard */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>
      {/* Deskripsi singkat dashboard */}
      <p className="text-gray-600 mb-8">Selamat datang! Berikut ringkasan data sistem saat ini.</p>

      {/* Bagian statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Kartu jumlah mahasiswa total */}
        <div className="bg-blue-100 p-5 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-sm font-medium text-blue-700">Jumlah Mahasiswa</h2>
          <p className="text-2xl font-bold text-blue-900 mt-1">{jumlahMahasiswa}</p>
        </div>
        {/* Kartu mahasiswa aktif */}
        <div className="bg-green-100 p-5 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-sm font-medium text-green-700">Mahasiswa Aktif</h2>
          <p className="text-2xl font-bold text-green-900 mt-1">{jumlahAktif}</p>
        </div>
        {/* Kartu mahasiswa tidak aktif */}
        <div className="bg-red-100 p-5 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-sm font-medium text-red-700">Mahasiswa Tidak Aktif</h2>
          <p className="text-2xl font-bold text-red-900 mt-1">{jumlahMahasiswa - jumlahAktif}</p>
        </div>
      </div>

      {/* Bagian grafik batang */}
      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Grafik Mahasiswa</h2>
        {/* Container responsif agar grafik menyesuaikan ukuran layar */}
        <ResponsiveContainer width="100%" height={250}>
          {/* Grafik batang dengan data dari dataChart */}
          <BarChart data={dataChart}>
            {/* Sumbu X menggunakan properti 'name' */}
            <XAxis dataKey="name" />
            {/* Sumbu Y tanpa angka desimal */}
            <YAxis allowDecimals={false} />
            {/* Tooltip untuk menampilkan detail saat hover */}
            <Tooltip />
            {/* Batang dengan nilai 'value' dan warna biru, ujung atas membulat */}
            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
