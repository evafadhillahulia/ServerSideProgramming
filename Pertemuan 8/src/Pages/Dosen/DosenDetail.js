import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import { User, BadgeCheck, CheckCircle, } from "lucide-react";
import toast from "react-hot-toast";
import AxiosInstance from "../../Utils/Helpers/AxiosInstance";

const DosenDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dosenData, setDosenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showCustomToast = (message, type = "success") => {
    toast.custom(
      (t) => (
        <div
          className="flex items-center gap-3"
          style={{
            background: type === "success" ? "#4ade80" : type === "error" ? "#f87171" : "#fcd34d",
            color: "#1e3a8a",
            fontWeight: "bold",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "16px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}
        >
          <span>{type === "success" ? "✅" : type === "error" ? "❌" : "⚠️"}</span>
          <span>{message}</span>
        </div>
      ),
      {
        position: "top-center",
        duration: 3000,
      }
    );
  };

  useEffect(() => {
    const fetchDosenDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await AxiosInstance.get(`/dosen/${id}`);
        setDosenData(response.data);
        showCustomToast(`Detail dosen ${response.data.nama} berhasil dimuat.`, "success");
      } catch (err) {
        setError(err);
        showCustomToast("Gagal memuat detail dosen.", "error");
        console.error("Error fetching dosen detail:", err);
        if (err.response && err.response.status === 404) {
          navigate('/admin/dosen', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDosenDetail();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-700">Memuat detail dosen...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 flex-col">
        <p className="text-xl text-red-500 mb-4">Error: Gagal memuat detail. Silakan coba lagi. ({error.message})</p>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/admin/dosen")}
        >
          ← Kembali ke Daftar Dosen
        </Button>
      </div>
    );
  }

  if (!dosenData) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-200 text-center">
        <div className="text-red-600 font-medium text-lg mb-4">
          Data dosen tidak ditemukan 😥
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/admin/mahasiswa")}
        >
          ← Kembali ke Daftar Dosen
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
        Detail Dosen
      </h1>

      <div className="space-y-5 text-gray-800 text-[16px]">

        <div className="flex items-center gap-4">
          <BadgeCheck className="text-blue-600" />
          <div>
            <p className="text-gray-500 text-sm">NIP</p>
            <p className="font-semibold">{dosenData.nip}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <User className="text-blue-600" />
          <div>
            <p className="text-gray-500 text-sm">Nama</p>
            <p className="font-semibold">{dosenData.nama}</p>
          </div>
        </div>

        {dosenData.email && (
          <div className="flex items-center gap-4">
            <span className="text-blue-600">📚</span>
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold">{dosenData.email}</p>
            </div>
          </div>
        )}

        {dosenData.maxSKS && (
          <div className="flex items-center gap-4">
            <span className="text-blue-600">📧</span>
            <div>
              <p className="text-gray-500 text-sm">Maksimal SKS</p>
              <p className="font-semibold">{dosenData.maxSKS}</p>
            </div>
          </div>
        )}
        </div>
        

      <div className="mt-8 text-center">
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/admin/dosen")}
        >
          ← Kembali ke Daftar Dosen
        </Button>
      </div>
    </div>
  );
};

export default DosenDetail;