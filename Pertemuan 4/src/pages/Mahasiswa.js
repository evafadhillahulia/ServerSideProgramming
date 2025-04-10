// MAHASISWA PAGE (Mahasiswa.js) ==> src/pages/Mahasiswa.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import Modal from "../components/molecules/Modal";
import FormMahasiswa from "../components/molecules/FormMahasiswa";

const Mahasiswa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();

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
                <td className="py-2 px-4 text-center space-x-2">
                <Button
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => navigate(`/admin/mahasiswa/${mhs.nim}`, { state: mhs })}
                >
                  Detail
                </Button>

                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600"
                    onClick={() => {
                      setEditData(mhs);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() =>
                      setMahasiswa(mahasiswa.filter((item) => item.nim !== mhs.nim))
                    }
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FormMahasiswa
          onSubmit={editData ? updateMahasiswa : addMahasiswa}
          editData={editData}
        />
      </Modal>
    </div>
  );
};

export default Mahasiswa;
