// src/pages/CustomProblemSolver.jsx
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { supabase } from "../lib/supabaseClient";
import useTokenManager from "../hooks/useTokenManager";
import {
  Lightbulb,
  ListChecks,
  Map,
  ArrowRightCircle,
  ImageIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import VisualRenderer from "../components/VisualRenderer";
import GraphRenderer from "../components/GraphRenderer";
import GeometryRenderer from "../components/GeometryRenderer";
import { useSupabaseProgress } from "../hooks/useSupabaseProgress";
import { useLocation } from "react-router-dom";
import SolverHistoryPanel from "../components/SolverHistoryPanel";

const SHOW_HINTS = true;

const sectionStyles = {
  Socratic: "border-purple-500 bg-purple-50",
  "Multiple Choice": "border-blue-500 bg-blue-50",
  Roadmap: "border-yellow-500 bg-yellow-50",
  "Step-by-Step": "border-green-500 bg-green-50",
  Visual: "border-gray-500 bg-gray-50",
};

const sectionIcons = {
  Socratic: <Lightbulb className="w-5 h-5 text-purple-600" />,
  "Multiple Choice": <ListChecks className="w-5 h-5 text-blue-600" />,
  Roadmap: <Map className="w-5 h-5 text-yellow-600" />,
  "Step-by-Step": <ArrowRightCircle className="w-5 h-5 text-green-600" />,
  Visual: <ImageIcon className="w-5 h-5 text-gray-600" />,
};

const displayOrder = ["Socratic", "Roadmap", "Step-by-Step", "Visual", "Multiple Choice"];

const CustomProblemSolver = () => {
  const location = useLocation();
  const [prompt, setPrompt] = useState(location.state?.initialPrompt || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userReady, setUserReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [resultText, setResultText] = useState("");
  const [parsedSections, setParsedSections] = useState({});
  const [collapsed, setCollapsed] = useState({});

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

  const tokenManager = useTokenManager(userId);

  useEffect(() => {
    const fetchTokens = async () => {
      if (tokenManager && userId) {
        const tokens = await tokenManager.getTokens();
        setTokenBalance(tokens);
        setTokenLoading(false);
      }
    };
    fetchTokens();
  }, [tokenManager, userId]);

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
    setCollapsed({});

    try {
      const res = await axios.post("https://studybuddy-backend-production.up.railway.app/api/solve", {
        problem: prompt,
        hintMode: true,
        strategy: "stepByStep",
        userId,
      });

      const result = res.data.result;
      setResultText(result);

      const sections = {
        Socratic: extractBlock(result, "Socratic"),
        "Multiple Choice": extractBlock(result, "MC"),
        Roadmap: extractBlock(result, "ROADMAP"),
        "Step-by-Step": extractBlock(result, "STEP"),
        Visual: extractBlock(result, "VISUAL_RENDER"),
      };

      setParsedSections(sections);

      if (result) {
        const visualBlock = extractBlock(result, "VISUAL_RENDER");
        saveProgress({
          problem: prompt,
          result,
          visual: visualBlock,
          hintMode: true,
        });
      }

      const { history, loading } = useSupabaseProgress();

      if (tokenManager) {
        await tokenManager.spendTokens(1);
        const newBalance = await tokenManager.getTokens();
        setTokenBalance(newBalance);
      }
    } catch (err) {
      console.error("Solve error:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const toggleCollapse = (section) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const collapseAll = () => {
    const all = Object.fromEntries(displayOrder.map((key) => [key, true]));
    setCollapsed(all);
  };

  const expandAll = () => {
    const all = Object.fromEntries(displayOrder.map((key) => [key, false]));
    setCollapsed(all);
  };

  if (!userReady) return <p className="text-center mt-10">Loading solver...</p>;

  return (
    <div className="solver-container max-w-xl mx-auto mt-10">
      <SolverHistoryPanel onLoadProblem={(p) => setPrompt(p)} />

      {!tokenLoading && tokenBalance !== null && (
        <div className="text-right text-sm text-indigo-600 font-semibold mb-2">
          💎 {tokenBalance} tokens remaining
        </div>
      )}

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your math problem or word problem..."
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm resize-y min-h-[4rem]"
      />
      <button
        onClick={() => {
          if (tokenBalance === 0) {
            alert("You’re out of tokens! Please buy more to continue solving.");
            return;
          }
          handleSolve();
        }}
        disabled={loading || !prompt.trim() || tokenBalance === null}
        className={`mt-4 py-2 px-4 rounded ${
          tokenBalance === 0
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-purple-600 text-white hover:bg-purple-700"
        } disabled:opacity-50`}
      >
        {loading ? "Solving..." : "Solve"}
      </button>

      {error && (
        <div className="text-red-600 text-center font-semibold mt-4">
          {error}
        </div>
      )}

      {SHOW_HINTS && (
        <div className="hint-box mt-6 space-y-4">
          <div className="flex justify-end gap-4 mb-2">
            <button onClick={expandAll} className="text-sm text-green-700 hover:underline">
              Expand All
            </button>
            <button onClick={collapseAll} className="text-sm text-gray-600 hover:underline">
              Collapse All
            </button>
          </div>

          {displayOrder.map((label) => {
            const content = parsedSections[label];
            return (
              content && (
                <div
                  key={label}
                  className={`p-4 border-l-4 rounded shadow-sm ${sectionStyles[label] || "border-gray-300 bg-white"}`}
                >
                  <div
                    className="flex items-center justify-between cursor-pointer mb-2"
                    onClick={() => toggleCollapse(label)}
                  >
                    <div className="flex items-center gap-2">
                      {sectionIcons[label] || null}
                      <h3 className="font-bold text-lg">{label}</h3>
                    </div>
                    {collapsed[label] ? (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  {!collapsed[label] && (
                    label === "Visual" ? (() => {
                      try {
                        const parsed = JSON.parse(content);
                        if (content.includes("graphType")) {
                          return <GraphRenderer data={parsed} />;
                        } else if (content.includes("geometryType")) {
                          return <GeometryRenderer data={parsed} />;
                        } else {
                          return <VisualRenderer content={content} />;
                        }
                      } catch (e) {
                        console.warn("Invalid JSON for visual content:", e);
                        return <VisualRenderer content={content} />;
                      }
                    })() : (
                      <ReactMarkdown>{content}</ReactMarkdown>
                    )
                  )}
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomProblemSolver;
