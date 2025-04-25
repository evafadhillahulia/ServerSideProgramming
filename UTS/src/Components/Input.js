// src/Components/Input.js

import React from "react";

const Input = ({
  label,
  type = "text",
  id,
  placeholder,
  value,
  onChange,
  required,
  error,
  helperText,
  icon,
  ...props
}) => (
  <div className="space-y-1 relative">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
    )}

    <div className="relative">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {icon}
        </div>
      )}
    </div>

    {error ? (
      <p className="text-sm text-red-500">{error}</p>
    ) : (
      helperText && <p className="text-sm text-gray-500">{helperText}</p>
    )}
  </div>
);

export default Input;
