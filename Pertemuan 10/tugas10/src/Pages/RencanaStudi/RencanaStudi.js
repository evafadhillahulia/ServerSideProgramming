import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Button from "../../Components/Button";
import ModalRencanaStudi from "./RencanaStudiModal";
import TableRencanaStudi from "./RencanaStudiTable";
import {
  getAllKelas,
  storeKelas,
  updateKelas,
  deleteKelas,
} from "../../Utils/Helpers/Apis/KelasApi";
import { getAllMahasiswa } from "../../Utils/Helpers/Apis/MahasiswaApi";
import { getAllDosen } from "../../Utils/Helpers/Apis/DosenApi";
import { getAllMataKuliah } from "../../Utils/Helpers/Apis/MataKuliahApi";

const RencanaStudi = () => {
  const [kelas, setKelas] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);
  const [form, setForm] = useState({ mata_kuliah_id: "", dosen_id: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMhs, setSelectedMhs] = useState({});
  const [selectedDsn, setSelectedDsn] = useState({});
  const [selectedMatkul, setSelectedMatkul] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const showCustomToast = (message, type = "success") => {
    toast.custom(
      () => (
        <div
          className="flex items-center gap-3"
          style={{
            background:
              type === "success"
                ? "#4ade80"
                : type === "error"
                ? "#f87171"
                : "#fcd34d",
            color: "#1e3a8a",
            fontWeight: "bold",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "16px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}
        >
          <span>
            {type === "success" ? "✅" : type === "error" ? "❌" : "⚠️"}
          </span>
          <span>{message}</span>
        </div>
      ),
      {
        position: "top-center",
        duration: 3000,
      }
    );
  };

  const fetchData = useCallback(async () => {
    try {
      const [resKelas, resDosen, resMahasiswa, resMataKuliah] =
        await Promise.all([
          getAllKelas(),
          getAllDosen(),
          getAllMahasiswa(),
          getAllMataKuliah(),
        ]);
      setKelas(resKelas.data);
      setDosen(resDosen.data);
      setMahasiswa(resMahasiswa.data);
      setMataKuliah(resMataKuliah.data);
    } catch (err) {
      showCustomToast("Gagal mengambil data.", "error");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const mataKuliahSudahDipakai = kelas.map((k) => k.mata_kuliah_id);
  const mataKuliahBelumAdaKelas = mataKuliah.filter(
    (m) => !mataKuliahSudahDipakai.includes(m.id)
  );

  const getMaxSks = (id) => mahasiswa.find((m) => m.id === id)?.maxSKS || 0;
  const getDosenMaxSks = (id) => dosen.find((d) => d.id === id)?.maxSKS || 0;

  const handleAddMahasiswa = async (kelasItem, mhsId) => {
    if (!mhsId)
      return showCustomToast("Silakan pilih mahasiswa terlebih dahulu.", "error");

    const matkul = mataKuliah.find((m) => m.id === kelasItem.mata_kuliah_id);
    const sks = matkul?.sks || 0;

    const totalSks = kelas
      .filter((k) => (k.mahasiswa_ids || []).includes(mhsId))
      .map(
        (k) => mataKuliah.find((m) => m.id === k.mata_kuliah_id)?.sks || 0
      )
      .reduce((a, b) => a + b, 0);

    const maxSks = getMaxSks(mhsId);
    if (totalSks + sks > maxSks)
      return showCustomToast(`SKS melebihi batas maksimal (${maxSks})`, "error");

    if ((kelasItem.mahasiswa_ids || []).includes(mhsId))
      return showCustomToast("Mahasiswa sudah terdaftar", "error");

    await updateKelas(kelasItem.id, {
      ...kelasItem,
      mahasiswa_ids: [...(kelasItem.mahasiswa_ids || []), mhsId],
    });

    showCustomToast("Mahasiswa ditambahkan", "success");
    setSelectedMhs((prev) => ({ ...prev, [kelasItem.id]: "" }));
    fetchData();
  };

  const handleDeleteMahasiswa = async (kelasItem, mhsId) => {
    const updated = {
      ...kelasItem,
      mahasiswa_ids: kelasItem.mahasiswa_ids.filter((id) => id !== mhsId),
    };
    await updateKelas(kelasItem.id, updated);
    showCustomToast("Mahasiswa dihapus", "success");
    fetchData();
  };

  const handleChangeDosen = async (kelasItem) => {
    const dsnId = selectedDsn[kelasItem.id];
    if (!dsnId) return;

    if (dsnId === kelasItem.dosen_id)
      return showCustomToast("Dosen tidak berubah", "warning");

    const totalSksDosen = kelas
      .filter((k) => k.dosen_id === dsnId && k.id !== kelasItem.id)
      .map((k) => mataKuliah.find((m) => m.id === k.mata_kuliah_id)?.sks || 0)
      .reduce((a, b) => a + b, 0);

    const kelasSks =
      mataKuliah.find((m) => m.id === kelasItem.mata_kuliah_id)?.sks || 0;
    const maxSks = getDosenMaxSks(dsnId);

    if (totalSksDosen + kelasSks > maxSks)
      return showCustomToast(`Dosen melebihi batas maksimal SKS (${maxSks})`, "error");

    await updateKelas(kelasItem.id, { ...kelasItem, dosen_id: dsnId });
    showCustomToast("Dosen diperbarui", "success");
    fetchData();
  };

  const handleChangeMatkul = async (kelasItem) => {
    const newMatkulId = selectedMatkul[kelasItem.id];
    if (!newMatkulId)
      return showCustomToast("Pilih mata kuliah terlebih dahulu", "error");

    if (newMatkulId === kelasItem.mata_kuliah_id)
      return showCustomToast("Mata kuliah tidak berubah", "warning");

    const matkulDipakai = kelas.some(
      (k) => k.id !== kelasItem.id && k.mata_kuliah_id === newMatkulId
    );

    if (matkulDipakai)
      return showCustomToast("Mata kuliah ini sudah diajar oleh dosen lain!", "error");

    await updateKelas(kelasItem.id, {
      ...kelasItem,
      mata_kuliah_id: newMatkulId,
    });

    showCustomToast("Mata kuliah berhasil diperbarui", "success");
    fetchData();
  };

  const handleDeleteKelas = async (kelasId) => {
    const kls = kelas.find((k) => k.id === kelasId);
    const matkul = mataKuliah.find((m) => m.id === kls?.mata_kuliah_id);
    const namaMatkul = matkul?.nama || "kelas ini";

    const result = await Swal.fire({
      title: "Konfirmasi Hapus",
      text: `Yakin ingin menghapus Kelas ${namaMatkul}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      await deleteKelas(kelasId);
      showCustomToast("Kelas berhasil dihapus", "success");
      fetchData();
    }
  };

  const openAddModal = () => {
    setForm({ mata_kuliah_id: "", dosen_id: "" });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.mata_kuliah_id || !form.dosen_id)
      return showCustomToast("Form tidak lengkap", "error");

    const matkulDipakai = kelas.some(
      (k) => k.mata_kuliah_id === form.mata_kuliah_id
    );

    if (matkulDipakai) {
      return showCustomToast(
        "Mata kuliah sudah memiliki dosen pengampu!",
        "error"
      );
    }

    await storeKelas({ ...form, mahasiswa_ids: [] });
    showCustomToast("Kelas ditambahkan", "success");
    setIsModalOpen(false);
    fetchData();
  };

  const filteredKelas = kelas.filter((kls) => {
    const matkul =
      mataKuliah.find((m) => m.id === kls.mata_kuliah_id)?.nama?.toLowerCase() ||
      "";
    const dsn = dosen.find((d) => d.id === kls.dosen_id)?.nama?.toLowerCase() || "";
    return (
      matkul.includes(searchTerm.toLowerCase()) ||
      dsn.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Daftar Rencana Studi</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari nama atau kode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={openAddModal}>
            + Tambah Kelas
          </Button>
        </div>
      </div>

      <TableRencanaStudi
        kelas={filteredKelas}
        mahasiswa={mahasiswa}
        dosen={dosen}
        mataKuliah={mataKuliah}
        selectedMhs={selectedMhs}
        setSelectedMhs={setSelectedMhs}
        selectedDsn={selectedDsn}
        setSelectedDsn={setSelectedDsn}
        handleAddMahasiswa={handleAddMahasiswa}
        handleDeleteMahasiswa={handleDeleteMahasiswa}
        handleChangeDosen={handleChangeDosen}
        handleDeleteKelas={handleDeleteKelas}
        selectedMatkul={selectedMatkul}
        setSelectedMatkul={setSelectedMatkul}
        handleChangeMatkul={handleChangeMatkul}
      />

      <ModalRencanaStudi
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChange={handleChange}
        onSubmit={handleSubmit}
        form={form}
        dosen={dosen}
        mataKuliah={mataKuliahBelumAdaKelas}
        kelas={kelas}
      />
    </div>
  );
};

export default RencanaStudi;
