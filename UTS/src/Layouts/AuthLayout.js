import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => (
  <div className="h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
    <div className="w-full max-w-screen-sm bg-white rounded-2xl shadow-lg p-8 space-y-6">
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;
