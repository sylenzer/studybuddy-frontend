// src/components/LoaderCube.jsx
import React from "react";
import "../styles/loaderCube.css"; // You’ll create this stylesheet next

const LoaderCube = () => {
  return (
    <div className="boxes">
      {[1, 2, 3, 4].map((n) => (
        <div className="box" key={n}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ))}
    </div>
  );
};

export default LoaderCube;
