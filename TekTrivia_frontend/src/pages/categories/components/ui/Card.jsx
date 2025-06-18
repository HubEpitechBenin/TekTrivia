import React from "react";

const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);
export default Card;
