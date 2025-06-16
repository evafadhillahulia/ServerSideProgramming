// src/Pages/MataKuliah/MataKuliah.js

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import AxiosInstance from "../../Utils/Helpers/AxiosInstance";

import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import FormMataKuliah from "../../Components/FormMataKuliah";

const MataKuliah = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [mataKuliahList, setMataKuliahList] = useState([]);
  const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const showCustomToast = (message, type = "success") => {
    toast.custom(
      () => (
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

  const fetchMataKuliah = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AxiosInstance.get("/matakuliah");
      setMataKuliahList(response.data);
    } catch (err) {
      setError(err);
      showCustomToast("Gagal memuat data Mata Kuliah.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMataKuliah();
  }, [fetchMataKuliah]);

  const storeMataKuliah = async (newData) => {
    if (!newData.kode || !newData.nama || !newData.sks) {
      showCustomToast("Seluruh data harus diisi!", "error");
      return;
    }

    try {
      const checkResponse = await AxiosInstance.get(`/matakuliah?kode=${newData.kode}`);
      if (checkResponse.data.length > 0) {
        showCustomToast("Kode Mata Kuliah sudah digunakan!", "error");
        return;
      }

      await AxiosInstance.post("/matakuliah", newData);
      setModalOpen(false);
      showCustomToast("Data Mata Kuliah berhasil ditambahkan!", "success");
      fetchMataKuliah();
    } catch (err) {
      showCustomToast("Gagal menambahkan data Mata Kuliah.", "error");
    }
  };

  const updateMataKuliah = async (updatedData) => {
    if (!updatedData.kode || !updatedData.nama || !updatedData.sks) {
      showCustomToast("Seluruh data harus diisi!", "error");
      return;
    }

    if (selectedMataKuliah?.kode !== updatedData.kode) {
      const checkResponse = await AxiosInstance.get(`/matakuliah?kode=${updatedData.kode}`);
      if (checkResponse.data.length > 0) {
        showCustomToast("Kode sudah digunakan oleh mata kuliah lain!", "error");
        return;
      }
    }

    const result = await Swal.fire({
      title: "Konfirmasi Update",
      text: `Yakin ingin mengupdate Mata Kuliah "${selectedMataKuliah?.nama}" (Kode: ${selectedMataKuliah?.kode})?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Update!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await AxiosInstance.put(`/matakuliah/${selectedMataKuliah.id}`, updatedData);
        setModalOpen(false);
        setSelectedMataKuliah(null);
        showCustomToast("Data Mata Kuliah berhasil diupdate!", "success");
        fetchMataKuliah();
      } catch (err) {
        showCustomToast("Gagal mengupdate data Mata Kuliah.", "error");
      }
    }
  };

  const deleteMataKuliah = async (id) => {
    const mtkl = mataKuliahList.find((m) => m.id === id);

    const result = await Swal.fire({
      title: "Konfirmasi Hapus",
      text: `Yakin ingin menghapus Mata Kuliah "${mtkl?.nama}" (Kode: ${mtkl?.kode})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await AxiosInstance.delete(`/matakuliah/${id}`);
        showCustomToast("Data Mata Kuliah berhasil dihapus!", "success");
        fetchMataKuliah();
      } catch (err) {
        showCustomToast("Gagal menghapus data Mata Kuliah.", "error");
      }
    }
  };

  const openAddModal = () => {
    setSelectedMataKuliah(null);
    setModalOpen(true);
  };

  const openEditModal = async (mtkl) => {
    const result = await Swal.fire({
      title: "Konfirmasi Edit",
      text: `Edit data Mata Kuliah "${mtkl.nama}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Edit!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setSelectedMataKuliah(mtkl);
      setModalOpen(true);
    }
  };

  const handleSubmit = (data) => {
    if (selectedMataKuliah) {
      updateMataKuliah({ ...data, id: selectedMataKuliah.id });
    } else {
      storeMataKuliah(data);
    }
  };

  const filteredMataKuliah = mataKuliahList.filter((mtkl) =>
    mtkl.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mtkl.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMataKuliah = filteredMataKuliah.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMataKuliah.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-700">Memuat data Mata Kuliah...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-500">Error: Gagal memuat data. Silakan coba lagi. ({error.message})</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Daftar Mata Kuliah</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari nama atau kode..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={openAddModal}>
            + Tambah Mata Kuliah
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Kode</th>
              <th className="py-3 px-4 text-left">Nama</th>
              <th className="py-3 px-4 text-left">SKS</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentMataKuliah.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6">Tidak ada data ditemukan.</td>
              </tr>
            ) : (
              currentMataKuliah.map((mtkl) => (
                <tr key={mtkl.id} className="border-b">
                  <td className="py-2 px-4">{mtkl.kode}</td>
                  <td className="py-2 px-4">{mtkl.nama}</td>
                  <td className="py-2 px-4">{mtkl.sks}</td>
                  <td className="py-2 px-4 text-center">
                    <div className="flex gap-2 justify-center">
                    <Button
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() =>
                        navigate(`/dashboard/matakuliah/${mtkl.id}`, { state: mtkl }) 
                      }
                    >
                      Detail
                    </Button>
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600"
                      onClick={() => openEditModal(mtkl)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => deleteMataKuliah(mtkl.id)} 
                    >
                      Hapus
                    </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-sm text-gray-600 text-center md:text-left">
          Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredMataKuliah.length)} dari {filteredMataKuliah.length} dosen
        </p>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <Button
              className={`px-4 py-2 rounded-full ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              ⬅ Previous
            </Button>
            <Button
              className={`px-4 py-2 rounded-full ${currentPage === totalPages || totalPages === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next ➡
            </Button>
          </div>
          <span className="text-sm text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </span>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <FormMataKuliah onSubmit={handleSubmit} editData={selectedMataKuliah} />
      </Modal>
    </div>
  );
};
export default MataKuliah;
