"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import TutorCard from "./TutorCard";

const Featured = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTutors = async () => {
      try {
        const serverUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

        const res = await fetch(`${serverUrl}/featured-tutors`);
        const data = await res.json();

        setTutors(Array.isArray(data) ? data : []);
      } catch (error) {
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };

    loadTutors();
  }, []);

  if (!loading && tutors.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="mx-auto mt-14 max-w-7xl px-4"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Available Tutors</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Login to see all tutors
          </p>
        </div>

        <Link
          href="/tutors"
          className="rounded-md border border-teal-600 px-5 py-3 font-semibold text-teal-600"
        >
          All Tutors
        </Link>
      </div>

      {loading ? (
        <div className="mt-8 grid place-items-center py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default Featured;
