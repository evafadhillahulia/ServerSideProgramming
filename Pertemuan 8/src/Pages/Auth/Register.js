import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import AxiosInstance from "../../Utils/Helpers/AxiosInstance";
import Label from "../../Components/Label";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Register = () => {
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const nama = e.target.nama.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const existingUser = await AxiosInstance.get(`/user?email=${email}`);
      if (existingUser.data.length > 0) {
        showCustomToast("Email sudah terdaftar!", "error");
        return;
      }

      await AxiosInstance.post("/user", { nama, email, password });
      showCustomToast("Registrasi berhasil! Silakan login.", "success");
      navigate("/login");
    } catch (error) {
      console.error("Gagal registrasi:", error);
      showCustomToast("Gagal menyimpan data. Periksa kembali koneksi server.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <Label htmlFor="nama">Nama Lengkap</Label>
          <Input
            type="text"
            id="nama"
            name="nama"
            placeholder="Masukkan nama lengkap"
            required
            disabled={loading}
          />
        </div>
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
          {loading ? "Mendaftarkan..." : "Daftar"}
        </Button>
      </form>

      <p className="text-center mt-4">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Masuk di sini
        </Link>
      </p>
    </>
  );
};

export default Register;
