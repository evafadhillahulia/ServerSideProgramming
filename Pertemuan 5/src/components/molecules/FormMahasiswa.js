// FormMahasiswa.js => src/components/molecules/FormMahasiswa.js

import React, { useState, useEffect } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const FormMahasiswa = ({ onSubmit, editData, onClose }) => {
  const [formData, setFormData] = useState({
    nim: "",
    nama: "",
    status: true,
  });
  const [oldNim, setOldNim] = useState("");

  // ✅ Menangani perubahan input
  const handleChange = (e) => {
    const { id, value } = e.target;

    // khusus status, karena bentuknya boolean
    if (id === "status") {
      setFormData((prevData) => ({
        ...prevData,
        status: value === "true",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  // ✅ Menyimpan data
  const handleSubmit = (e) => {
    e.preventDefault();

    const { nim, nama, status } = formData;

    if (!nim || !nama) {
      alert("NIM dan Nama harus diisi!");
      return;
    }

    if (nim.length < 4) {
      alert("NIM minimal 4 karakter");
      return;
    }

    const updatedData = { nim, nama, status };

    if (editData) {
      onSubmit({ ...updatedData, oldNim });
    } else {
      onSubmit(updatedData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ nim: "", nama: "", status: true });
    setOldNim("");
  };

  const handleCancel = () => {
    resetForm();
    if (onClose) onClose();
  };

  useEffect(() => {
    if (editData) {
      setFormData({
        nim: editData.nim,
        nama: editData.nama,
        status: editData.status,
      });
      setOldNim(editData.nim);
    } else {
      resetForm();
    }
  }, [editData]);

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <Label htmlFor="nim">NIM</Label>
        <Input
          type="text"
          id="nim"
          value={formData.nim}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="nama">Nama</Label>
        <Input
          type="text"
          id="nama"
          value={formData.nama}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          className="w-full border rounded p-2"
          value={formData.status ? "true" : "false"}
          onChange={handleChange}
        >
          <option value="true">Aktif</option>
          <option value="false">Tidak Aktif</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button
          type="button"
          className="bg-gray-400 text-white"
          onClick={handleCancel}
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
