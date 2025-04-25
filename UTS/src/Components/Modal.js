// src/Components/Modal.js

import React from "react";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null; // Modal tidak ditampilkan jika isOpen false

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96 max-w-md transform transition-all scale-95 hover:scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-600">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
