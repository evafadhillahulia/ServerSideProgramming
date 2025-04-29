// src/Pages/Mahasiswa/Mahasiswa.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import FormMahasiswa from "../../Components/FormMahasiswa";
import {dummyMahasiswa} from "../../Data/user"; // Import data dummy

const Mahasiswa = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("mahasiswa");
    if (savedData && JSON.parse(savedData).length > 0) {
      setMahasiswaList(JSON.parse(savedData));
    } else {
      // Gunakan data dari dummyData jika tidak ada data di localStorage
      setMahasiswaList(dummyMahasiswa);
      localStorage.setItem("mahasiswa", JSON.stringify(dummyMahasiswa));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mahasiswa", JSON.stringify(mahasiswaList));
  }, [mahasiswaList]);

  const storeMahasiswa = (newData) => {
    if (!newData.nim || !newData.nama) {
      toast.error("NIM dan Nama harus diisi!");
      return;
    }

    const exist = mahasiswaList.find((mhs) => mhs.nim === newData.nim);
    if (exist) {
      toast.error("NIM sudah digunakan!");
      return;
    }

    setMahasiswaList([...mahasiswaList, newData]);
    setModalOpen(false);
    toast.success("Data mahasiswa berhasil ditambahkan!");
  };

  const updateMahasiswa = (updatedData) => {
    if (!updatedData.nim || !updatedData.nama) {
      toast.error("NIM dan Nama harus diisi!");
      return;
    }

    const isSameNIM = selectedMahasiswa?.nim === updatedData.nim;
    const exist = mahasiswaList.find(
      (mhs) => mhs.nim === updatedData.nim && !isSameNIM
    );
    if (exist) {
      toast.error("NIM sudah digunakan oleh mahasiswa lain!");
      return;
    }

    const confirmUpdate = window.confirm(
      `Yakin ingin mengupdate data mahasiswa NIM ${selectedMahasiswa?.nim}?`
    );
    if (!confirmUpdate) return;

    setMahasiswaList(
      mahasiswaList.map((mhs) =>
        mhs.nim === selectedMahasiswa.nim ? updatedData : mhs
      )
    );
    setModalOpen(false);
    setSelectedMahasiswa(null);
    toast.success("Data mahasiswa berhasil diupdate!");
  };

  const deleteMahasiswa = (nim) => {
    const mhs = mahasiswaList.find((m) => m.nim === nim);
    const confirmDelete = window.confirm(
      `Yakin ingin menghapus data mahasiswa "${mhs?.nama}" (NIM: ${nim})?`
    );
    if (confirmDelete) {
      setMahasiswaList(mahasiswaList.filter((item) => item.nim !== nim));
      toast.success("Data mahasiswa berhasil dihapus!");
    }
  };

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (mhs) => {
    const confirmEdit = window.confirm(`Edit data mahasiswa "${mhs.nama}"?`);
    if (confirmEdit) {
      setSelectedMahasiswa(mhs);
      setModalOpen(true);
    }
  };

  const handleSubmit = (data) => {
    if (selectedMahasiswa) {
      updateMahasiswa(data);
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
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentMahasiswa.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  Tidak ada data mahasiswa yang sesuai
                </td>
              </tr>
            ) : (
              currentMahasiswa.map((mhs) => (
                <tr key={mhs.nim} className="even:bg-gray-100 odd:bg-white">
                  <td className="py-2 px-4 font-medium">{mhs.nim}</td>
                  <td className="py-2 px-4">{mhs.nama}</td>
                  <td className="py-2 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${mhs.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {mhs.status ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center space-x-2">
                    <Button
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() =>
                        navigate(`/admin/mahasiswa/${mhs.nim}`, { state: mhs })
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
                      onClick={() => deleteMahasiswa(mhs.nim)}
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
