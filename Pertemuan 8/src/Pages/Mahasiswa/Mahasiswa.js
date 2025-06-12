// Mahasiswa.js => src/Pages/Mahasiswa/Mahasiswa.js

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 
import Swal from "sweetalert2";

// Import AxiosInstance yang sudah dikonfigurasi
import AxiosInstance from "../../Utils/Helpers/AxiosInstance"; 

import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import FormMahasiswa from "../../Components/FormMahasiswa";

const Mahasiswa = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  // Fungsi utilitas untuk menampilkan toast notifikasi (tetap ada untuk error/pesan lain)
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
  const fetchMahasiswa = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AxiosInstance.get("/mahasiswa");
      setMahasiswaList(response.data);
      // showCustomToast("Data mahasiswa berhasil dimuat!", "success"); // BARIS INI DIHAPUS
    } catch (err) {
      setError(err);
      showCustomToast("Gagal memuat data mahasiswa.", "error"); // Notifikasi error tetap ada
      console.error("Error fetching mahasiswa:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMahasiswa();
  }, [fetchMahasiswa]);

  // --- Fungsi untuk Menyimpan Data Mahasiswa Baru ke API ---
  const storeMahasiswa = async (newData) => {
    if (!newData.nim || !newData.nama) {
      showCustomToast("NIM dan Nama harus diisi!", "error");
      return;
    }

    try {
      const checkResponse = await AxiosInstance.get(`/mahasiswa?nim=${newData.nim}`);
      if (checkResponse.data.length > 0) {
        showCustomToast("NIM sudah digunakan!", "error");
        return;
      }

      await AxiosInstance.post("/mahasiswa", newData);
      setModalOpen(false);
      showCustomToast("Data mahasiswa berhasil ditambahkan!", "success");
      fetchMahasiswa();
    } catch (err) {
      showCustomToast("Gagal menambahkan data mahasiswa.", "error");
      console.error("Error storing mahasiswa:", err);
    }
  };

  // --- Fungsi untuk Memperbarui Data Mahasiswa di API ---
  const updateMahasiswa = async (updatedData) => {
    if (!updatedData.nim || !updatedData.nama) {
      showCustomToast("NIM dan Nama harus diisi!", "error");
      return;
    }

    if (selectedMahasiswa?.nim !== updatedData.nim) {
        const checkResponse = await AxiosInstance.get(`/mahasiswa?nim=${updatedData.nim}`);
        if (checkResponse.data.length > 0) {
            showCustomToast("NIM sudah digunakan oleh mahasiswa lain!", "error");
            return;
        }
    }

    const result = await Swal.fire({
      title: "Konfirmasi Update",
      text: `Yakin ingin mengupdate data mahasiswa NIM ${selectedMahasiswa?.nim}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Update!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await AxiosInstance.put(`/mahasiswa/${selectedMahasiswa.id}`, updatedData); 
        setModalOpen(false);
        setSelectedMahasiswa(null);
        showCustomToast("Data mahasiswa berhasil diupdate!", "success");
        fetchMahasiswa();
      } catch (err) {
        showCustomToast("Gagal mengupdate data mahasiswa.", "error");
        console.error("Error updating mahasiswa:", err);
      }
    }
  };

  // --- Fungsi untuk Menghapus Data Mahasiswa dari API ---
  const deleteMahasiswa = async (id) => {
    const mhs = mahasiswaList.find((m) => m.id === id);

    const result = await Swal.fire({
      title: "Konfirmasi Hapus",
      text: `Yakin ingin menghapus data mahasiswa "${mhs?.nama}" (NIM: ${mhs?.nim})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await AxiosInstance.delete(`/mahasiswa/${id}`);
        showCustomToast("Data mahasiswa berhasil dihapus!", "success");
        fetchMahasiswa();
      } catch (err) {
        showCustomToast("Gagal menghapus data mahasiswa.", "error");
        console.error("Error deleting mahasiswa:", err);
      }
    }
  };

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = async (mhs) => {
    const result = await Swal.fire({
      title: "Konfirmasi Edit",
      text: `Edit data mahasiswa "${mhs.nama}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Edit!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setSelectedMahasiswa(mhs);
      setModalOpen(true);
    }
  };

  const handleSubmit = (data) => {
    if (selectedMahasiswa) {
      updateMahasiswa({ ...data, id: selectedMahasiswa.id }); 
    } else {
      storeMahasiswa(data);
    }
  };

  const filteredMahasiswa = mahasiswaList.filter((mhs) =>
    mhs.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mhs.nim.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMahasiswa = filteredMahasiswa.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMahasiswa.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-700">Memuat data mahasiswa...</p>
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
        <h2 className="text-xl font-bold text-gray-800">Daftar Mahasiswa</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari nama atau NIM..."
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
            + Tambah Mahasiswa
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">NIM</th>
              <th className="py-3 px-4 text-left">Nama</th>
              <th className="py-3 px-4 text-left">Email</th> 
              <th className="py-3 px-4 text-left">Jurusan</th>
              <th className="py-3 px-4 text-left">Maksimal SKS</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentMahasiswa.length === 0 && !loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500"> {/* Ubah Colspan menjadi 5 */}
                  Tidak ada data mahasiswa yang sesuai
                </td>
              </tr>
            ) : (
              currentMahasiswa.map((mhs) => (
                <tr key={mhs.id} className="even:bg-gray-100 odd:bg-white">
                  <td className="py-2 px-4 font-medium">{mhs.nim}</td>
                  <td className="py-2 px-4">{mhs.nama}</td>
                  <td className="py-2 px-4">{mhs.email || 'N/A'}</td>
                  <td className="py-2 px-4">{mhs.jurusan}</td>
                  <td className="py-2 px-4">{mhs.maxSKS}</td>
                  <td className="py-2 px-4 text-center space-x-2">
                    <Button
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() =>
                        navigate(`/admin/mahasiswa/${mhs.id}`, { state: mhs }) 
                      }
                    >
                      Detail
                    </Button>
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600"
                      onClick={() => openEditModal(mhs)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => deleteMahasiswa(mhs.id)} 
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
          Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredMahasiswa.length)} dari {filteredMahasiswa.length} mahasiswa
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
        <FormMahasiswa onSubmit={handleSubmit} editData={selectedMahasiswa} />
      </Modal>
    </div>
  );
};

export default Mahasiswa;