import axios from "../../../Utils/Helpers/AxiosInstance";

// Ambil semua matakuliah
export const getAllMataKuliah = () => axios.get("/matakuliah");

// Ambil 1 matakuliah
export const getMataKuliah = (id) => axios.get(`/matakuliah/${id}`);

// Tambah mataKuliah
export const storeMataKuliah= (data) => axios.post("/matakuliah", data);

// Update mataKuliah
export const updateMataKuliah= (id, data) => axios.put(`/matakuliah/${id}`, data);

// Hapus mataKuliah
export const deleteMataKuliah = (id) => axios.delete(`/matakuliah/${id}`);