// src/Utils/Helpers/ToastHelpers.js

import { toast } from 'react-toastify';

// Fungsi untuk menampilkan toast success
export const showToastSuccess = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast-success",
    bodyClassName: "custom-toast-body",
  });
};

// Fungsi untuk menampilkan toast error
export const showToastError = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast-error",
  });
};

// Fungsi untuk menampilkan toast info
export const showToastInfo = (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Fungsi untuk menampilkan toast warning
export const showToastWarning = (message) => {
  toast.warning(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
