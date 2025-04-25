// src/Utils/Helpers/SwalHelpers.js

import Swal from 'sweetalert2'; // Mengimpor SweetAlert2 untuk menampilkan pop-up notifikasi yang interaktif

// Fungsi untuk menampilkan pop-up sukses
export const showSuccess = (title, text) => {
  Swal.fire({
    icon: 'success', // Menampilkan ikon sukses (warna hijau)
    title: title,    // Menampilkan judul yang disesuaikan dengan parameter
    text: text,      // Menampilkan teks yang disesuaikan dengan parameter
    confirmButtonText: 'OK', // Menampilkan tombol konfirmasi dengan teks "OK"
  });
};

// Fungsi untuk menampilkan pop-up error
export const showError = (title, text) => {
  Swal.fire({
    icon: 'error', // Menampilkan ikon error (warna merah)
    title: title,  // Menampilkan judul yang disesuaikan dengan parameter
    text: text,    // Menampilkan teks yang disesuaikan dengan parameter
    confirmButtonText: 'OK', // Menampilkan tombol konfirmasi dengan teks "OK"
  });
};

// Fungsi untuk menampilkan pop-up konfirmasi (Yes/No)
export const showConfirm = (title, text) => {
  return Swal.fire({
    title: title,    // Menampilkan judul yang disesuaikan dengan parameter
    text: text,      // Menampilkan teks yang disesuaikan dengan parameter
    icon: 'warning', // Menampilkan ikon peringatan (warna kuning)
    showCancelButton: true, // Menampilkan tombol Cancel (Batal)
    confirmButtonText: 'Yes', // Teks tombol konfirmasi (Yes)
    cancelButtonText: 'No',  // Teks tombol pembatalan (No)
  });
};

// Fungsi untuk menampilkan pop-up input teks
export const showInput = () => {
  return Swal.fire({
    title: 'Input your question',
    input: 'text', 
    inputPlaceholder: 'Enter question', 
    showCancelButton: true, 
  });
};

export const showLoading = () => {
  return Swal.fire({
    title: 'Loading...', 
    text: 'Please wait', 
    didOpen: () => {
      Swal.showLoading(); 
    },
  });
};
