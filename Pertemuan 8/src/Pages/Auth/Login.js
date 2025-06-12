// src/Pages/Auth/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import AxiosInstance from "../../Utils/Helpers/AxiosInstance"; 

import Label from "../../Components/Label";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const showCustomToast = (message, type = "success") => {
    toast.custom(
      (t) => (
        <div
          className="flex items-center gap-3"
          style={{
            background: type === "success" ? "#4ade80" : type === "error" ? "#f87171" : "#fcd34d",
            color: "#1e3a8a",
            fontWeight: "bold",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "16px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}
        >
          <span>{type === "success" ? "✅" : type === "error" ? "❌" : "⚠️"}</span>
          <span>{message}</span>
        </div>
      ),
      {
        position: "top-center",
        duration: 3000,
      }
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await AxiosInstance.get(`/user?email=${email}&password=${password}`);

      if (response.data.length > 0) {
        localStorage.setItem("isLoggedIn", "true");
        showCustomToast("Login Berhasil! Selamat datang!", "success");
        navigate("/admin");
      } else {
        showCustomToast("Email atau password salah. Coba lagi ya!", "error");
      }
    } catch (error) {
      console.error("Login API Error:", error);
      if (error.response) {
        showCustomToast(
          error.response.data.message || `Terjadi kesalahan saat login. Status: ${error.response.status}`,
          "error"
        );
      } else if (error.request) {
        showCustomToast("Tidak ada respons dari server. Pastikan JSON Server berjalan di port 3001.", "error");
      } else {
        showCustomToast("Terjadi kesalahan teknis. Silakan coba lagi.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Masukkan email"
            required
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Masukkan password"
            required
            disabled={loading}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      {/* Tambahan menu Register */}
      <p className="text-center mt-4">
        Belum punya akun?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Daftar di sini
        </Link>
      </p>
    </>
  );
};

export default Login;
