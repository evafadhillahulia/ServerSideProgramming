// src/Components/Logout.js

import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const LogoutButton = () => {
  const handleLogout = () => {
    Swal.fire({
      title: 'Apakah Anda yakin ingin logout?',
      text: "Anda akan keluar dari akun!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Logout!'
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("modulList");
        window.location.href = "/login";
        Swal.fire('Logged Out!', 'Anda berhasil keluar.', 'success');
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-white hover:text-gray-200 transition"
    >
      <FaSignOutAlt size={24} /> Logout
    </button>
  );
};

export default LogoutButton;
