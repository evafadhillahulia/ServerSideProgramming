import axios from "../../../Utils/Helpers/AxiosInstance";

export const getAllMataKuliah = () => axios.get("/matakuliah");

export const getMataKuliah = (id) => axios.get(`/matakuliah/${id}`);

export const storeMataKuliah= (data) => axios.post("/matakuliah", data);

export const updateMataKuliah= (id, data) => axios.put(`/matakuliah/${id}`, data);

export const deleteMataKuliah = (id) => axios.delete(`/matakuliah/${id}`);