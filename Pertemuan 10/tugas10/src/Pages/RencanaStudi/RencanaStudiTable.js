import React from "react";

export default function TableRencanaStudi({
  kelas,
  mahasiswa,
  dosen,
  mataKuliah,
  selectedMhs,
  setSelectedMhs,
  selectedDsn,
  setSelectedDsn,
  selectedMatkul,
  setSelectedMatkul,
  handleAddMahasiswa,
  handleDeleteMahasiswa,
  handleChangeDosen,
  handleChangeMatkul,
  handleDeleteKelas,
}) {
  return (
    <div className="space-y-6">
      {kelas.map((kls) => {
        const matkul = mataKuliah.find(
          (m) => m.id.toString() === kls.mata_kuliah_id?.toString()
        );
        const dosenPengampu = dosen.find(
          (d) => d.id.toString() === kls.dosen_id?.toString()
        );
        const mhsInClass = (kls.mahasiswa_ids || kls.mahasiswaIds || [])
          .map((id) =>
            mahasiswa.find((m) => m.id.toString() === id.toString())
          )
          .filter(Boolean);

        return (
          <div
            key={kls.id}
            className="border rounded-lg shadow-md bg-white transition hover:shadow-lg"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b bg-gray-50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">Mata Kuliah</p>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {matkul?.nama || "-"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-3">Dosen Pengampu</p>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {dosenPengampu?.nama || "-"}
                  </h3>
                </div>
                {mhsInClass.length === 0 && (
                  <button
                    onClick={() => handleDeleteKelas(kls.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm"
                  >
                    Hapus Kelas
                  </button>
                )}
              </div>
              <div className="mt-4 flex flex-col lg:flex-row flex-wrap gap-3">
                {/* Mata Kuliah */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={selectedMatkul[kls.id] || ""}
                    onChange={(e) =>
                      setSelectedMatkul({
                        ...selectedMatkul,
                        [kls.id]: e.target.value,
                      })
                    }
                    className="w-64 px-3 py-1.5 border border-gray-300 rounded text-gray-800"
                  >
                    <option value="">-- Ganti Mata Kuliah --</option>
                    {mataKuliah.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nama}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleChangeMatkul(kls)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded text-sm"
                  >
                    Simpan Mata Kuliah
                  </button>
                </div>

                {/* Dosen */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={selectedDsn[kls.id] || ""}
                    onChange={(e) =>
                      setSelectedDsn({
                        ...selectedDsn,
                        [kls.id]: e.target.value,
                      })
                    }
                    className="w-64 px-3 py-1.5 border border-gray-300 rounded text-gray-800"
                  >
                    <option value="">-- Ganti Dosen --</option>
                    {dosen.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.nama}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleChangeDosen(kls)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm"
                  >
                    Simpan Dosen
                  </button>
                </div>
              </div>
            </div>

            {/* Tabel Mahasiswa */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">No</th>
                    <th className="py-2 px-4 text-left">Nama</th>
                    <th className="py-2 px-4 text-left">NIM</th>
                    <th className="py-2 px-4 text-center">Total SKS</th>
                    <th className="py-2 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {mhsInClass.length > 0 ? (
                    mhsInClass.map((m, i) => {
                      const totalSks = kelas
                        .filter((k) =>
                          (k.mahasiswa_ids || []).includes(m.id)
                        )
                        .map(
                          (k) =>
                            mataKuliah.find(
                              (mk) =>
                                mk.id.toString() ===
                                k.mata_kuliah_id?.toString()
                            )?.sks || 0
                        )
                        .reduce((a, b) => a + b, 0);

                      return (
                        <tr
                          key={m.id}
                          className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="py-2 px-4">{i + 1}</td>
                          <td className="py-2 px-4 text-gray-800">{m.nama}</td>
                          <td className="py-2 px-4 text-gray-700">{m.nim}</td>
                          <td className="py-2 px-4 text-center">{totalSks}</td>
                          <td className="py-2 px-4 text-center">
                            <button
                              onClick={() =>
                                handleDeleteMahasiswa(kls, m.id)
                              }
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-3 px-4 text-center italic text-gray-500"
                      >
                        Belum ada mahasiswa.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Tambah Mahasiswa */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-6 py-4 border-t bg-gray-50">
              <select
                value={selectedMhs[kls.id] || ""}
                onChange={(e) =>
                  setSelectedMhs({
                    ...selectedMhs,
                    [kls.id]: e.target.value,
                  })
                }
                className="w-full sm:w-64 px-3 py-1.5 border border-gray-300 rounded text-gray-800"
              >
                <option value="">-- Pilih Mahasiswa --</option>
                {mahasiswa.map((m) => {
                  const totalSksMahasiswa = kelas
                    .filter((k) =>
                      (k.mahasiswa_ids || []).includes(m.id)
                    )
                    .map(
                      (k) =>
                        mataKuliah.find(
                          (mk) =>
                            mk.id.toString() ===
                            k.mata_kuliah_id?.toString()
                        )?.sks || 0
                    )
                    .reduce((a, b) => a + b, 0);

                  const maxSks = m.maxSKS || 0;

                  return (
                    <option key={m.id} value={m.id}>
                      {m.nama} ({m.nim}) - {totalSksMahasiswa} / {maxSks} SKS
                    </option>
                  );
                })}
              </select>
              <button
                onClick={() =>
                  handleAddMahasiswa(kls, selectedMhs[kls.id])
                }
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm"
              >
                Tambah Mahasiswa
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
