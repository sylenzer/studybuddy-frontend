// src/components/GeometryRenderer.jsx
import React from "react";

const parseDimension = (content, label) => {
  const regex = new RegExp(`${label}\s*=\s*(\d+(\.\d+)?)`, "i");
  const match = content.match(regex);
  return match ? parseFloat(match[1]) : null;
};

const GeometryRenderer = ({ content }) => {
  const lower = content.toLowerCase();

  const base = parseDimension(content, "base") || 100;
  const height = parseDimension(content, "height") || 100;
  const radius = parseDimension(content, "radius") || 60;

  if (lower.includes("right triangle") || lower.includes("angle")) {
    const scaleBase = Math.min(base, 120);
    const scaleHeight = Math.min(height, 120);
    return (
      <svg className="geometry-canvas" viewBox="0 0 200 200">
        <polygon
          points={`40,160 ${40 + scaleBase},160 40,${160 - scaleHeight}`}
          className="geometry-shape"
        />
        <text x="42" y="155" fontSize="12" fill="#333">90°</text>
        <text x="{40 + scaleBase / 2}" y="175" fontSize="12" fill="#333">base = {base}</text>
        <text x="10" y="{160 - scaleHeight / 2}" fontSize="12" fill="#333">height = {height}</text>
      </svg>
    );
  }

  if (lower.includes("triangle")) {
    const baseStart = 100 - base / 2;
    const baseEnd = 100 + base / 2;
    const scaledHeight = Math.min(height, 150);
    return (
      <svg className="geometry-canvas" viewBox="0 0 200 200">
        <polygon
          points={`${100},${200 - scaledHeight} ${baseStart},180 ${baseEnd},180`}
          className="geometry-shape"
        />
        <text x="80" y="195" fontSize="12" fill="#333">base = {base}</text>
        <text x="105" y="80" fontSize="12" fill="#333">height = {height}</text>
      </svg>
    );
  }

  if (lower.includes("square")) {
    const size = Math.min(base, 120);
    return (
      <svg className="geometry-canvas" viewBox="0 0 200 200">
        <rect x="40" y="40" width={size} height={size} className="geometry-shape" />
        <text x="60" y="{50 + size}" fontSize="12" fill="#333">side = {base}</text>
      </svg>
    );
  }

  if (lower.includes("circle")) {
    const scaledRadius = Math.min(radius, 80);
    return (
      <svg className="geometry-canvas" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r={scaledRadius} className="geometry-shape" />
        <text x="100" y="{100 + scaledRadius + 12}" fontSize="12" fill="#333">r = {radius}</text>
      </svg>
    );
  }

  if (lower.includes("cone") || lower.includes("pyramid")) {
    return (
      <svg className="geometry-canvas" viewBox="0 0 200 200">
        <polygon points="100,30 30,170 170,170" className="geometry-shape" />
        <line x1="100" y1="30" x2="100" y2="170" stroke="#333" strokeDasharray="4" />
      </svg>
    );
  }

  if (lower.includes("cube") || lower.includes("prism")) {
    return (
      <svg className="geometry-canvas" viewBox="0 0 200 200">
        <rect x="50" y="50" width="100" height="100" className="geometry-shape" fillOpacity="0.3" />
        <polyline points="50,50 30,30 130,30 150,50" stroke="#333" fill="none" strokeWidth="2" />
        <line x1="130" y1="30" x2="130" y2="130" stroke="#333" />
        <line x1="150" y1="50" x2="150" y2="150" stroke="#333" />
      </svg>
    );
  }

  return (
    <div className="p-2 border rounded bg-white">
      <p className="text-sm italic text-gray-600">[Geometry placeholder: {content}]</p>
    </div>
  );
};

export default GeometryRenderer;
