// Mahasiswa.js => src/pages/Mahasiswa.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import Modal from "../components/molecules/Modal";
import FormMahasiswa from "../components/molecules/FormMahasiswa";

const Mahasiswa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();

  // Load data dari localStorage atau pakai dummy jika kosong
  useEffect(() => {
    const savedData = localStorage.getItem("mahasiswa");
    if (savedData && JSON.parse(savedData).length > 0) {
      setMahasiswa(JSON.parse(savedData));
    } else {
      const dummyData = [
        { nim: "A11.2022.14283", nama: "Eva Fadhillah", status: true },
        { nim: "A11.2022.14284", nama: "Ini TugasKu", status: false },
      ];
      setMahasiswa(dummyData);
      localStorage.setItem("mahasiswa", JSON.stringify(dummyData));
    }
  }, []);

  // Simpan ke localStorage setiap kali data berubah
  useEffect(() => {
    localStorage.setItem("mahasiswa", JSON.stringify(mahasiswa));
  }, [mahasiswa]);

  // Tambah Mahasiswa dengan Validasi
  const addMahasiswa = (newData) => {
    if (!newData.nim || !newData.nama) {
      alert("NIM dan Nama harus diisi!");
      return;
    }

    const exist = mahasiswa.find((mhs) => mhs.nim === newData.nim);
    if (exist) {
      alert("NIM sudah digunakan!");
      return;
    }

    setMahasiswa([...mahasiswa, newData]);
    setIsModalOpen(false);
  };

  // Update Mahasiswa dengan Validasi & Konfirmasi
  const updateMahasiswa = (updatedData) => {
    if (!updatedData.nim || !updatedData.nama) {
      alert("NIM dan Nama harus diisi!");
      return;
    }

    const isSameNIM = editData?.nim === updatedData.nim;
    const exist = mahasiswa.find(
      (mhs) => mhs.nim === updatedData.nim && !isSameNIM
    );
    if (exist) {
      alert("NIM sudah digunakan oleh mahasiswa lain!");
      return;
    }

    const confirmUpdate = window.confirm(
      `Yakin ingin mengupdate data mahasiswa NIM ${editData?.nim}?`
    );
    if (!confirmUpdate) return;

    setMahasiswa(
      mahasiswa.map((mhs) =>
        mhs.nim === editData.nim ? updatedData : mhs
      )
    );
    setIsModalOpen(false);
    setEditData(null);
  };

  // Hapus Mahasiswa dengan Konfirmasi
  const deleteMahasiswa = (nim) => {
    const mhs = mahasiswa.find((m) => m.nim === nim);
    const confirmDelete = window.confirm(
      `Yakin ingin menghapus data mahasiswa "${mhs?.nama}" (NIM: ${nim})?`
    );
    if (confirmDelete) {
      setMahasiswa(mahasiswa.filter((item) => item.nim !== nim));
    }
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
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                Belum ada data mahasiswa
              </td>
            </tr>
          ) : (
            mahasiswa.map((mhs) => (
              <tr key={mhs.nim} className="even:bg-gray-100 odd:bg-white">
                <td className="py-2 px-4">{mhs.nim}</td>
                <td className="py-2 px-4">{mhs.nama}</td>
                <td className="py-2 px-4">
                  {mhs.status ? "Aktif" : "Tidak Aktif"}
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
                    onClick={() => {
                      const confirmEdit = window.confirm(
                        `Edit data mahasiswa "${mhs.nama}"?`
                      );
                      if (confirmEdit) {
                        setEditData(mhs);
                        setIsModalOpen(true);
                      }
                    }}
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
