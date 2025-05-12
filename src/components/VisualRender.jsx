// src/components/VisualRenderer.jsx
import React from "react";

const VisualRenderer = ({ content }) => {
  if (!content) return null;

  // Example: render coordinate plane or description-based visuals
  // Expecting things like: "Graph the line y = 2x + 3" or "Draw a triangle with base 5 and height 4"

  const lower = content.toLowerCase();

  if (lower.includes("graph") && lower.includes("y =")) {
    return (
      <div className="p-2 border rounded bg-white">
        <p className="italic text-sm text-gray-600">[Graph placeholder for: {content}]</p>
        {/* Insert SVG renderer for graphs here */}
      </div>
    );
  }

  if (lower.includes("triangle") || lower.includes("square") || lower.includes("circle")) {
    return (
      <div className="p-2 border rounded bg-white">
        <p className="italic text-sm text-gray-600">[Shape placeholder for: {content}]</p>
        {/* Insert SVG shape renderer here */}
      </div>
    );
  }

  return (
    <div className="p-2 border rounded bg-white">
      <p className="italic text-sm text-gray-600">[Visual description: {content}]</p>
    </div>
  );
};

export default VisualRenderer;
