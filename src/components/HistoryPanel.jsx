// src/components/HistoryPanel.jsx
import React from "react";

const HistoryPanel = ({ history, onSelect }) => {
  return (
    <div className="w-full max-w-3xl mb-6">
      <h2 className="text-lg font-bold mb-2">📚 History</h2>
      <ul className="space-y-2">
        {history.map((entry, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(entry)}
              className="w-full text-left px-4 py-2 bg-white dark:bg-gray-800 rounded shadow hover:bg-blue-100 dark:hover:bg-blue-700 transition-colors"
            >
              {entry.problem?.slice(0, 80) || "Untitled Problem"}...
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPanel;
