import React from "react";
import { Link } from "react-router-dom";
import TestimonialCarousel from "../components/FeaturedTestimonialCarousel";
import FullLogo from "../assets/FullLogo_Transparent hero.png";


const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-12">
      <img
        src={FullLogo}
        alt="StudyBuddy Logo"
        className="w-48 h-auto mb-6 drop-shadow-md"
      />
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to StudyBuddy+</h1>
      <p className="text-lg md:text-xl mb-6">
        Get step-by-step math help with hints, visuals, and adaptive learning — powered by AI, built for students.
      </p>
      <div className="mb-12">
        <TestimonialCarousel />
      </div>
      <Link
        to="/solver"
        className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
      >
        Try the Problem Solver
      </Link>
    </div>
  );
};

export default Home;
