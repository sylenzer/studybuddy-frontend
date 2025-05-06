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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white dark:bg-background border shadow-md">
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground text-lg italic">“{testimonial.message}”</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <span className="text-sm text-muted-foreground italic">{testimonial.role}</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.stars ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                      }`}
                      fill={i < testimonial.stars ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
