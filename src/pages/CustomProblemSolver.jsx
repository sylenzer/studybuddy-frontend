import React, { useState } from 'react';
import GraphRenderer from './GraphRenderer'; // Adjust path if needed
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

function CustomProblemSolver() {
  const [problem, setProblem] = useState('');
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  function extractVisualData(step) {
    const match = step.match(/\[VISUAL_RENDER\](.+)/s);
    if (match) {
      try {
        return JSON.parse(match[1].trim());
      } catch (err) {
        console.error('Failed to parse visual JSON:', err);
      }
    }
    return null;
  }

  const handleSubmit = async () => {
    setLoading(true);
    setSteps([]);
    try {
      const res = await axios.post('/api/solve', { problem });
      const rawSteps = res.data.result.split('\n\n');

      setSteps(rawSteps);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-2">Custom Problem Solver</h1>
      <textarea
        className="w-full border rounded p-2 mb-4"
        rows={4}
        placeholder="Enter your math problem..."
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Solving...' : 'Solve'}
      </button>

      <div className="mt-6 space-y-4">
        {steps.map((step, index) => {
          const visualData = extractVisualData(step);

          if (visualData?.type === 'graph') {
            return (
              <div key={index} className="border rounded p-4 bg-gray-50">
                <GraphRenderer data={visualData} />
              </div>
            );
          }

          return (
            <div key={index} className="border rounded p-4 bg-white">
              <ReactMarkdown>{step}</ReactMarkdown>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CustomProblemSolver;
