// src/Pages/Auth/Login.js

import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify"; 
import { FaCheckCircle, FaTimesCircle, FaEnvelope, FaLock } from "react-icons/fa"; // Import ikon untuk email, password, success, dan error
import Input from "../../Components/Input"; 
import Button from "../../Components/Button"; 
import { Dummy } from "../../Data/Dummy"; 
import illustration from "../Auth/gambar.png"; // Import gambar ilustrasi untuk login page

const Login = () => {
  const navigate = useNavigate(); // Hook untuk navigasi antar halaman
  const [email, setEmail] = useState(""); // State untuk menangani email input
  const [password, setPassword] = useState(""); // State untuk menangani password input

  const handleLogin = (e) => { // Fungsi untuk menangani proses login
    e.preventDefault(); // Mencegah form submit secara default
    const { email, password } = e.target; // Ambil email dan password dari form

    // Cek apakah email dan password sesuai dengan Dummy data
    if (email.value === Dummy.email && password.value === Dummy.password) {
      // Simpan data user di localStorage dan tandai pengguna sudah login
      localStorage.setItem("user", JSON.stringify({ email: Dummy.email, loggedIn: true }));
      localStorage.setItem("isLoggedIn", "true");
      // Tampilkan notifikasi sukses login
      toast.success(
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-blue-400 text-xl animate-pulse" /> {/* Ikon sukses */}
          <span>Login Berhasil!</span>
        </div>,
        {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          className: "animate__animated animate__fadeInDown", // Animasi masuk
          style: { background: "linear-gradient(135deg, #6c75c1, #5ab1a2)", color: "#fff" }, // Styling notifikasi
        }
      );
      navigate("/admin/dashboard"); // Arahkan pengguna ke halaman dashboard admin setelah login sukses
    } else {
      // Tampilkan notifikasi error jika email atau password salah
      toast.error(
        <div className="flex items-center gap-2">
          <FaTimesCircle className="text-red-400 text-xl animate-shake" /> {/* Ikon error */}
          <span>Email atau password salah!</span>
        </div>,
        {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          className: "animate__animated animate__shakeX", // Animasi shake saat error
          style: { background: "linear-gradient(135deg, #f44336, #ffeb3b)", color: "#fff" }, // Styling notifikasi error
        }
      );
    }
  };

  return (
    <>
      {/* Image Wrapper as a Rectangle */}
      <div className="flex justify-center mb-8">
        <div className="w-full sm:w-[130%] lg:w-[140%] h-60 sm:h-48 shadow-lg overflow-hidden rounded-xl">
          <img
            src={illustration} // Gambar ilustrasi login
            alt="Belajar Pintar" 
            className="w-full h-full object-cover rounded-xl" // Styling gambar
          />
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-center text-blue-600">Belajar Pintar</h1> {/* Judul halaman */}
      <p className="text-center text-gray-500 mb-6"> {/* Deskripsi platform */}
        Platform pembelajaran digital untuk mahasiswa
      </p>

      <form onSubmit={handleLogin} className="space-y-4"> {/* Form untuk login */}
        {/* Email Input */}
        <Input
          label="Email"
          type="email" 
          id="email"
          name="email"
          placeholder="you@example.com" 
          required // Input wajib diisi
          value={email} // Value diikat ke state email
          onChange={(e) => setEmail(e.target.value)} // Update state email ketika user mengetik
          icon={<FaEnvelope />} // Ikon email di input
        />

        {/* Password Input */}
        <Input
          label="Password"
          type="password" // Tipe input password
          id="password"
          name="password"
          placeholder="••••••••" 
          required 
          value={password} // Value diikat ke state password
          onChange={(e) => setPassword(e.target.value)} // Update state password ketika user mengetik
          icon={<FaLock />} // Ikon kunci di input
        />

        <Button type="submit">Masuk</Button> {/* Tombol submit untuk login */}
      </form>
    </>
  );
};

export default Login;
