// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/converted_image_2025-05-10T16-12-31-679Z.png')" }}
    >
      <Navbar />
      <main className="flex-grow flex justify-center items-center px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
