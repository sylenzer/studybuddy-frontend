// src/pages/StudyBuddyMathDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudyBuddyMathDashboard = () => {
  const [customProblem, setCustomProblem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!customProblem.trim()) {
      alert("Please enter a math problem first!");
      return;
    }
    navigate("/solver", { state: { initialPrompt: customProblem } });
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">StudyBuddy Math Dashboard</h1>
      <textarea
        value={customProblem}
        onChange={(e) => setCustomProblem(e.target.value)}
        placeholder="Type your math problem here..."
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm resize-y min-h-[4rem]"
        rows={4}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        Solve This Problem
      </button>
    </div>
  );
};

export default StudyBuddyMathDashboard;
