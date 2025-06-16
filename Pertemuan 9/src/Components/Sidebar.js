import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStateContext } from "../Context/AuthContext"; // <-- Update


const Sidebar = () => {
  const { user } = useAuthStateContext();

  // Jika user belum login atau permissions belum tersedia, jangan tampilkan sidebar
  if (!user || !user.permissions) return null;

  return (
    <aside className="w-64 bg-blue-800 text-white p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-8 text-white">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {/* Dashboard */}
        {user.permissions.includes("dashboard.page") && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
                : "flex items-center gap-2 hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
            }
          >
            🏠 Dashboard
          </NavLink>
        )}

        {/* Mahasiswa */}
        {user.permissions.includes("mahasiswa.page") && (
          <NavLink
            to="/dashboard/mahasiswa"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
                : "flex items-center gap-2 hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
            }
          >
            🎓 Mahasiswa
          </NavLink>
        )}

        {/* Dosen */}
        {user.permissions.includes("dosen.page") && (
          <NavLink
            to="/dashboard/dosen"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
                : "flex items-center gap-2 hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
            }
          >
            👨🏻 Dosen
          </NavLink>
        )}

        {/* Mata Kuliah */}
        {user.permissions.includes("matakuliah.page") && (
          <NavLink
            to="/dashboard/matakuliah"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
                : "flex items-center gap-2 hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
            }
          >
            📖 Mata Kuliah
          </NavLink>
        )}

        {/* KRS */}
        {user.permissions.includes("krs.page") && (
          <NavLink
            to="/dashboard/krs"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
                : "flex items-center gap-2 hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
            }
          >
            📋 Kartu Rencana Studi
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
