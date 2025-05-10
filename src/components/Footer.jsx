// src/components/Footer.jsx
import React from "react";
import footerLogo from "../assets/FullLogo_Transparent footer.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10">
      <div className="max-w-screen-xl mx-auto px-4 md:flex md:items-center md:justify-between">
        <div className="mb-6 md:mb-0 flex justify-center md:justify-start">
          <img
            src={footerLogo}
            alt="StudyBuddy Logo"
            className="w-12 sm:w-16 mx-auto md:mx-0"
          />
        </div>

        <div className="text-center md:text-right space-y-2">
          <p className="text-sm">&copy; {new Date().getFullYear()} StudyBuddy+. All rights reserved.</p>
          <div className="flex justify-center md:justify-end gap-4 text-sm">
            <Link to="/faq" className="hover:text-purple-600">FAQ</Link>
            <Link to="/pricing" className="hover:text-purple-600">Pricing</Link>
            <Link to="/login" className="hover:text-purple-600">Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
