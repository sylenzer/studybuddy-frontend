// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import navLogo from "../assets/FullLogo_Transparent navbar.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 shadow-md">
      <Link to="/">
        <img src={navLogo} alt="StudyBuddy Logo" className="w-8 h-auto" />
      </Link>
      <div className="flex space-x-4">
        <Link to="/solve" className="text-sm font-semibold hover:text-purple-600">Solver</Link>
        <Link to="/faq" className="text-sm font-semibold hover:text-purple-600">FAQ</Link>
        <Link to="/pricing" className="text-sm font-semibold hover:text-purple-600">Pricing</Link>
        <Link to="/login" className="text-sm font-semibold hover:text-purple-600">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
