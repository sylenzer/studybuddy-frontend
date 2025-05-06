// /components/SolverStatusPanel.jsx
import React from 'react';

export default function SolverStatusPanel({ modelUsed, backend }) {
  return (
    <div className="text-sm text-gray-700 dark:text-gray-300 mt-4 p-3 border rounded-lg shadow bg-white dark:bg-gray-800">
      <p>
        <strong>Model Used:</strong>{' '}
        <span
          className={`px-2 py-1 rounded-md font-mono text-white ${
            modelUsed === 'GPT-4' ? 'bg-purple-600' : 'bg-green-600'
          }`}
        >
          {modelUsed || 'Unknown'}
        </span>
      </p>
      <p className="mt-1">
        <strong>Backend:</strong>{' '}
        <span className="px-2 py-1 bg-blue-600 text-white font-mono rounded-md">
          {backend || 'Loading...'}
        </span>
      </p>
    </div>
  );
}
