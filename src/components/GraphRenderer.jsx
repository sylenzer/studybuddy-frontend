// src/components/GraphRenderer.jsx
import React from "react";

const GraphRenderer = ({ description }) => {
  return (
    <div className="flex flex-col items-center p-4 border rounded bg-white">
      <svg className="graph-canvas">
        <line x1="0" y1="100" x2="200" y2="100" className="graph-axis" /> {/* x-axis */}
        <line x1="100" y1="0" x2="100" y2="200" className="graph-axis" /> {/* y-axis */}
        <path d="M20 180 Q100 20 180 180" className="graph-curve" /> {/* example parabola */}
      </svg>
      <p className="text-sm italic text-gray-600 text-center max-w-xs">
        [Graph placeholder: {description}]
      </p>
    </div>
  );
};

export default GraphRenderer;