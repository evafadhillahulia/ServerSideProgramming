// src/pages/mahasiswa/MahasiswaTable.js

import React from "react";
import PropTypes from "prop-types";

const MahasiswaTable = ({
  mahasiswa = [],
  onDelete,
  openEditModal,
  totalPages = 1,
  currentPage = 1,
  paginate,
}) => {
  const handleDelete = (nim) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      onDelete(nim);
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-md">
        <thead className="bg-gray-200 text-gray-800">
          <tr>
            <th className="px-4 py-2 border">No</th>
            <th className="px-4 py-2 border">NIM</th>
            <th className="px-4 py-2 border">Nama</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                Tidak ada data mahasiswa
              </td>
            </tr>
          ) : (
            mahasiswa.map((mhs, index) => (
              <tr key={mhs.nim} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  {(currentPage - 1) * mahasiswa.length + index + 1}
                </td>
                <td className="px-4 py-2 border">{mhs.nim}</td>
                <td className="px-4 py-2 border">{mhs.nama}</td>
                <td className="px-4 py-2 border">
                  {mhs.status ? "Aktif" : "Tidak Aktif"}
                </td>
                <td className="px-4 py-2 border text-center space-x-2">
                  <button
                    onClick={() => openEditModal(mhs)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mhs.nim)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Prev
            </button>
          )}

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              } hover:bg-blue-500`}
            >
              {index + 1}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

MahasiswaTable.propTypes = {
  mahasiswa: PropTypes.arrayOf(
    PropTypes.shape({
      nim: PropTypes.string.isRequired,
      nama: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  paginate: PropTypes.func,
};

export default MahasiswaTable;
