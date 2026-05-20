import TutorCard from "@/components/TutorCard";

export const metadata = {
  title: "Tutors",
};

export const dynamic = "force-dynamic";

const TutorsPage = async ({ searchParams }) => {
  const params = await searchParams;

  const query = new URLSearchParams();

  if (params?.search) {
    query.set("search", params.search);
  }

  if (params?.startDate) {
    query.set("startDate", params.startDate);
  }

  if (params?.endDate) {
    query.set("endDate", params.endDate);
  }

  const serverUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const res = await fetch(`${serverUrl}/tutors?${query.toString()}`, {
    cache: "no-store",
  });

  const tutors = await res.json();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">All Tutors</h1>

      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Search tutors by name or filter sessions by date.
      </p>

      <form className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-4">
        <input
          name="search"
          defaultValue={params?.search || ""}
          placeholder="Search by tutor name"
          className="input"
        />

        <input
          name="startDate"
          defaultValue={params?.startDate || ""}
          type="date"
          className="input"
        />

        <input
          name="endDate"
          defaultValue={params?.endDate || ""}
          type="date"
          className="input"
        />

        <button className="rounded-md bg-teal-600 px-5 py-3 font-bold text-white hover:bg-teal-700">
          Search & Filter
        </button>
      </form>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor) => (
          <TutorCard key={tutor._id} tutor={tutor} />
        ))}
      </div>

      {tutors.length === 0 && (
        <p className="mt-8 rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
          No tutors matched your search. Try a different name or date range.
        </p>
      )}
    </section>
  );
};

export default TutorsPage;
