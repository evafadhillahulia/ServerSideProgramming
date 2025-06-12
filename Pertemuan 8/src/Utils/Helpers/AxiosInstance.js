import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // *** INI PENTING! Menunjuk ke JSON Server ***
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export default AxiosInstance;