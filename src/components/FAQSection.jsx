// src/components/FAQSection.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import FAQReviewForm from "./FAQReviewForm";

const faqs = [
  {
    question: "Who can use StudyBuddy+?",
    answer: "You must be 18 years or older to use StudyBuddy+. We do not allow access to anyone under 18, and accounts violating this rule will be terminated without refund."
  },
  {
    question: "How does StudyBuddy+ work?",
    answer: "You enter a math problem and the AI will guide you through step-by-step solutions, hints, and visualizations — without giving away the final answer."
  },
  {
    question: "Is this service free?",
    answer: "No. StudyBuddy+ uses a token-based system. You can purchase token packs from the Pricing page. A small signup bonus is provided."
  },
  {
    question: "Can I get a refund?",
    answer: "No. All token purchases are final. We recommend starting with a small token pack if you're new."
  },
  {
    question: "What happens if I misuse the platform?",
    answer: "Anyone using StudyBuddy+ to cheat, violate the Terms of Service, or impersonate another user will be permanently removed without refund."
  },
  {
    question: "How is this different from other math solvers?",
    answer: "StudyBuddy+ helps you understand, not just get answers. It uses Common Core-aligned explanations, adaptive hints, and AI that teaches, not cheats."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [reviews, setReviews] = useState([]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleReviewSubmit = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-gray-100 py-20 px-4">
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 w-full">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-50 border border-gray-200 rounded-md shadow-md"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left px-6 py-4 font-medium text-gray-800 hover:text-purple-600 transition"
              >
                {faq.question}
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={openIndex === idx ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden px-6 pb-4 text-gray-600"
              >
                {faq.answer}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Review Form */}
        <FAQReviewForm onSubmit={handleReviewSubmit} />

        {/* Recent Reviews */}
        {reviews.length > 0 && (
          <div className="max-w-2xl mx-auto mt-12 space-y-6">
            <h3 className="text-2xl font-semibold text-center text-gray-800">Recent Reviews</h3>
            {reviews.map((r, idx) => (
              <div key={idx} className="bg-white p-4 rounded shadow">
                <p className="text-gray-700 mb-2">“{r.review}”</p>
                <p className="text-sm text-gray-500 text-right">— {r.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQSection;
