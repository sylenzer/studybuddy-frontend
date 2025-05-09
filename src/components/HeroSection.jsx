// src/components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import AnimatedGradientButton from "./ui/AnimatedGradientButton";
import FeaturedTestimonialCarousel from "./FeaturedTestimonialCarousel";

const HeroSection = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Content */}
      <section className="min-h-screen text-center flex flex-col items-center justify-center py-24 px-6 space-y-6">
        <h1 className="text-5xl font-extrabold text-purple-700 drop-shadow-sm">
          Master Math With StudyBuddy+
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          An adaptive AI math tutor that explains problems, gives hints, draws graphs, and helps you learn — step by step.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/solver">
            <AnimatedGradientButton>Try Solver</AnimatedGradientButton>
          </Link>
          <Link to="/pricing">
            <button className="bg-white border border-purple-600 text-purple-600 px-6 py-2 rounded hover:bg-purple-50 font-medium">
              View Pricing
            </button>
          </Link>
        </div>
      </section>

      <FeaturedTestimonialCarousel />
    </div>
  );
};

export default HeroSection;
