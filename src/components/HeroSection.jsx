// src/components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import heroLogo from "../assets/FullLogo_Transparent hero.png";
import FeaturedTestimonialCarousel from "./FeaturedTestimonialCarousel";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-12 md:px-8">
        <div className="space-y-6 max-w-4xl mx-auto text-center">
          <img src={heroLogo} alt="StudyBuddy Logo" className="w-32 sm:w-40 mx-auto" />
          <h1 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl dark:text-white">
            StudyBuddy+ is your AI math guide
          </h1>
          <p className="max-w-2xl mx-auto">
            Get step-by-step math help with hints, visuals, and personalized tutoring — no final answers, just growth.
          </p>
          <div className="flex justify-center">
            <Link
              to="/solve"
              className="inline-block bg-purple-600 text-white text-sm px-6 py-3 rounded-full hover:bg-purple-700 transition"
            >
              Try the Solver
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <FeaturedTestimonialCarousel />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
