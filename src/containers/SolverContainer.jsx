// src/containers/SolverContainer.jsx

import React, { useState, useEffect } from "react";
import OCRUpload from "../components/OCRUpload";
import SolverStepsPanel from "../components/SolverStepsPanel";
import SolverHistoryPanel from "../components/SolverHistoryPanel";
import SolverStatusPanel from "../components/SolverStatusPanel";
import { useSupabaseProgress } from "@/hooks/useSupabaseProgress";
import { useUser } from "@/context/UserContext";
import LoaderCube from "../components/LoaderCube";
import { useTokenManager } from "@/hooks/useTokenManager";

const SolverContainer = () => {
  const [input, setInput] = useState("");
  const [steps, setSteps] = useState([]);
  const [visuals, setVisuals] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [modelUsed, setModelUsed] = useState(null);
  const [backend, setBackend] = useState("Vercel");

  const { user } = useUser();
  const { saveProgress, fetchHistory } = useSupabaseProgress();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSteps([]);
    setVisuals([]);
    setCurrentStepIndex(0);

    if (!user) {
      alert("Please log in to solve problems.");
      setLoading(false);
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const response = await fetch(`${backendUrl}/api/solve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem: input,
          hintMode: true,
          strategy: "algebraic",
          userId: user.id,
        }),
      });

      const result = await response.json();
      const content = result?.result;
      if (!content) throw new Error("No content in API result.");

      setModelUsed(result?.model || "Unknown");
      setBackend(window.location.href.includes("railway") ? "Railway" : "Vercel");

      const visualRegex = /\[VISUAL_RENDER\]([\s\S]*?)(?=\n\n|$)/g;
      const visualsExtracted = [];
      const cleanSteps = content.replace(visualRegex, (_, block) => {
        try {
          const parsed = JSON.parse(block.trim());
          visualsExtracted.push(parsed);
        } catch (err) {
          console.warn("Failed to parse visual block:", err);
        }
        return "";
      });

      const splitSteps = cleanSteps
        .split(/\n(?=\d+\.)|(?=^## )/gm)
        .filter((s) => s.trim());

      setSteps(splitSteps);
      setVisuals(visualsExtracted);

      await saveProgress({
        problem: input,
        result: splitSteps.join("\n"),
        visual: JSON.stringify(visualsExtracted),
        hintMode: true,
      });

      const updatedHistory = await fetchHistory();
      setHistory(updatedHistory);
    } catch (err) {
      console.error("❌ Error submitting problem:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = async () => {
    if (!user) return;
    const savedHistory = await fetchHistory();
    setHistory(savedHistory);

    if (Array.isArray(savedHistory) && savedHistory.length > 0) {
      const latest = savedHistory[0];
      setInput(latest.problem || "");
      setSteps(latest.result?.split("\n") || []);
      try {
        setVisuals(JSON.parse(latest.visual || "[]"));
      } catch {
        setVisuals([]);
      }
      setCurrentStepIndex(0);
    }
  };

  const handleSelectHistoryItem = (entry) => {
    setInput(entry.problem || "");
    setSteps(entry.result?.split("\n") || []);
    try {
      setVisuals(JSON.parse(entry.visual || "[]"));
    } catch {
      setVisuals([]);
    }
    setCurrentStepIndex(0);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 transition-colors min-h-screen relative">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Enter Your Problem
      </h2>

      <SolverStatusPanel modelUsed={modelUsed} backend={backend} />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto text-center mb-6"
      >
        <textarea
          className="w-full p-4 text-lg border rounded-md resize-y min-h-[150px] dark:bg-gray-800 dark:text-white"
          placeholder="Enter a math problem or word problem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex gap-4 mt-2 justify-center">
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Solving..." : "Solve"}
          </button>

          <button
            type="button"
            onClick={handleLoad}
            disabled={!user}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Load Progress
          </button>
        </div>
      </form>

      <OCRUpload setInput={setInput} handleSubmit={handleSubmit} />

      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
          <LoaderCube />
        </div>
      )}

      <SolverHistoryPanel
        history={history}
        onSelect={handleSelectHistoryItem}
        loading={loading}
        user={user}
      />

      {steps.length > 0 && !loading && (
        <SolverStepsPanel
          steps={steps}
          visuals={visuals}
          currentStepIndex={currentStepIndex}
          setCurrentStepIndex={setCurrentStepIndex}
          onReset={() => {
            setInput("");
            setSteps([]);
            setVisuals([]);
            setCurrentStepIndex(0);
          }}
        />
      )}
    </div>
  );
};

export default SolverContainer;
