import React from "react";

const AnimatedGradientButton = ({ label = "Try Solver" }) => {
  return (
    <button
      className="group relative z-10 cursor-pointer text-white text-4xl sm:text-6xl px-20 py-10 font-extrabold rounded-full bg-gradient-to-r from-purple-600 to-pink-500 animate-glow hover:scale-110 active:scale-95 transition-transform duration-300"
      style={{
        WebkitBoxReflect: "below 0px linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.3))"
      }}
    >
      <span className="z-40 tracking-wide drop-shadow-lg">🚀 {label}</span>
    </button>
  );
};

export default AnimatedGradientButton;
