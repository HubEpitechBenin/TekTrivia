// src/components/NavButton.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

/**********
 * Composant NavButton pour simplifier les liens de la navbar.
 * @param {{ to: string; label: string }} props
 **********/
const NavButton = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`transition-colors font-medium ${
        isActive ? "text-purple-600" : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {label}
    </Link>
  );
};

export default NavButton;
