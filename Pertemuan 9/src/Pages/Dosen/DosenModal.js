import React, { useState, useEffect } from "react";

const DosenModal = ({
  isModalOpen,
  onClose,
  onSubmit,
  selectedDosen,
}) => {
  const [form, setForm] = useState({

    id: "",
    nip: "",
    nama: "",
    email: "",
    maxSKS: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedDosen) {
      setForm(selectedDosen);
    } else {
      setForm({ id:"", nip: "", nama: "", email: "", maxSKS: ""});
    }
  }, [selectedDosen, isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!form.nip) tempErrors.nip = "NIP wajib diisi";
    if (!form.nama) tempErrors.nama = "Nama  wajib diisi";
    if (!form.email) tempErrors.email = "Email wajib diisi";
    if (!form.maxSKS) tempErrors.maxSKS = "Maksimal wajib diisi";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
      onClose();
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {selectedDosen ? "Edit Dosen" : "Tambah Dosen"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">NIP</label>
            <input
              type="text"
              name="nip"
              value={form.nip}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              disabled={!!selectedDosen}
            />
            {errors.nip && (
              <p className="text-red-500 text-sm mt-1">{errors.nip}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Nama</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.nama && (
              <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Maksimal SKS</label>
            <input
              type="number"
              name="maxSKS"
              value={form.maxSKS}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.maxSKS && (
              <p className="text-red-500 text-sm mt-1">{errors.maxSKS}</p>
            )}
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
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DosenModal;
