"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    title: "Book trusted tutors without scheduling chaos",
    text: "Find subject specialists, check availability, and reserve a session token in a few clicks.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Protect every learning slot",
    text: "MediQueue keeps every tutor's slot count accurate and avoids double booking.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Plan online and offline classes with confidence",
    text: "Browse by subject, location, teaching mode, and session start date.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
  },
];

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) =>
        current === slides.length - 1 ? 0 : current + 1,
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setActiveSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const handleNext = () => {
    setActiveSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-7xl px-4 pt-8"
    >
      <div className="relative h-[520px] overflow-hidden rounded-lg">
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-slate-950/60" />

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-3xl px-8 text-white md:px-14">
                <h1 className="text-4xl font-bold md:text-6xl">
                  {slide.title}
                </h1>

                <p className="mt-5 text-lg text-slate-100 md:text-xl">
                  {slide.text}
                </p>

                <Link
                  href="/tutors"
                  className="mt-7 inline-flex rounded-md bg-teal-600 px-6 py-3 font-bold text-white hover:bg-teal-700"
                >
                  Explore Tutors
                </Link>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow hover:bg-white"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-900 shadow hover:bg-white"
          aria-label="Next slide"
        >
          <FiChevronRight size={24} />
        </button>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeSlide ? "w-8 bg-teal-500" : "w-2.5 bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Banner;
