// src/pages/Home.jsx
import React from "react";
import HeroSection from "@/components/HeroSection";


const Home = () => {
  

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-grow">
        <HeroSection />
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-purple-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to boost your math skills?
        </h2>
        <p className="text-gray-600 mb-8">
          Solve problems, track your progress, and build your confidence with StudyBuddy+!
        </p>
        <a
          href="/solver"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
        >
          Try the Solver Now
        </a>
      </section>
    </div>
  );
};

export default Home;
