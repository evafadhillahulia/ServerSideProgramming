// Mahasiswa.js => src/Pages/Mahasiswa/Mahasiswa.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Mengimpor library untuk menampilkan toast notifikasi
import Swal from "sweetalert2"; // Mengimpor SweetAlert2 untuk menampilkan dialog konfirmasi
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import FormMahasiswa from "../../Components/FormMahasiswa";
import { dummyMahasiswa } from "../../Data/user"; // Import data dummy

const Mahasiswa = () => {
  const [isModalOpen, setModalOpen] = useState(false); // State untuk membuka dan menutup modal
  const [mahasiswaList, setMahasiswaList] = useState([]); // State untuk menyimpan daftar mahasiswa
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null); // State untuk menyimpan mahasiswa yang sedang dipilih untuk edit
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan kata pencarian
  const [currentPage, setCurrentPage] = useState(1); // State untuk menyimpan halaman yang sedang aktif
  const itemsPerPage = 5; // Menentukan jumlah mahasiswa yang ditampilkan per halaman

  const navigate = useNavigate();

  useEffect(() => {  // Mengambil data mahasiswa dari localStorage atau menggunakan data dummy jika tidak ada data
    const savedData = localStorage.getItem("mahasiswa");
    if (savedData && JSON.parse(savedData).length > 0) {
      setMahasiswaList(JSON.parse(savedData));  // Mengecek apakah data mahasiswa ada di localStorage
    } else { // Mengambil data mahasiswa dari localStorage
      setMahasiswaList(dummyMahasiswa); // Jika tidak ada, gunakan data dummy
      localStorage.setItem("mahasiswa", JSON.stringify(dummyMahasiswa));  // Menyimpan data dummy ke localStorage
    }
  }, []);

  useEffect(() => {  // Menyimpan daftar mahasiswa ke localStorage setiap kali daftar mahasiswa berubah
    localStorage.setItem("mahasiswa", JSON.stringify(mahasiswaList));
  }, [mahasiswaList]);

  const storeMahasiswa = (newData) => { // Fungsi untuk menyimpan data mahasiswa baru
    if (!newData.nim || !newData.nama) {  // Mengecek apakah NIM dan Nama diisi
      showTopCenterToast("NIM dan Nama harus diisi!"); // Menampilkan pesan error jika NIM atau Nama tidak diisi
      return;
    }

    const exist = mahasiswaList.find((mhs) => mhs.nim === newData.nim); // Mengecek apakah NIM sudah ada di daftar mahasiswa
    if (exist) {
      showTopCenterToast("NIM sudah digunakan!"); // Menampilkan pesan jika NIM sudah ada
      return;
    }

    setMahasiswaList([...mahasiswaList, newData]);  // Menambahkan mahasiswa baru ke dalam daftar mahasiswa
    setModalOpen(false); // Menutup modal setelah data berhasil ditambahkan
    showTopCenterToast("Data mahasiswa berhasil ditambahkan!"); // Menampilkan toast notifikasi sukses
  };

  const showTopCenterToast = (message, type = "success") => { // Fungsi untuk menampilkan toast notifikasi
    toast.custom(
      (t) => (
        <div
          className="flex items-center gap-3"
          style={{
            background: type === "success" ? "#4ade80" : type === "error" ? "#f87171" : "#fcd34d", // hijau / merah / kuning untuk error
            color: "#1e3a8a", // biru tua
            fontWeight: "bold",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "16px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}
        >
          <span>{type === "success" ? "✅" : type === "error" ? "❌" : "⚠️"}</span>
          <span>{message}</span> {/* Menampilkan pesan toast */}
        </div>
      ),
      {
        position: "top-center", // Menampilkan toast di bagian atas tengah layar
        duration: 3000,
      }
    );
  };  
  
  

  const updateMahasiswa = async (updatedData) => { // Fungsi untuk memperbarui data mahasiswa
    if (!updatedData.nim || !updatedData.nama) { // Mengecek apakah NIM dan Nama diisi
      showTopCenterToast("NIM dan Nama harus diisi!");
      return;
    }

    const isSameNIM = selectedMahasiswa?.nim === updatedData.nim;  // Mengecek apakah NIM yang diedit adalah NIM yang sama
    const exist = mahasiswaList.find(
      (mhs) => mhs.nim === updatedData.nim && !isSameNIM // Mengecek apakah NIM sudah ada di mahasiswa lain
    );
    if (exist) {
      showTopCenterToast("NIM sudah digunakan oleh mahasiswa lain!");
      return;
    }

    const result = await Swal.fire({ // Menampilkan SweetAlert untuk konfirmasi update data
      title: "Konfirmasi Update",
      text: `Yakin ingin mengupdate data mahasiswa NIM ${selectedMahasiswa?.nim}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Update!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) { // Jika pengguna mengonfirmasi, update daftar mahasiswa
      setMahasiswaList(
        mahasiswaList.map((mhs) =>
          mhs.nim === selectedMahasiswa.nim ? updatedData : mhs
        )
      );
      setModalOpen(false);
      setSelectedMahasiswa(null); // Menghapus mahasiswa yang dipilih untuk diedit
      showTopCenterToast("Data mahasiswa berhasil diupdate!");
    }
  };

  const deleteMahasiswa = async (nim) => { // Fungsi untuk menghapus data mahasiswa
    const mhs = mahasiswaList.find((m) => m.nim === nim); //  Mencari mahasiswa berdasarkan NIM

    const result = await Swal.fire({ // Menampilkan SweetAlert untuk konfirmasi hapus data
      title: "Konfirmasi Hapus",
      text: `Yakin ingin menghapus data mahasiswa "${mhs?.nama}" (NIM: ${nim})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) { // Jika pengguna mengonfirmasi, hapus mahasiswa dari daftar
      setMahasiswaList(mahasiswaList.filter((item) => item.nim !== nim));
      showTopCenterToast("Data mahasiswa berhasil dihapus!");
    }
  };

  const openAddModal = () => { // Fungsi untuk membuka modal tambah mahasiswa
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = async (mhs) => { // Fungsi untuk membuka modal edit mahasiswa
    const result = await Swal.fire({
      title: "Konfirmasi Edit",
      text: `Edit data mahasiswa "${mhs.nama}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Edit!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setSelectedMahasiswa(mhs);
      setModalOpen(true);
    }
  };

  const handleSubmit = (data) => { // Fungsi untuk menangani pengiriman data dari form
    if (selectedMahasiswa) {
      updateMahasiswa(data);
    } else {
      storeMahasiswa(data);
    }
  };

  const filteredMahasiswa = mahasiswaList.filter((mhs) => // Mencari mahasiswa berdasarkan NIM atau Nama
    mhs.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mhs.nim.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage; // Menghitung indeks item terakhir
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Menghitung indeks item pertama
  const currentMahasiswa = filteredMahasiswa.slice(indexOfFirstItem, indexOfLastItem); // Mengambil mahasiswa yang ditampilkan pada halaman saat ini
  const totalPages = Math.ceil(filteredMahasiswa.length / itemsPerPage);

  const handlePrevious = () => { // Fungsi untuk menangani tombol Previous
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => { // Fungsi untuk menangani tombol Next
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return ( 
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Daftar Mahasiswa</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari nama atau NIM..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={openAddModal}
          >
            + Tambah Mahasiswa
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">NIM</th>
              <th className="py-3 px-4 text-left">Nama</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentMahasiswa.length === 0 ? ( // Jika tidak ada mahasiswa yang sesuai dengan pencarian
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  Tidak ada data mahasiswa yang sesuai
                </td>
              </tr>
            ) : (
              currentMahasiswa.map((mhs) => ( // Menampilkan daftar mahasiswa
                <tr key={mhs.nim} className="even:bg-gray-100 odd:bg-white">
                  <td className="py-2 px-4 font-medium">{mhs.nim}</td>
                  <td className="py-2 px-4">{mhs.nama}</td>
                  <td className="py-2 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${mhs.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {mhs.status ? "Aktif" : "Tidak Aktif"}
                    </span>
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
                      onClick={() => openEditModal(mhs)}
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
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-sm text-gray-600 text-center md:text-left">
          Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredMahasiswa.length)} dari {filteredMahasiswa.length} mahasiswa //
        </p>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <Button
              className={`px-4 py-2 rounded-full ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              ⬅ Previous
            </Button>
            <Button
              className={`px-4 py-2 rounded-full ${currentPage === totalPages || totalPages === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next ➡
            </Button>
          </div>
          <span className="text-sm text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </span>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <FormMahasiswa onSubmit={handleSubmit} editData={selectedMahasiswa} />
      </Modal>
    </div>
  );
};

export default Mahasiswa;
