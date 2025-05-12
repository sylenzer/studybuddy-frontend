// src/components/CustomProblemSolver.jsx
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
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
    console.log("✅ handleSolve triggered");

    const res = await fetch("/api/solve", {
      method: "POST",
      body: JSON.stringify({ prompt: "Your problem here" }),
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
      <HintStrategyStepper
        currentStep={currentHintStep}
        setCurrentStep={setCurrentHintStep}
      />

      <div className="hint-output mt-6">
        <h4>
          Hint Strategy: <span className="text-purple-600 font-semibold">{getHintKey(currentHintStep)}</span>
        </h4>
        <div className="hint-box mt-2">
          <ReactMarkdown>
            {parsedHints[getHintKey(currentHintStep)] || "_No hint available for this strategy yet._"}
          </ReactMarkdown>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button onClick={handleSolve} className="bg-purple-600 text-white py-2 px-4 rounded">
          Solve Sample Problem
        </button>
      </div>
    </div>
  );
};

export default CustomProblemSolver;