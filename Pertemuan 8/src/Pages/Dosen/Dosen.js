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

  // --- Fungsi untuk Mengambil Data Mahasiswa dari API ---
  const fetchDosen = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AxiosInstance.get("/dosen");
      setDosenList(response.data);
    } catch (err) {
      setError(err);
      showCustomToast("Gagal memuat data dosen.", "error"); // Notifikasi error tetap ada
      console.error("Error fetching dosen:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDosen();
  }, [fetchDosen]);

  // --- Fungsi untuk Menyimpan Data Mahasiswa Baru ke API ---
  const storeDosen = async (newData) => {
    if (!newData.nip || !newData.nama || !newData.email || !newData.maxSKS ) {
      showCustomToast("NIP, Nama, Email, Max SKS harus diisi!", "error");
      return;
    }

    try {
      const checkResponse = await AxiosInstance.get(`/dosen?nip=${newData.nip}`);
      if (checkResponse.data.length > 0) {
        showCustomToast("NIP sudah digunakan!", "error");
        return;
      }

      await AxiosInstance.post("/dosen", newData);
      setModalOpen(false);
      showCustomToast("Data dosen berhasil ditambahkan!", "success");
      fetchDosen();
    } catch (err) {
      showCustomToast("Gagal menambahkan data dosen.", "error");
      console.error("Error storing dosen:", err);
    }
  };

  // --- Fungsi untuk Memperbarui Data Mahasiswa di API ---
  const updateDosen = async (updatedData) => {
    if (!updatedData.nip || !updatedData.nama || !updatedData.email || !updatedData.maxSKS) {
      showCustomToast("NIP, Nama dan Email harus diisi!", "error");
      return;
    }

    if (selectedDosen?.nip !== updatedData.nip) {
        const checkResponse = await AxiosInstance.get(`/dosen?nip=${updatedData.nip}`);
        if (checkResponse.data.length > 0) {
            showCustomToast("NIP sudah digunakan oleh dosen lain!", "error");
            return;
        }
    }

    const result = await Swal.fire({
      title: "Konfirmasi Update",
      text: `Yakin ingin mengupdate data dosen NIP ${selectedDosen?.nip}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Update!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await AxiosInstance.put(`/dosen/${selectedDosen.id}`, updatedData); 
        setModalOpen(false);
        setSelectedDosen(null);
        showCustomToast("Data Dosen berhasil diupdate!", "success");
        fetchDosen();
      } catch (err) {
        showCustomToast("Gagal mengupdate data dosen.", "error");
        console.error("Error updating dosen:", err);
      }
    }
  };

  // --- Fungsi untuk Menghapus Data Mahasiswa dari API ---
  const deleteDosen = async (id) => {
    const dsn = dosenList.find((d) => d.id === id);

    const result = await Swal.fire({
      title: "Konfirmasi Hapus",
      text: `Yakin ingin menghapus data dosen "${dsn?.nama}" (NIP: ${dsn?.nip})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await AxiosInstance.delete(`/dosen/${id}`);
        showCustomToast("Data dosen berhasil dihapus!", "success");
        fetchDosen();
      } catch (err) {
        showCustomToast("Gagal menghapus data Dosen.", "error");
        console.error("Error deleting dosen:", err);
      }
    }
  };

  const openAddModal = () => {
    setSelectedDosen(null);
    setModalOpen(true);
  };

  const openEditModal = async (dsn) => {
    const result = await Swal.fire({
      title: "Konfirmasi Edit",
      text: `Edit data dosen "${dsn.nama}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Edit!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setSelectedDosen(dsn);
      setModalOpen(true);
    }
  };

  const handleSubmit = async (data) => {
    if (selectedDosen) {
      updateDosen({ ...data, id: selectedDosen.id }); 
    } else {
      storeDosen(data);
    }
  };

  const filteredDosen = dosenList.filter((dsn) =>
    dsn.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dsn.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dsn.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDosen = filteredDosen.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDosen.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
        <p className="text-xl text-red-500">Error: Gagal memuat data. Silakan coba lagi. ({error.message})</p>
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
            placeholder="Cari nama atau NIP..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={openAddModal}
          >
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
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentDosen.length === 0 && !loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">Tidak ada data dosen yang sesuai
                </td>
              </tr>
            ) : (
              currentDosen.map((dsn) => (
                <tr key={dsn.id} className="even:bg-gray-100 odd:bg-white">
                  <td className="py-2 px-4 font-medium">{dsn.nip}</td>
                  <td className="py-2 px-4">{dsn.nama}</td>
                  <td className="py-2 px-4">{dsn.email}</td>
                  <td className="py-2 px-4">{dsn.maxSKS}</td>
                  <td className="py-2 px-4 text-center space-x-2">
                    <Button
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() =>
                        navigate(`/admin/dosen/${dsn.id}`, { state: dsn }) 
                      }
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
        <p className="text-sm text-gray-600 text-center md:text-left">
          Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredDosen.length)} dari {filteredDosen.length} dosen
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
        <FormDosen onSubmit={handleSubmit} editData={selectedDosen} />
      </Modal>
    </div>
  );
};

export default Dosen;