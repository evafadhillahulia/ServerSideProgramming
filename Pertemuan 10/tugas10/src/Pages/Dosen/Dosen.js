import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import AxiosInstance from "../../Utils/Helpers/AxiosInstance";
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import FormDosen from "../../Components/FormDosen";

const Dosen = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [dosenList, setDosenList] = useState([]);
  const [selectedDosen, setSelectedDosen] = useState(null);
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
      { position: "top-center", duration: 3000 }
    );
  };

  const fetchDosen = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [resDosen, resKelas, resMatkul] = await Promise.all([
        AxiosInstance.get("/dosen"),
        AxiosInstance.get("/kelas"),
        AxiosInstance.get("/matakuliah"),
      ]);

      const dosenWithSKS = resDosen.data.map((dsn) => {
        const totalSKS = resKelas.data
          .filter((k) => k.dosen_id === dsn.id)
          .map((k) => resMatkul.data.find((m) => m.id === k.mata_kuliah_id)?.sks || 0)
          .reduce((a, b) => a + b, 0);
        return { ...dsn, totalSKS };
      });

      setDosenList(dosenWithSKS);
    } catch (err) {
      setError(err);
      showCustomToast("Gagal memuat data dosen.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDosen();
  }, [fetchDosen]);

  const storeDosen = async (newData) => {
    if (!newData.nip || !newData.nama || !newData.email || !newData.maxSKS) {
      showCustomToast("Semua kolom wajib diisi!", "error");
      return;
    }

    try {
      const check = await AxiosInstance.get(`/dosen?nip=${newData.nip}`);
      if (check.data.length > 0) {
        showCustomToast("NIP sudah digunakan!", "error");
        return;
      }

      await AxiosInstance.post("/dosen", {
        ...newData,
        totalSKS: 0, // default
      });

      setModalOpen(false);
      showCustomToast("Data dosen berhasil ditambahkan!", "success");
      fetchDosen();
    } catch (err) {
      showCustomToast("Gagal menambahkan dosen.", "error");
    }
  };

  const updateDosen = async (updatedData) => {
    if (!updatedData.nip || !updatedData.nama || !updatedData.email || !updatedData.maxSKS) {
      showCustomToast("Semua kolom wajib diisi!", "error");
      return;
    }

    if (selectedDosen?.nip !== updatedData.nip) {
      const check = await AxiosInstance.get(`/dosen?nip=${updatedData.nip}`);
      if (check.data.length > 0) {
        showCustomToast("NIP sudah digunakan oleh dosen lain!", "error");
        return;
      }
    }

    const result = await Swal.fire({
      title: "Konfirmasi Update",
      text: `Update data dosen NIP ${selectedDosen?.nip}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Update!",
    });

    if (result.isConfirmed) {
      try {
        await AxiosInstance.put(`/dosen/${selectedDosen.id}`, updatedData);
        setModalOpen(false);
        setSelectedDosen(null);
        showCustomToast("Data dosen berhasil diupdate!", "success");
        fetchDosen();
      } catch (err) {
        showCustomToast("Gagal mengupdate dosen.", "error");
      }
    }
  };

  const deleteDosen = async (id) => {
    const dsn = dosenList.find((d) => d.id === id);

    const result = await Swal.fire({
      title: "Konfirmasi Hapus",
      text: `Hapus dosen "${dsn?.nama}" (NIP: ${dsn?.nip})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya, Hapus!",
    });

    if (result.isConfirmed) {
      try {
        await AxiosInstance.delete(`/dosen/${id}`);
        showCustomToast("Dosen berhasil dihapus!", "success");
        fetchDosen();
      } catch (err) {
        showCustomToast("Gagal menghapus dosen.", "error");
      }
    }
  };

  const openAddModal = () => {
    setSelectedDosen(null);
    setModalOpen(true);
  };

  const openEditModal = async (dsn) => {
    const confirm = await Swal.fire({
      title: "Edit Dosen",
      text: `Edit data dosen ${dsn.nama}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
    });

    if (confirm.isConfirmed) {
      setSelectedDosen(dsn);
      setModalOpen(true);
    }
  };

  const handleSubmit = (data) => {
    if (selectedDosen) {
      updateDosen({ ...data, id: selectedDosen.id });
    } else {
      storeDosen(data);
    }
  };

  const filteredDosen = dosenList.filter(
    (dsn) =>
      dsn.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dsn.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dsn.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDosen = filteredDosen.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDosen.length / itemsPerPage);

  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-700">Memuat data dosen...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-500">Gagal memuat data: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Daftar Dosen</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari nama, NIP, atau email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2"
          />
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={openAddModal}>
            + Tambah Dosen
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">NIP</th>
              <th className="py-3 px-4 text-left">Nama</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Maksimal SKS</th>
              <th className="py-3 px-4 text-left">Total SKS</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentDosen.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  Tidak ada data dosen yang sesuai
                </td>
              </tr>
            ) : (
              currentDosen.map((dsn) => (
                <tr key={dsn.id} className="even:bg-gray-100 odd:bg-white">
                  <td className="py-2 px-4">{dsn.nip}</td>
                  <td className="py-2 px-4">{dsn.nama}</td>
                  <td className="py-2 px-4">{dsn.email}</td>
                  <td className="py-2 px-4">{dsn.maxSKS}</td>
                  <td className="py-2 px-4">{dsn.totalSKS}</td>
                  <td className="py-2 px-4 text-center space-x-2">
                    <Button
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() => navigate(`/dashboard/dosen/${dsn.id}`, { state: dsn })}
                    >
                      Detail
                    </Button>
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600"
                      onClick={() => openEditModal(dsn)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => deleteDosen(dsn.id)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-sm text-gray-600">
          Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredDosen.length)} dari{" "}
          {filteredDosen.length} dosen
        </p>
        <div className="flex gap-2">
          <Button
            className={`px-4 py-2 rounded-full ${
              currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white"
            }`}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            ⬅ Sebelumnya
          </Button>
          <Button
            className={`px-4 py-2 rounded-full ${
              currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white"
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Selanjutnya ➡
          </Button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <FormDosen onSubmit={handleSubmit} editData={selectedDosen} />
      </Modal>
    </div>
  );
};

export default Dosen;
