import React from "react";
import { Link } from "react-router-dom";

const FancyWaveButton = ({ to = "/", topText = "WELCOME", bottomText = "STUDYBUDDY+" }) => {
  return (
    <Link to={to} className="group relative z-10">
      <button
        style={{
          WebkitBoxReflect: "below 0px linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4))"
        }}
        className="px-10 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-500 shadow-purple-500 relative overflow-hidden group text-transparent font-serif tracking-widest"
      >
        <p className="absolute z-40 font-semibold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent top-1/2 left-1/2 -translate-x-1/2 group-hover:-translate-y-full h-full w-full transition-all duration-300 -translate-y-[30%]">
          {topText}
        </p>
        <p className="absolute z-40 top-1/2 left-1/2 bg-gradient-to-r from-purple-800 to-pink-700 bg-clip-text text-transparent -translate-x-1/2 translate-y-full h-full w-full transition-all duration-300 group-hover:-translate-y-[40%] font-extrabold">
          {bottomText}
        </p>

        {/* Top SVG shimmer wave */}
        <svg
          className="absolute w-full h-full scale-x-125 rotate-180 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group-hover:animate-none animate-pulse group-hover:-translate-y-[45%] transition-all duration-300"
          viewBox="0 0 2400 800"
        >
          <defs>
            <linearGradient id="wave-grad" y2="100%" x2="50%" y1="0%" x1="50%">
              <stop offset="0%" stopOpacity="1" stopColor="#e879f9" />
              <stop offset="100%" stopOpacity="1" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <g fill="url(#wave-grad)">
            <path
              opacity="0.05"
              transform="translate(0,35)"
              d="M0 305 Q 228 450 600 302 Q 1010 450 1200 343 Q 1380 450 1800 320 Q 2154 450 2400 314 L 2400 800 L 0 800 Z"
            />
            <path
              opacity="0.21"
              transform="translate(0,70)"
              d="M0 305 Q 228 450 600 302 Q 1010 450 1200 343 Q 1380 450 1800 320 Q 2154 450 2400 314 L 2400 800 L 0 800 Z"
            />
            <path
              opacity="1"
              transform="translate(0,245)"
              d="M0 305 Q 228 450 600 302 Q 1010 450 1200 343 Q 1380 450 1800 320 Q 2154 450 2400 314 L 2400 800 L 0 800 Z"
            />
          </g>
        </svg>
      </button>
    </Link>
  );
};

export default FancyWaveButton;