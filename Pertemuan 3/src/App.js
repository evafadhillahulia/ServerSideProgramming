import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default App;
