// src/components/FAQSection.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLoading } from "../context/LoadingContext";
import FAQReviewForm from "./FAQReviewForm";


const faqs = [
  {
    question: "How do I use the Custom Problem Solver?",
    answer: "Just enter your math problem in the text box and click 'Solve'. You'll get step-by-step help, visuals, and hints."
  },
  {
    question: "Is StudyBuddy+ free to use?",
    answer: "No it cost money. You must sign up for an account. You will be redirect to stripe for payment."
  },
  {
    question: "Can I track my learning progress?",
    answer: "Absolutely. Your problems, solutions, and progress are saved to your account so you can review them anytime."
  }
];

const FAQSection = () => {
  const floatingSymbols = useMemo(() => {
    return symbols.map((symbol, idx) => ({
      symbol,
      id: `${symbol}-${idx}`,
      top: Math.random() * 90,
      left: Math.random() * 90,
      delay: Math.random() * 3,
      duration: 6 + Math.random() * 4,
      rotation: Math.random() * 360
    }));
  }, []);

  const [openIndex, setOpenIndex] = useState(null);
  const { setLoading } = useLoading();
  const [reviews, setReviews] = useState([]);

  const toggle = async (index) => {
    setLoading(true);
    setTimeout(() => {
      setOpenIndex(openIndex === index ? null : index);
      setLoading(false);
    }, 300);
  };

  const handleReviewSubmit = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-gray-100 py-20 px-4">
      {/* Floating Math Symbols */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {floatingSymbols.map((item) => (
          <div
            key={item.id}
            className="absolute text-purple-300 text-5xl opacity-20 animate-drift hover:animate-sparkle"
            style={{
              top: `${item.top}%`,
              left: `${item.left}%`,
              transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`
            }}
          >
            {item.symbol}
          </div>
        ))}
      </div>

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

        <FAQReviewForm onSubmit={handleReviewSubmit} />

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
