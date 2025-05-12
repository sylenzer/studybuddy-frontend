// src/pages/CustomProblemSolver.jsx
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "../lib/supabaseClient";
import { Lightbulb, ListChecks, Map, ArrowRightCircle, ImageIcon } from "lucide-react";

const SHOW_HINTS = true;

const sectionStyles = {
  Socratic: "border-purple-500 bg-purple-50",
  "Multiple Choice": "border-blue-500 bg-blue-50",
  Roadmap: "border-yellow-500 bg-yellow-50",
  "Step-by-Step": "border-green-500 bg-green-50",
  Visual: "border-gray-500 bg-gray-50"
};

const sectionIcons = {
  Socratic: <Lightbulb className="w-5 h-5 text-purple-600" />,
  "Multiple Choice": <ListChecks className="w-5 h-5 text-blue-600" />,
  Roadmap: <Map className="w-5 h-5 text-yellow-600" />,
  "Step-by-Step": <ArrowRightCircle className="w-5 h-5 text-green-600" />,
  Visual: <ImageIcon className="w-5 h-5 text-gray-600" />
};

const CustomProblemSolver = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userReady, setUserReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [resultText, setResultText] = useState("");
  const [parsedSections, setParsedSections] = useState({});

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        setUserReady(true);
      } else {
        window.location.href = "/login";
      }
    });
  }, []);

  const extractBlock = (text, tag) => {
    const regex = new RegExp(`\\*\\*\\[${tag}\\]\\*\\*([^]*?)(?=\\*\\*\\[|$)`, "i");
    const match = text.match(regex);
    return match ? match[1].trim() : null;
  };

  const handleSolve = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setResultText("");
    setParsedSections({});

    try {
      const res = await fetch("https://studybuddy-backend-production.up.railway.app/api/solve", {
        method: "POST",
        body: JSON.stringify({
          problem: prompt,
          hintMode: true,
          strategy: "stepByStep",
          userId: userId
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`❌ Server returned ${res.status}`);
      }

      const { result } = await res.json();
      setResultText(result);

      const sections = {
        Socratic: extractBlock(result, "Socratic"),
        "Multiple Choice": extractBlock(result, "MC"),
        Roadmap: extractBlock(result, "ROADMAP"),
        "Step-by-Step": extractBlock(result, "STEP"),
        Visual: extractBlock(result, "VISUAL_RENDER")
      };

      setParsedSections(sections);
    } catch (err) {
      console.error("Solve error:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (!userReady) return <p className="text-center mt-10">Loading solver...</p>;

  return (
    <div className="solver-container max-w-xl mx-auto mt-10">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your math problem..."
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
      />
      <button
        onClick={handleSolve}
        disabled={loading || !prompt.trim()}
        className="mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Solving..." : "Solve"}
      </button>

      {error && (
        <div className="text-red-600 text-center font-semibold mt-4">
          {error}
        </div>
      )}

      {SHOW_HINTS && (
        <div className="hint-box mt-6 space-y-6">
          {Object.entries(parsedSections).map(([label, content]) => (
            content && (
              <div
                key={label}
                className={`p-4 border-l-4 rounded shadow-sm ${sectionStyles[label] || "border-gray-300 bg-white"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {sectionIcons[label] || null}
                  <h3 className="font-bold text-lg">{label}</h3>
                </div>
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomProblemSolver;