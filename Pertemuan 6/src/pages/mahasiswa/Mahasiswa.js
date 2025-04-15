// Mahasiswa.js => src/pages/Mahasiswa.js

import React, { useState, useEffect } from "react";
import Button from "../components/atoms/Button";
import MahasiswaModal from "../components/organisms/MahasiswaModal";
import MahasiswaTable from "../components/organisms/MahasiswaTable";


const Mahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Load data dari localStorage saat pertama kali
  useEffect(() => {
    const saved = localStorage.getItem("mahasiswa");
    if (saved) {
      setMahasiswa(JSON.parse(saved));
    } else {
      const dummy = [
        { nim: "A11.2022.14283", nama: "Eva Fadhillah Ulia", status: true },
        { nim: "A11.2022.14284", nama: "Sofiyan Roy Irawan", status: true },
        { nim: "A11.2022.14285", nama: "Elzian Deva Alzarif", status: false },
        { nim: "A11.2022.14286", nama: "Wartini", status: false },
        
      ];
      setMahasiswa(dummy);
      localStorage.setItem("mahasiswa", JSON.stringify(dummy));
    }
  }, []);

  // Simpan ke localStorage saat mahasiswa berubah
  useEffect(() => {
    localStorage.setItem("mahasiswa", JSON.stringify(mahasiswa));
  }, [mahasiswa]);

  const storeMahasiswa = (data) => {
    setMahasiswa([...mahasiswa, data]);
  };

  const updateMahasiswa = (updated) => {
    const updatedList = mahasiswa.map((mhs) =>
      mhs.nim === updated.nim ? updated : mhs
    );
    setMahasiswa(updatedList);
  };

  const deleteMahasiswa = (nim) => {
    const confirmDelete = window.confirm(
      `Yakin ingin menghapus mahasiswa dengan NIM ${nim}?`
    );
    if (confirmDelete) {
      setMahasiswa(mahasiswa.filter((m) => m.nim !== nim));
    }
  };

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setSelectedMahasiswa(mhs);
    setModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (selectedMahasiswa) {
      updateMahasiswa(data);
    } else {
      storeMahasiswa(data);
    }
    setModalOpen(false);
  };

  const handleDelete = (nim) => {
    deleteMahasiswa(nim);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={openAddModal}
        >
          + Tambah Mahasiswa
        </Button>
      </div>

      <MahasiswaTable
        mahasiswa={mahasiswa}
        openEditModal={openEditModal}
        onDelete={handleDelete}
      />

      <MahasiswaModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </div>
  );
};

export default Mahasiswa;
