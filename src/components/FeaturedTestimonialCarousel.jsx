// components/FeaturedTestimonialCarousel.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import testimonials from "@/lib/testimonialsData"; // ✅ clean and alias-based


export default function FeaturedTestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [paused]);

  const testimonial = testimonials[index];

  return (
    <div
      className="relative max-w-3xl mx-auto px-4 py-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-white shadow-md p-6"
        >
          <div className="flex gap-4 items-start">
            <div className="text-yellow-400">
              {[...Array(testimonial.rating)].map((_, i) => (
                <StarIcon key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <div>
              <p className="text-gray-700 italic">“{testimonial.message}”</p>
              <p className="text-sm font-semibold text-gray-900 mt-2">— {testimonial.author}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
