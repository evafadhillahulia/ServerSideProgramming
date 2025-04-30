// ToastHelper.js => src/Utils/Helpers/ToastHelper.js

import { toast } from "react-hot-toast";

const toastOption = {
  duration: 3000,
  position: "top-right",
};

export const toastSuccess = (message) => toast.success(message, toastOption);
export const toastError = (message) => toast.error(message, toastOption);
export const toastInfo = (message) => toast(message, toastOption);
