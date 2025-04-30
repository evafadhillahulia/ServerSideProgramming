// Login.js => src/Pages/Auth/Login.js

import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Label from "../../Components/Label";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { dummyUser } from "../../Data/user";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Cek login dengan dummy user
    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem("isLoggedIn", "true");

      toast.success(" Login Berhasil! Selamat datang!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#4ade80", // hijau
          color: "#1e3a8a",       // biru tua
          fontWeight: "bold",
          padding: "16px",
          borderRadius: "12px",
          fontSize: "16px",
        },
        icon: "✅",
      });

      navigate("/admin");
    } else {
      toast.error("❌ Email atau password salah. Coba lagi ya!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#fecaca", // merah muda
          color: "#7f1d1d",       // merah tua
          fontWeight: "bold",
          padding: "16px",
          borderRadius: "12px",
          fontSize: "16px",
        },
        icon: "⚠️",
      });
    }
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Login
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Masukkan email"
            required
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
          />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
