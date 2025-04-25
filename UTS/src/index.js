//src/index.js

import React from "react";  
import ReactDOM from "react-dom/client";  // Renderer React untuk DOM
import { BrowserRouter } from "react-router-dom";  // Router untuk navigasi SPA
import App from "./App";  // Komponen App utama
import "./index.css";  

// Buat root dan render aplikasi React
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>  {/* Mode ketat untuk mendeteksi potensi masalah */}
    <BrowserRouter>   {/* Bungkus aplikasi dengan router */}
      <App />        {/* Render komponen utama App */}
    </BrowserRouter>
  </React.StrictMode>
);