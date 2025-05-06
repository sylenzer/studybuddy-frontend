// src/components/InsufficientTokensModal.jsx
import React from "react";
import { Link } from "react-router-dom";

const InsufficientTokensModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center transform transition-all duration-300 animate-scale-in">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Not Enough Tokens
        </h2>
        <p className="text-gray-600 mb-6">
          You don't have enough tokens to solve this problem. Would you like to purchase more?
        </p>
        <div className="flex flex-col gap-4">
          <Link
            to="/pricing"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Go to Pricing
          </Link>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 underline text-sm"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsufficientTokensModal;
