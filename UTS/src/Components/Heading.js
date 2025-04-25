// src/Components/Heading.js

import React from "react";
import Logout from "./Logout";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-md">
      <div className="flex justify-end items-center px-6 py-4">
        <Logout />
      </div>
    </header>
  );
};

export default Header;
