import Button from "../../Components/Button";

const ModalRencanaStudi = ({
  isOpen,
  onClose,
  onSubmit,
  onChange,
  form,
  dosen,
  mataKuliah,
  kelas,
}) => {
  if (!isOpen) return null;

  // Ambil ID dari mata kuliah yang sudah digunakan dalam kelas
  const mataKuliahSudahDipakai = kelas.map((k) => k.mata_kuliah_id);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Tambah Kelas Baru</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={onSubmit} className="p-4 space-y-4">
          {/* Mata Kuliah */}
          <div>
            <label
              htmlFor="mata_kuliah_id"
              className="block font-medium text-sm text-gray-700"
            >
              Mata Kuliah
            </label>
            <select
              name="mata_kuliah_id"
              value={form.mata_kuliah_id}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Pilih Mata Kuliah --</option>
              {mataKuliah.map((m) => {
                const sudahDipakai = mataKuliahSudahDipakai.includes(m.id);
                return (
                  <option key={m.id} value={m.id} disabled={sudahDipakai}>
                    {m.nama} {sudahDipakai ? "(Sudah memiliki dosen)" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Dosen */}
          <div>
            <label
              htmlFor="dosen_id"
              className="block font-medium text-sm text-gray-700"
            >
              Dosen Pengampu
            </label>
            <select
              name="dosen_id"
              value={form.dosen_id}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Pilih Dosen --</option>
              {dosen.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Batal
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRencanaStudi;
