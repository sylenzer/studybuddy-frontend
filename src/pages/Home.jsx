// src/pages/Home.jsx
import React from "react";
import FeaturedTestimonialCarousel from "@/components/FeaturedTestimonialCarousel";

const Home = () => {
  return (
    <div className="space-y-12">
      <section className="text-center py-20 bg-gradient-to-br from-indigo-100 to-purple-100">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4">
          Welcome to StudyBuddy+
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Get step-by-step math help with hints, visuals, and adaptive learning — powered by AI, built for students.
        </p>
      </section>

      <FeaturedTestimonialCarousel />
    </div>
  );
};

export default Home;
