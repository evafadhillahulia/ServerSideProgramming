// src/Components/Card.js

import React from "react";

const Card = ({ title, description, onClickComplete, onClickAsk, isCompleted }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="flex gap-4">
        <button
          onClick={onClickComplete}
          disabled={isCompleted}
          className={`px-4 py-2 text-white ${isCompleted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} rounded-lg`} // rounded-lg added here
        >
          {isCompleted ? "Selesai" : "Tandai Selesai"}
        </button>

        <button
          onClick={onClickAsk}
          className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg" // rounded-lg added here
        >
          Tanya Dosen
        </button>
      </div>
    </div>
  );
};

export default Card;
