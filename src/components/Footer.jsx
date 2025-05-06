// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-center p-4 border-t shadow mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto">
        <div className="text-sm mb-2 md:mb-0">
          © {new Date().getFullYear()} Black Lake Forge
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 text-sm">
          <a href="mailto:bltechnologies318@gmail.com" className="text-blue-600 hover:underline">
            Email Us: bltechnologies318@gmail.com
          </a>
          <a href="https://www.facebook.com/profile.php?id=61575801361510" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Facebook:  https://www.facebook.com/profile.php?id=61575801361510
          </a>
          <a href="#" className="text-blue-600 hover:underline">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
