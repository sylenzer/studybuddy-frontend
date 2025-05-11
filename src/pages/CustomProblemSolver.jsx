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
import HintStrategyStepper from "./HintStrategyStepper";

const CustomProblemSolver = () => {
  const [currentHintStep, setCurrentHintStep] = useState(1);
  const [parsedHints, setParsedHints] = useState({
    socratic: "",
    multipleChoice: "",
    roadmap: "",
    stepByStep: ""
  });

  const getHintKey = (step) => {
    switch (step) {
      case 1:
        return "socratic";
      case 2:
        return "multipleChoice";
      case 3:
        return "roadmap";
      case 4:
        return "stepByStep";
      default:
        return "stepByStep";
    }
  };

  const extractHintBlock = (text, marker) => {
    const match = text.match(new RegExp(`\\${marker}([\\s\\S]*?)(?=\\[|$)`));
    return match ? match[1].trim() : "";
  };

  const handleSolve = async () => {
    const res = await fetch("/api/solve", {
      method: "POST",
      body: JSON.stringify({ prompt: "Your problem here" }),
      headers: { "Content-Type": "application/json" },
    });

    const resultText = await res.text();

    const parsed = {
      socratic: extractHintBlock(resultText, "[HINT_SOC]"),
      multipleChoice: extractHintBlock(resultText, "[HINT_MC]"),
      roadmap: extractHintBlock(resultText, "[HINT_ROADMAP]"),
      stepByStep: extractHintBlock(resultText, "[HINT_STEPS]")
    };

    setParsedHints(parsed);
  };

  return (
    <div className="solver-container">
      <HintStrategyStepper
        currentStep={currentHintStep}
        setCurrentStep={setCurrentHintStep}
      />

      <div className="hint-output mt-6">
        <h4>
          Hint Strategy: <span className="text-purple-600 font-semibold">{getHintKey(currentHintStep)}</span>
        </h4>
        <div className="hint-box mt-2">
          {parsedHints[getHintKey(currentHintStep)] || (
            <p className="text-gray-500 italic">No hint available for this strategy yet.</p>
          )}
        </div>
      </div>

      {/* You can trigger this to test */}
      <div className="mt-6 text-center">
        <button onClick={handleSolve} className="bg-purple-600 text-white py-2 px-4 rounded">
          Solve Sample Problem
        </button>
      </div>
    </div>
  );
};

export default CustomProblemSolver