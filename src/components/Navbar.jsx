// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import navLogo from "../assets/FullLogo_Transparent navbar.png";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-inner">
        <Link to="/">
          <img src={navLogo} alt="StudyBuddy Logo" className="w-8 h-auto" />
        </Link>
        <div className="nav-links">
          <Link to="/solve">Solver</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/login">Login</Link>

          {/* ✨ Signup Button with Badge */}
          <div className="signup-container">
            <Link to="/signup" className="signup-button">
              Sign up
            </Link>
            <span className="signup-badge">🎉 5 free tokens</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
