//src/Components/FormMahasiswa.js

import React, { useState, useEffect } from "react";
import Label from "../Components/Label";
import Input from "../Components/Input";
import Button from "../Components/Button";
import PropTypes from "prop-types";

const FormMahasiswa = ({ onSubmit, editData, onClose }) => {
  const [formData, setFormData] = useState({
    nim: "",
    nama: "",
    status: true,
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        nim: editData.nim || "",
        nama: editData.nama || "",
        status: typeof editData.status === "boolean" ? editData.status : true,
      });
    } else {
      resetForm();
    }
  }, [editData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "status" ? value === "true" : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nim, nama } = formData;

    if (!nim || !nama) {
      alert("NIM dan Nama harus diisi!");
      return;
    }

    if (nim.length < 4) {
      alert("NIM minimal 4 karakter");
      return;
    }

    onSubmit(formData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ nim: "", nama: "", status: true });
  };

  const handleCancel = () => {
    resetForm();
    if (onClose) onClose();
  };

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

FormMahasiswa.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  editData: PropTypes.shape({
    nim: PropTypes.string,
    nama: PropTypes.string,
    status: PropTypes.bool,
  }),
};

export default FormMahasiswa;
