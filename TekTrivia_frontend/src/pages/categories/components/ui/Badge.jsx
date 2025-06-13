import React from "react";

const Badge = ({ children, className = "", variant = "default", ...props }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-600",
  };

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
