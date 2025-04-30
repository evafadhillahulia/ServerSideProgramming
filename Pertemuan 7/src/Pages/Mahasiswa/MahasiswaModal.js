// MahasiswaModal.js => src/Pages/Mahasiswa/MahasiswaModal.js

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const MahasiswaModal = ({ isOpen, selectedMahasiswa, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    nim: "",
    nama: "",
    status: "true",
  });

  // useEffect: handle isi form berdasarkan selectedMahasiswa
  useEffect(() => {
    if (selectedMahasiswa) {
      setForm({
        nim: selectedMahasiswa.nim || "",
        nama: selectedMahasiswa.nama || "",
        status: selectedMahasiswa.status ? "true" : "false",
      });
    } else {
      setForm({
        nim: "",
        nama: "",
        status: "true",
      });
    }
  }, [selectedMahasiswa]);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Form Validasi + Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi dasar
    if (!form.nim || !form.nama) {
      alert("NIM dan Nama harus diisi!");
      return;
    }

    if (!/^\d+$/.test(form.nim)) {
      alert("NIM harus berupa angka!");
      return;
    }

    if (form.nim.length < 8) {
      alert("NIM minimal 8 digit!");
      return;
    }

    onSubmit({
      nim: form.nim,
      nama: form.nama,
      status: form.status === "true",
    });
    onClose();
  };

  // Jika modal tidak dibuka
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Form Mahasiswa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">NIM</label>
            <input
              type="text"
              name="nim"
              value={form.nim}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Nama</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="true">Aktif</option>
              <option value="false">Tidak Aktif</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

MahasiswaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  selectedMahasiswa: PropTypes.shape({
    nim: PropTypes.string,
    nama: PropTypes.string,
    status: PropTypes.bool,
  }),
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MahasiswaModal;
