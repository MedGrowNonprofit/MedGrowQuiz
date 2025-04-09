import React from "react";

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 text-white py-2 px-4 rounded"
  >
    {children}
  </button>
);

export { Button };