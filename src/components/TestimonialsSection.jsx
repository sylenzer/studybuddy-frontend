// components/TestimonialsSection.jsx
import { useState } from "react";
import testimonialsData from "@/lib/testimonialsData";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialForm } from "./TestimonialForm";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(testimonialsData);

  const handleNewTestimonial = (testimonial) => {
    setTestimonials((prev) => [
      { ...testimonial, id: prev.length + 1 },
      ...prev,
    ]);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <h2 className="text-3xl font-bold text-center">🌟 What People Are Saying</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} {...t} />
        ))}
      </div>

      <div className="mt-10 border-t pt-10">
        <h3 className="text-xl font-semibold mb-4">Leave Your Feedback</h3>
        <TestimonialForm onSubmit={handleNewTestimonial} />
      </div>
    </section>
  );
}
