// src/components/HeroSection.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import AnimatedGradientButton from "./ui/AnimatedGradientButton";
import FeaturedTestimonialCarousel from "./FeaturedTestimonialCarousel";

const symbols = ["+", "−", "×", "÷", "π", "√", "Σ"];

const HeroSection = () => {
  const floatingSymbols = useMemo(() => {
    return symbols.map((symbol, idx) => ({
      symbol,
      id: `${symbol}-${idx}`,
      top: Math.random() * 90,
      left: Math.random() * 90,
      delay: Math.random() * 3,
      duration: 6 + Math.random() * 4,
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="relative w-full overflow-hidden">

      {/* Floating Math Symbols */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
      >
        {floatingSymbols.map((item) => (
          <div
            key={item.id}
            className="absolute text-purple-300 text-6xl opacity-20 animate-drift hover:animate-sparkle"
            style={{
              top: `${item.top}%`,
              left: `${item.left}%`,
              transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.symbol}
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <section className="min-h-screen text-center flex flex-col justify-center items-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800">
          Welcome to <span className="text-purple-600">StudyBuddy+</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto mb-8">
          Your AI-powered math companion for solving problems, tracking progress, and building confidence.
        </p>
        <Link to="/solver">
          <AnimatedGradientButton label="Try Solver" />
        </Link>
      </section>

      {/* Testimonials */}
      <section className="relative z-20 mt-16 w-full max-w-5xl mx-auto">
        <FeaturedTestimonialCarousel />
      </section>
    </div>
  );
};

export default HeroSection;
