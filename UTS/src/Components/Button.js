// src/Components/Button.js

import React from "react";
import PropTypes from "prop-types";

const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  loading = false,
  disabled = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={`
      w-full py-3 rounded-lg text-white font-medium
      ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500"}
      ${disabled && !loading ? "bg-gray-500 cursor-not-allowed" : ""}
      ${className}
    `}
  >
    {loading ? "Loading…" : children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button","submit","reset"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
