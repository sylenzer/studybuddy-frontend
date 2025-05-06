// GeometryRenderer.jsx
import React from "react";

export const GeometryRenderer = ({ data }) => {
  if (!data || !data.objects) return null;

  const renderShape = (obj, index) => {
    switch (obj.shape) {
      case "circle":
        return (
          <circle
            key={index}
            cx={obj.center[0]}
            cy={obj.center[1]}
            r={obj.radius}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        );
      case "triangle":
        return (
          <polygon
            key={index}
            points={obj.points.map(p => p.join(",")).join(" ")}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        );
      case "square":
        return (
          <rect
            key={index}
            x={obj.topLeft[0]}
            y={obj.topLeft[1]}
            width={obj.size}
            height={obj.size}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        );
      case "line":
        return (
          <line
            key={index}
            x1={obj.point1[0]}
            y1={obj.point1[1]}
            x2={obj.point2[0]}
            y2={obj.point2[1]}
            stroke="black"
            strokeWidth="2"
          />
        );
      case "segment":
        return (
          <line
            key={index}
            x1={obj.start[0]}
            y1={obj.start[1]}
            x2={obj.end[0]}
            y2={obj.end[1]}
            stroke="black"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        );
      case "angle":
        // Simple angle with arc approximation
        const [cx, cy] = obj.vertex;
        const r = obj.radius || 30;
        const startAngle = obj.startAngle || 0;
        const endAngle = obj.endAngle || 45;
        const largeArcFlag = (endAngle - startAngle) <= 180 ? "0" : "1";
        const x1 = cx + r * Math.cos((startAngle * Math.PI) / 180);
        const y1 = cy + r * Math.sin((startAngle * Math.PI) / 180);
        const x2 = cx + r * Math.cos((endAngle * Math.PI) / 180);
        const y2 = cy + r * Math.sin((endAngle * Math.PI) / 180);

        return (
          <path
            key={index}
            d={`M ${cx},${cy} L ${x1},${y1} A ${r},${r} 0 ${largeArcFlag},1 ${x2},${y2} Z`}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        );
      default:
        return null;
    }
  };

  return (
    <svg width="600" height="400" className="border mx-auto bg-white">
      {data.objects.map((obj, index) => renderShape(obj, index))}
    </svg>
  );
};

export default GeometryRenderer;