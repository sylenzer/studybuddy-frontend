// src/components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/FullLogo_Transparent.png";
import FeaturedTestimonialCarousel from "./FeaturedTestimonialCarousel";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-12 md:px-8">
        <div className="space-y-6 max-w-4xl mx-auto text-center">
          <img src={logo} alt="StudyBuddy Logo" className="w-40 sm:mx-auto" />
          <h1 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl dark:text-white">
            StudyBuddy+ is your AI math guide
          </h1>
          <p className="max-w-2xl mx-auto">
            Get step-by-step math help with hints, visuals, and adaptive learning — powered by AI, built for students.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Link
              to="/login"
              className="block py-2 px-4 text-center text-white font-medium bg-purple-600 duration-150 hover:bg-purple-500 active:bg-purple-700 rounded-lg shadow-lg hover:shadow-none"
            >
              Let's get started
            </Link>
            <Link
              to="/pricing"
              className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg dark:text-white dark:border-white/30 dark:hover:border-white"
            >
              View pricing
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <FeaturedTestimonialCarousel />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
