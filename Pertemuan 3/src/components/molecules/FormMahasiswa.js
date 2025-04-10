// Form Mahasiswa Component

import React, { useState, useEffect } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const FormMahasiswa = ({ onSubmit, editData, onClose }) => {
  const [nim, setNim] = useState(""); // State untuk NIM
  const [nama, setNama] = useState(""); // State untuk Nama
  const [oldNim, setOldNim] = useState(""); // Simpan NIM lama

  // Saat editData berubah, isi form dengan data yang sedang diedit
  useEffect(() => {
    if (editData) {
      setNim(editData.nim);
      setOldNim(editData.nim); // Simpan NIM lama
      setNama(editData.nama);
    } else {
      setNim("");
      setNama("");
      setOldNim("");
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nim || !nama) {
      alert("NIM dan Nama harus diisi!");
      return;
    }

    const updatedData = { nim, nama };

    // Jika NIM berubah, pastikan data lama dihapus dari state
    if (editData && oldNim !== nim) {
      onSubmit({ ...updatedData, oldNim }); // Kirim oldNim agar bisa dihapus dari list
    } else {
      onSubmit(updatedData);
    }

    setNim(""); // Reset input setelah submit
    setNama("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <Label htmlFor="nim">NIM</Label>
        <input
          type="text"
          id="nim"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div>
        <Label htmlFor="nama">Nama</Label>
        <input
          type="text"
          id="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button
          text="Batal"
          className="bg-gray-400 text-white"
          onClick={onClose}
        >
          Batal
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {editData ? "Simpan Perubahan" : "Simpan"}
        </Button>
      </div>
    </form>
  );
};

export default FormMahasiswa;
