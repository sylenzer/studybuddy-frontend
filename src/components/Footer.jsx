// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import footerLogo from "../assets/FullLogo_Transparent footer.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer-inner">
        <img
          src={footerLogo}
          alt="StudyBuddy Logo"
          className="w-12 sm:w-16"
        />

        <div className="footer-links">
          <Link to="/faq">FAQ</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </div>

        <p className="footer-contact">
          Contact us:{" "}
          <a
            href="mailto:bltechnologies318@gmail.com"
            className="footer-email"
          >
            bltechnologies318@gmail.com
          </a>
        </p>

        <p className="footer-copy">
          &copy; {new Date().getFullYear()} StudyBuddy+. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
