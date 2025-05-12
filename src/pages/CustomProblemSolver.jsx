// src/components/CustomProblemSolver.jsx
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import HintStrategyStepper from "../components/HintStrategyStepper";

const CustomProblemSolver = () => {
  const [currentHintStep, setCurrentHintStep] = useState(1);
  const [prompt, setPrompt] = useState("");
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
    console.log("✅ handleSolve triggered");

    const res = await fetch("https://studybuddy-backend-production.up.railway.app/api/solve", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: { "Content-Type": "application/json" },
    });

    const resultText = await res.text();
    console.log("🧠 Raw response:", resultText);

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
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your math problem..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
        />
        <button
          onClick={handleSolve}
          className="mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Solve
        </button>
      </div>

      <HintStrategyStepper
        currentStep={currentHintStep}
        setCurrentStep={setCurrentHintStep}
      />

      <div className="hint-output mt-6">
        <h4>
          Hint Strategy: <span className="text-purple-600 font-semibold">{getHintKey(currentHintStep)}</span>
        </h4>
        <div className="hint-box mt-2">
          {parsedHints && typeof parsedHints[getHintKey(currentHintStep)] === "string" ? (
            <ReactMarkdown>
              {parsedHints[getHintKey(currentHintStep)]}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-500 italic">No hint available for this strategy yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomProblemSolver;
