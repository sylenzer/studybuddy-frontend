// src/components/FAQReviewForm.jsx
import React, { useState } from "react";

const FAQReviewForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !review.trim()) return;
    onSubmit({ name, review, createdAt: Date.now() });
    setSubmitted(true);
    setName("");
    setReview("");
  };

  return (
    <div className="mt-20 max-w-2xl mx-auto w-full bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Leave a Review</h3>
      {submitted && (
        <div className="text-green-600 text-center mb-4">Thank you for your feedback!</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Write your review here..."
          className="w-full p-3 border rounded-md resize-y min-h-[100px]"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default FAQReviewForm;
