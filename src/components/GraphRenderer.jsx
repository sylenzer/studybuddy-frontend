// GraphRenderer.jsx
import React from "react";

export const GraphRenderer = ({ data }) => {
  if (!data || !data.points) return null;

  const width = 600;
  const height = 400;
  const margin = 40;
  const gridSpacing = 20; // distance between minor grid lines
  const unitPerGrid = 1; // 1 unit per gridline
  const majorEvery = 5; // major gridline every 5 units

  const scaleX = (x) => width / 2 + x * gridSpacing;
  const scaleY = (y) => height / 2 - y * gridSpacing;

  const xUnits = Math.floor((width - 2 * margin) / gridSpacing);
  const yUnits = Math.floor((height - 2 * margin) / gridSpacing);

  return (
    <svg width={width} height={height} className="border mx-auto bg-white">
      {/* Minor Grid */}
      <g stroke="#e0e0e0">
        {Array.from({ length: xUnits * 2 + 1 }, (_, i) => (
          <line
            key={`v-${i}`}
            x1={i * gridSpacing}
            y1={0}
            x2={i * gridSpacing}
            y2={height}
          />
        ))}
        {Array.from({ length: yUnits * 2 + 1 }, (_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * gridSpacing}
            x2={width}
            y2={i * gridSpacing}
          />
        ))}
      </g>

      {/* Major Grid (dashed) */}
      <g stroke="#cccccc" strokeDasharray="5,5">
        {Array.from({ length: xUnits * 2 + 1 }, (_, i) => {
          const x = i * gridSpacing;
          const val = (i - xUnits) * unitPerGrid;
          return val % majorEvery === 0 ? (
            <line key={`vm-${i}`} x1={x} y1={0} x2={x} y2={height} />
          ) : null;
        })}
        {Array.from({ length: yUnits * 2 + 1 }, (_, i) => {
          const y = i * gridSpacing;
          const val = (yUnits - i) * unitPerGrid;
          return val % majorEvery === 0 ? (
            <line key={`hm-${i}`} x1={0} y1={y} x2={width} y2={y} />
          ) : null;
        })}
      </g>

      {/* Axes */}
      <line
        x1={0}
        y1={height / 2}
        x2={width}
        y2={height / 2}
        stroke="black"
        strokeWidth="2"
      />
      <line
        x1={width / 2}
        y1={0}
        x2={width / 2}
        y2={height}
        stroke="black"
        strokeWidth="2"
      />

      {/* Axis Labels */}
      <text x={width - margin} y={height / 2 - 10} fontSize="16" fill="black">
        x
      </text>
      <text x={width / 2 + 10} y={margin} fontSize="16" fill="black">
        y
      </text>

      {/* Numbered ticks */}
      <g fontSize="12" fill="black">
        {/* X-axis numbers */}
        {Array.from({ length: xUnits * 2 + 1 }, (_, i) => {
          const val = (i - xUnits) * unitPerGrid;
          return val % majorEvery === 0 ? (
            <text
              key={`xtick-${i}`}
              x={i * gridSpacing + 2}
              y={height / 2 + 15}
            >
              {val}
            </text>
          ) : null;
        })}
        {/* Y-axis numbers */}
        {Array.from({ length: yUnits * 2 + 1 }, (_, i) => {
          const val = (yUnits - i) * unitPerGrid;
          return val % majorEvery === 0 && val !== 0 ? (
            <text
              key={`ytick-${i}`}
              x={width / 2 + 5}
              y={i * gridSpacing + 5}
            >
              {val}
            </text>
          ) : null;
        })}
      </g>

      {/* Origin marker */}
      <circle
        cx={width / 2}
        cy={height / 2}
        r="4"
        fill="red"
      />

      {/* Points */}
      <g stroke="blue" fill="blue">
        {data.points.map((p, i) => (
          <circle key={i} cx={scaleX(p[0])} cy={scaleY(p[1])} r="4" />
        ))}
      </g>

      {/* Optional: Lines */}
      {data.lines &&
        data.lines.map((line, idx) => (
          <line
            key={idx}
            x1={scaleX(line[0][0])}
            y1={scaleY(line[0][1])}
            x2={scaleX(line[1][0])}
            y2={scaleY(line[1][1])}
            stroke="red"
            strokeWidth="2"
          />
        ))}
    </svg>
  );
};

export default GraphRenderer;
