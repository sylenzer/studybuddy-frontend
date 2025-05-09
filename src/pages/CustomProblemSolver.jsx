// src/components/CustomProblemSolver.jsx

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { useSupabaseProgress } from '@/hooks/useSupabaseProgress';
import { useUser } from '@/context/UserContext';
import SolverHistoryPanel from '@/components/SolverHistoryPanel';
import { GraphRenderer } from '@/components/GraphRenderer';
import { GeometryRenderer } from '@/components/GeometryRenderer';

const CustomProblemSolver = () => {
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState('');
  const [visual, setVisual] = useState(null);
  const [hintMode, setHintMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const { saveProgress } = useSupabaseProgress();
  const { user } = useUser();

  const handleSolve = async () => {
    if (!user?.id) {
      alert("Please log in to use the solver.");
      return;
    }

    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      console.log("🧠 CustomProblemSolver using backend URL:", backendUrl);

      const response = await fetch(`${backendUrl}/api/solve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem,
          hintMode,
          strategy: "algebraic",
          userId: user.id,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setResult(data.result || 'No explanation provided.');
      setVisual(data.visual || null);

      if (user) {
        console.log("📤 Sending to Supabase solver_history:", {
          userId: user.id,
          problem,
          result: data.result,
          visual: data.visual,
          hintMode,
        });
        await saveProgress({
          problem,
          result: data.result,
          visual: data.visual,
          hintMode,
        });
      }
    } catch (err) {
      setResult(`❌ Error: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        placeholder="Enter a math problem..."
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
      />
      <div className="flex items-center gap-4">
        <button
          onClick={handleSolve}
          disabled={loading || !problem.trim()}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        >
          {loading ? 'Solving...' : 'Solve'}
        </button>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hintMode}
            onChange={() => setHintMode(!hintMode)}
          />
          Hint Mode
        </label>
      </div>

      {result && (
        <div className="prose max-w-none bg-white p-4 rounded shadow">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
      {visual?.includes('type: graph') && <GraphRenderer spec={visual} />}
      {visual?.includes('type: geometry') && <GeometryRenderer spec={visual} />}

      <SolverHistoryPanel onLoadProblem={setProblem} />
    </div>
  );
};

export default CustomProblemSolver;
