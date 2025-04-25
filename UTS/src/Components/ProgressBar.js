// src/Components/ProgressBar.js

import React from "react";

const ProgressBar = ({ percent, label }) => (
  <div className="mb-6">
    {label && (
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{percent}%</span>
      </div>
    )}
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-blue-600 h-3 rounded-full transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

export default ProgressBar;
