import React from "react";

const variants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
};

const Button = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
