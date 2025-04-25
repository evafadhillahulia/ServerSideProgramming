// src/Components/Sidebar.js

import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBook } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-800 text-white p-4 h-screen">
      <h2 className="text-2xl font-bold mb-8 text-white">Belajar Pintar</h2>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
              : "flex items-center gap-2 hover:bg-blue-500 hover:text-white px-4 py-2 rounded transition duration-300"
          }
        >
          <FaHome className="text-xl" />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/modul"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
              : "flex items-center gap-2 hover:bg-blue-500 hover:text-white px-4 py-2 rounded transition duration-300"
          }
        >
          <FaBook className="text-xl" />
          Modul
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
