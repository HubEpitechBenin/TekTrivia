import React from "react";

/*******************************
 * Bouton personnalisable.
 * @param {{
 *   text: string;
 *   onClick?: () => void;
 *   className?: string;
 *   size?: 'sm' | 'md' | 'lg';
 *   textSize?: string;
 *   rounded?: string;
 *   color?: string;
 *   textColor?: string;
 *   fontWeight?: string;
 *   type?: 'button' | 'submit';
 * }} props
 ******************************/
const CustomButton = ({
  text,
  onClick,
  className = "",
  size = "md",
  textSize = "text-base",
  rounded = "rounded-md",
  color = "bg-blue-600",
  textColor = "text-white",
  fontWeight = "font-semibold",
  type = "button",
}) => {
  const padding = {
    sm: "px-3 py-1.5",
    md: "px-4 py-2",
    lg: "px-6 py-3",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${color} ${textColor} ${fontWeight} ${rounded} ${textSize} ${padding[size]} ${className} transition duration-200 hover:opacity-90`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
