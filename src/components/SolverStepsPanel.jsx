import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { GraphRenderer } from "./GraphRenderer";
import { GeometryRenderer } from "./GeometryRenderer";

const SolverStepsPanel = ({ steps, visuals, currentStepIndex, setCurrentStepIndex, onReset }) => {
  const currentStep = steps[currentStepIndex];
  const currentVisual = visuals?.[currentStepIndex];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 rounded shadow-md mt-8">
      <div className="mb-4 text-gray-800 dark:text-gray-100">
        <ReactMarkdown
          children={currentStep}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        />
      </div>

      {currentVisual && currentVisual.type === "graph" && (
        <GraphRenderer data={currentVisual.data} />
      )}
      {currentVisual && currentVisual.type === "geometry" && (
        <GeometryRenderer data={currentVisual.data} />
      )}

      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
          disabled={currentStepIndex === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
          disabled={currentStepIndex === steps.length - 1}
        >
          Next
        </button>
      </div>

      <div className="mt-4 text-center">
        <button
          className="text-sm text-gray-500 underline hover:text-gray-700 dark:hover:text-gray-300"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SolverStepsPanel;
