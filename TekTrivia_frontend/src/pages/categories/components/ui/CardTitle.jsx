import React from "react";
const CardTitle = ({ children, className = "", ...props }) => (
  <h2 className={`text-xl font-semibold ${className}`} {...props}>
    {children}
  </h2>
);

export default CardTitle;
