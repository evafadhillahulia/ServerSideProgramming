import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/templates/AuthLayout";
import Label from "../components/atoms/Label";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    alert("Login Berhasil! ✅");
    navigate("/admin"); // Redirect ke Dashboard
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Login
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Masukkan email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Masukkan password" required />
        </div>
        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Ingat saya</span>
          </label>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Lupa password
          </a>
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Login
        </Button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Belum punya akun?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Daftar
        </a>
      </p>
    </AuthLayout>
  );
};

export default Login;
