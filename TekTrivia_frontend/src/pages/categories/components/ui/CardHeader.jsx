import React from "react";

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`p-4 border-b border-gray-100 ${className}`} {...props}>
    {children}
  </div>
);

export default CardHeader;
