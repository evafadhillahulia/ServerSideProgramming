// src/Pages/Admin/Modul/AccordionItem.js

import React from "react";

const AccordionItem = ({
  id,
  title,
  description,
  completed,
  isOpen,
  onToggle,
  onComplete,
  onAsk,
}) => (
  <div className="mb-4">
    <div
      className={`cursor-pointer p-4 rounded text-white ${
        completed ? "bg-green-600" : "bg-blue-600"
      }`}
      onClick={() => onToggle(id)} 
    >
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm opacity-75">{description}</p>
      <p className="mt-1 font-medium">
        Status: {completed ? "Selesai" : "Belum Selesai"}
      </p>
    </div>

    {isOpen && (
      <div className="p-4 border border-blue-200 rounded mt-2 bg-white">
        <h4 className="font-semibold mb-2">Detail Modul</h4>
        <p className="mb-4">{description}</p>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => onComplete(id)}
            disabled={completed}
          >
            Tandai Selesai
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded"
            onClick={() => onAsk(id)}
          >
            Tanya Dosen
          </button>
        </div>
      </div>
    )}
  </div>
);

export default AccordionItem;
