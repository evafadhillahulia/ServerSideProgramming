// src/Pages/Admin/Modul/Modul.js

import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalTanya from "../../../Pages/Admin/Modul/ModalTanya"; 
import Card from "../../../Components/Card"; 
import ProgressBar from "../../../Components/ProgressBar";  
import { modulList as initialList } from "../../../Data/DummyModul";
import { showToastSuccess, showToastError } from "../../../Utils/Helpers/ToatsHelpers"; // Import helper untuk toast success/error
import { showSuccess } from "../../../Utils/Helpers/SwalHelpers";  // Import helper untuk SweetAlert success

const Modul = () => {
  /// Baca daftar modul yang tersimpan di localStorage
  const saved = JSON.parse(localStorage.getItem("modulList"));
  const [modulList, setModulList] = useState(
    Array.isArray(saved) && saved.length > 0 ? saved : initialList
  );

  const [askId, setAskId] = useState(null);  // State untuk menyimpan ID modul yang sedang di-tanya
  const [question, setQuestion] = useState("");  // State untuk menyimpan teks pertanyaan
  const [activeIndex, setActiveIndex] = useState(null); // State untuk menyimpan modul mana yang accordion-nya terbuka


  // Hitung total modul dan berapa yang sudah selesai
  const total = modulList.length;
  const completedCount = modulList.filter(m => m.completed).length;
  const progressPercent = total > 0 
    ? Math.round((completedCount / total) * 100) 
    : 0;

   // Fungsi untuk menandai modul selesai berdasarkan ID
  const handleComplete = id => {
    // Update properti completed pada modul yang sesuai
    const updated = modulList.map(m =>
      m.id === id ? { ...m, completed: true } : m
    );
    setModulList(updated); // Simpan state baru
    localStorage.setItem("modulList", JSON.stringify(updated)); // Simpan ke localStorage
    showSuccess("Sukses", "Modul berhasil ditandai selesai!");
  };

  // Fungsi untuk toggle buka/tutup accordion berdasarkan ID
  const handleToggle = (id) => {
    setActiveIndex(activeIndex === id ? null : id); 
  };

  // Fungsi untuk buka modal tanya, set ID modul yang akan ditanya
  const handleAsk = id => setAskId(id);

   // Fungsi untuk kirim pertanyaan
  const submitQuestion = () => {
    if (question.trim()) { // Cek jika pertanyaan tidak kosong
      showToastSuccess("Pertanyaan berhasil dikirim"); // Tampilkan toast success
      setAskId(null); // Tutup modal
      setQuestion(""); // Reset input pertanyaan
    } else {
      showToastError("Tolong isi pertanyaan terlebih dahulu");  // Tampilkan toast error jika kosong
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Modul Pembelajaran
      </h1>

      {/* Progress Bar Section */}
      <div className="mb-8">
        <ProgressBar 
          percent={progressPercent}  // Persentase progress
          label="Progress Belajar" 
        />
      </div>

      {/* Modul List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulList.map((m) => (
          <Card
            key={m.id}
            title={m.title}
            description={m.description}
            onClickComplete={() => handleComplete(m.id)}
            onClickAsk={() => handleAsk(m.id)}
            isCompleted={m.completed} // Prop untuk menandai tampilan jika sudah selesai
            isOpen={activeIndex === m.id} // Prop untuk buka/tutup accordion
            onToggle={() => handleToggle(m.id)} // Handler toggle accordion
          />
        ))}
      </div>

      {/* Modal for Asking Question */}
      {askId && (
        <ModalTanya
          question={question} // Input question text
          setQuestion={setQuestion} // Setter untuk question
          submitQuestion={submitQuestion}   // Handler submit pertanyaan
          setAskId={setAskId} // Setter untuk tutup modal
        />
      )}

        {/* Container untuk Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast-container"
      />
    </div>
  );
};

export default Modul;
