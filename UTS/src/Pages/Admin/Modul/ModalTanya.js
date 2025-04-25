// src/Pages/Admin/Modul/ModalTanya.js

import React, { useRef } from "react";
import { toast } from "react-toastify";
import Modal from "../../../Components/Modal"; 


const ModalTanya = ({ question, setQuestion, submitQuestion, setAskId }) => {
  const isSubmitting = useRef(false); 

  const handleSubmit = () => {
    if (question.trim() && !isSubmitting.current) {
      isSubmitting.current = true; 
      submitQuestion(); 
    } else if (!question.trim()) {
      toast.error("Tolong isi pertanyaan terlebih dahulu");
    }
  };

  return (
    <Modal
      isOpen={!!setAskId} 
      onClose={() => setAskId(null)} 
      title="Tanya Dosen"
    >
      <textarea
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-lg placeholder-gray-500"
        rows="6"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Tanyakan pertanyaanmu..."
      />
      <div className="flex justify-end gap-6 mt-6">
        <button
          className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 focus:outline-none transition-all duration-200 transform hover:scale-105"
          onClick={() => setAskId(null)} // Close modal
        >
          Batal
        </button>
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none transition-all duration-200 transform hover:scale-105"
          onClick={handleSubmit} 
        >
          Kirim
        </button>
      </div>
    </Modal>
  );
};

export default ModalTanya;
