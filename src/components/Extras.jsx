"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMonitor,
  FiSearch,
  FiShield,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};

const HomeExtras = () => {
  return (
    <>
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-16 max-w-7xl px-4"
      >
        <div className="grid items-center gap-8 rounded-lg bg-white p-8 shadow-sm dark:bg-slate-900 lg:grid-cols-2">
          <div>
            <p className="font-semibold text-teal-600">Smart Booking Flow</p>
            <h2 className="mt-2 text-3xl font-bold">
              Book sessions without schedule confusion
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              MediQueue helps students find tutors, check availability, and book
              sessions before the class starts. The system protects slots and
              keeps every session organized.
            </p>

            <Link
              href="/tutors"
              className="mt-6 inline-flex rounded-md bg-teal-600 px-5 py-3 font-bold text-white hover:bg-teal-700"
            >
              Find Tutors
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: <FiSearch />,
                title: "Search Tutors",
                text: "Find tutors by name and subject focus.",
              },
              {
                icon: <FiCalendar />,
                title: "Date Filtering",
                text: "Filter sessions by available registration dates.",
              },
              {
                icon: <FiShield />,
                title: "Slot Protection",
                text: "Booking count updates after every confirmed session.",
              },
              {
                icon: <FiMonitor />,
                title: "Flexible Mode",
                text: "Choose online, offline, or both teaching modes.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-slate-200 p-5 dark:border-slate-800"
              >
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-md bg-teal-50 text-xl text-teal-600">
                  {item.icon}
                </div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-16 max-w-7xl px-4"
      >
        <div className="rounded-lg bg-teal-600 p-8 text-white">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="font-semibold text-teal-100">How It Works</p>
              <h2 className="mt-2 text-3xl font-bold">
                A simpler way to manage learning sessions
              </h2>
              <p className="mt-4 text-teal-50">
                Students can quickly move from tutor discovery to confirmed
                booking while tutors keep control of their session capacity.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: <FiSearch />,
                  title: "Browse",
                  text: "Explore tutor profiles and availability.",
                },
                {
                  icon: <FiClock />,
                  title: "Book",
                  text: "Submit student details and reserve a slot.",
                },
                {
                  icon: <FiCheckCircle />,
                  title: "Manage",
                  text: "Track sessions and cancel when needed.",
                },
              ].map((step) => (
                <div key={step.title} className="rounded-lg bg-white/15 p-5">
                  <div className="text-3xl">{step.icon}</div>
                  <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-teal-50">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default HomeExtras;
