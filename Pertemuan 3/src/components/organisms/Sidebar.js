// Sidebar component

import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-blue-800 text-white h-full w-64">
      <div className="flex justify-between items-center p-4 border-b border-blue-700">
        <span className="text-2xl font-bold">Admin</span>
      </div>
      <nav className="p-4 space-y-2">
        <a
          href="#"
          className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700"
        >
          <span className="text-lg">🏠</span>
          <span className="menu-text">Dashboard</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 px-4 py-2 rounded bg-blue-700"
        >
          <span className="text-lg">🎓</span>
          <span className="menu-text">Mahasiswa</span>
        </a>
      </nav>
    </div>
  );
};
export default Sidebar;
