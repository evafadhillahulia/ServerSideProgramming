// src/Pages/MahasiswaDetail.js

import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import { User, BadgeCheck, CheckCircle, XCircle } from "lucide-react";

const MahasiswaDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const data = state;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
        Detail Mahasiswa
      </h1>

      {data ? (
        <div className="space-y-5 text-gray-800 text-[16px]">
          <div className="flex items-center gap-4">
            <BadgeCheck className="text-blue-600" />
            <div>
              <p className="text-gray-500 text-sm">NIM</p>
              <p className="font-semibold">{data.nim}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <User className="text-blue-600" />
            <div>
              <p className="text-gray-500 text-sm">Nama</p>
              <p className="font-semibold">{data.nama}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {data.status ? (
              <CheckCircle className="text-green-600" />
            ) : (
              <XCircle className="text-red-600" />
            )}
            <div>
              <p className="text-gray-500 text-sm">Status</p>
              <span
                className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                  data.status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {data.status ? "Aktif" : "Tidak Aktif"}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-red-600 font-medium text-center">
          Data mahasiswa tidak tersedia atau tidak dikirim 😥
        </div>
      )}

      <div className="mt-8 text-center">
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
