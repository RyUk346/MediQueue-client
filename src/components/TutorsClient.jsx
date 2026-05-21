"use client";

import { useEffect, useState } from "react";
import TutorCard from "@/components/TutorCard";
import { useSearchParams } from "next/navigation";

const TutorsClient = () => {
  const searchParams = useSearchParams();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("search") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  useEffect(() => {
    const loadTutors = async () => {
      setLoading(true);

      const query = new URLSearchParams();

      if (search) query.set("search", search);
      if (startDate) query.set("startDate", startDate);
      if (endDate) query.set("endDate", endDate);

      try {
        const serverUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

        const res = await fetch(`${serverUrl}/tutors?${query.toString()}`);

        if (res.ok) {
          const data = await res.json();
          setTutors(Array.isArray(data) ? data : []);
        } else {
          setTutors([]);
        }
      } catch (error) {
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };

    loadTutors();
  }, [search, startDate, endDate]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">All Tutors</h1>

      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Search tutors by name or filter sessions by date.
      </p>

      <form className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-4">
        <input
          name="search"
          defaultValue={search}
          placeholder="Search by tutor name"
          className="input"
        />

        <input
          name="startDate"
          defaultValue={startDate}
          type="date"
          className="input"
        />

        <input
          name="endDate"
          defaultValue={endDate}
          type="date"
          className="input"
        />

        <button className="rounded-md bg-teal-600 px-5 py-3 font-bold text-white hover:bg-teal-700">
          Search & Filter
        </button>
      </form>

      {loading ? (
        <div className="mt-8 grid place-items-center py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
        </div>
      ) : tutors.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
          No tutors matched your search. Try a different name or date range.
        </p>
      )}
    </section>
  );
};

export default TutorsClient;
