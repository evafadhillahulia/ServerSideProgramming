// LOGIN PAGE (Login.js) => src/pages/Login.js

import React from "react";
import { useNavigate } from "react-router-dom";
import Label from "../../Components/Label";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import {dummyUser} from "../../Data/user";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Cek apakah sesuai dengan dummy user
    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem("isLoggedIn", "true"); // LocalStorage untuk menyimpan status login
      alert("Login Berhasil! ✅");
      navigate("/admin");
    } else {
      alert("Email atau password salah ❌");
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
          <Input type="email" id="email" name="email" placeholder="Masukkan email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" placeholder="Masukkan password" required />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
