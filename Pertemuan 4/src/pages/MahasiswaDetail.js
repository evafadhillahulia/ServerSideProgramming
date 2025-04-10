// MAHASISWA DETAIL (MahasiswaDetail.js) ==> src/pages/MahasiswaDetail.js

import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";

const MahasiswaDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const data = state; // data mahasiswa dikirim lewat navigate(..., { state: mhs })

  return (
    <div className="bg-white max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Detail Mahasiswa</h1>

      {data ? (
        <div className="space-y-4 text-gray-800 text-base">
          <div>
            <span className="font-semibold text-gray-600">NIM:</span>
            <div className="bg-gray-100 px-4 py-2 rounded">{data.nim}</div>
          </div>

          <div>
            <span className="font-semibold text-gray-600">Nama:</span>
            <div className="bg-gray-100 px-4 py-2 rounded">{data.nama}</div>
          </div>
        </div>
      ) : (
        <div className="text-red-600 font-medium">
          Data mahasiswa tidak tersedia atau tidak dikirim 😥
        </div>
      )}

      <div className="mt-6">
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/admin/mahasiswa")}
        >
          ← Kembali ke Daftar Mahasiswa
        </Button>
      </div>
    </div>
  );
};

export default MahasiswaDetail;
