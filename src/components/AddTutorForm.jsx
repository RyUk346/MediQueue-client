"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "ICT",
];

const modes = ["Online", "Offline", "Both"];

const AddTutorForm = ({ user, token }) => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const tutor = {
      ...Object.fromEntries(formData.entries()),
      userName: user.name,
      userEmail: user.email,
      userImage: user.image,
    };

    const serverUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

    const res = await fetch(`${serverUrl}/tutors`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tutor),
    });

    if (res.ok) {
      toast.success("Tutor added successfully");
      router.push("/my-tutors");
      router.refresh();
    } else {
      toast.error("Could not add tutor");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2"
    >
      <input
        name="tutorName"
        required
        placeholder="Tutor Name"
        className="input"
      />

      <input
        name="photo"
        required
        type="url"
        placeholder="Photo URL"
        className="input"
      />

      <select name="subject" required className="input">
        <option value="">Subject / Category</option>
        {subjects.map((subject) => (
          <option key={subject}>{subject}</option>
        ))}
      </select>

      <input
        name="availableDays"
        required
        placeholder="Available Days e.g. Sun - Thu"
        className="input"
      />

      <input
        name="availableTime"
        required
        placeholder="Available Time e.g. 5:00 PM - 8:00 PM"
        className="input"
      />

      <input
        name="hourlyFee"
        required
        type="number"
        min="1"
        placeholder="Hourly Fee"
        className="input"
      />

      <input
        name="totalSlot"
        required
        type="number"
        min="0"
        placeholder="Total Slot"
        className="input"
      />

      <input name="sessionStartDate" required type="date" className="input" />

      <input
        name="institution"
        required
        placeholder="Institution"
        className="input"
      />

      <input
        name="experience"
        required
        placeholder="Experience e.g. 5 years"
        className="input"
      />

      <input
        name="location"
        required
        placeholder="Location Area/City"
        className="input"
      />

      <select name="teachingMode" required className="input">
        <option value="">Teaching Mode</option>
        {modes.map((mode) => (
          <option key={mode}>{mode}</option>
        ))}
      </select>

      <textarea
        name="bio"
        required
        placeholder="Short tutor overview"
        className="input min-h-28 md:col-span-2"
      />

      <button className="rounded-md bg-teal-600 px-5 py-3 font-bold text-white hover:bg-teal-700 md:col-span-2">
        Submit Tutor
      </button>
    </form>
  );
};

export default AddTutorForm;
