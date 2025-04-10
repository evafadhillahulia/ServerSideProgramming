import React, { useState } from "react";
import Button from "../components/atoms/Button";
import Modal from "../components/molecules/Modal";
import FormMahasiswa from "../components/molecules/FormMahasiswa";
import ProfileMenu from "../components/molecules/ProfileMenu";

const Sidebar = () => {
  return (
    <div className="bg-blue-800 text-white h-screen w-64">
      <div className="flex justify-between items-center p-4 border-b border-blue-700">
        <span className="text-2xl font-bold">Admin</span>
      </div>
      <nav className="p-4 space-y-2">
        <a href="#" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700">
          <span className="text-lg">🏠</span>
          <span className="menu-text">Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-2 px-4 py-2 rounded bg-blue-700">
          <span className="text-lg">🎓</span>
          <span className="menu-text">Mahasiswa</span>
        </a>
      </nav>
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Mahasiswa</h1>
        <ProfileMenu />
      </div>
    </header>
  );
};

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mahasiswa, setMahasiswa] = useState([]); // Menyimpan data mahasiswa
  const [editData, setEditData] = useState(null); // Menyimpan data yang akan diedit

  const addMahasiswa = (newData) => {
    setMahasiswa([...mahasiswa, newData]);
    setIsModalOpen(false);
  };

  const updateMahasiswa = (updatedData) => {
    setMahasiswa(
      mahasiswa.map((mhs) => (mhs.nim === editData.nim ? updatedData : mhs))
    );
    setIsModalOpen(false);
    setEditData(null);
  };

  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Sidebar ditambahkan di sini */}
      <div className="flex-1 flex flex-col">
        <Header /> {/* Header dengan ProfileMenu */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setEditData(null);
                  setIsModalOpen(true);
                }}
              >
                + Tambah Mahasiswa
              </Button>
            </div>

            <table className="w-full text-sm text-gray-700">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">NIM</th>
                  <th className="py-2 px-4 text-left">Nama</th>
                  <th className="py-2 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mahasiswa.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      Belum ada data mahasiswa
                    </td>
                  </tr>
                ) : (
                  mahasiswa.map((mhs, index) => (
                    <tr key={index} className="even:bg-gray-100 odd:bg-white">
                      <td className="py-2 px-4">{mhs.nim}</td>
                      <td className="py-2 px-4">{mhs.nama}</td>
                      <td className="py-2 px-4 text-center">
                        <Button
                          className="bg-yellow-500 hover:bg-yellow-600 mx-1"
                          onClick={() => {
                            setEditData(mhs);
                            setIsModalOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className="bg-red-500 hover:bg-red-600 mx-1"
                          onClick={() => {
                            setMahasiswa(
                              mahasiswa.filter((item) => item.nim !== mhs.nim)
                            );
                          }}
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
        </main>
        <footer className="bg-white text-center py-4 shadow-inner">
          <p className="text-sm text-gray-600">
            © 2025 Admin Dashboard. All rights reserved.
          </p>
        </footer>
      </div>
      {/* Modal Tambah/Edit Mahasiswa */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FormMahasiswa
          onSubmit={editData ? updateMahasiswa : addMahasiswa}
          editData={editData}
        />
      </Modal>
    </div>
  );
};

export default Admin;
