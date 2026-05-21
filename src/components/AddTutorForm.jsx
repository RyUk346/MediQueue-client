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
      <div>
        <label className="mb-1 block text-sm font-semibold">Tutor Name</label>
        <input
          name="tutorName"
          required
          placeholder="Tutor Name"
          className="input"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Photo URL</label>
        <input
          name="photo"
          required
          type="url"
          placeholder="Photo URL"
          className="input"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">
          Subject / Category
        </label>
        <select name="subject" required className="input">
          <option value="">Select subject</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">
          Available Days
        </label>
        <input
          name="availableDays"
          required
          placeholder="Sun - Thu"
          className="input"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">
          Available Time
        </label>
        <input
          name="availableTime"
          required
          placeholder="5:00 PM - 8:00 PM"
          className="input"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Hourly Fee</label>
        <input
          name="hourlyFee"
          required
          type="number"
          min="1"
          placeholder="Hourly Fee"
          className="input"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Total Slot</label>
        <input
          name="totalSlot"
          required
          type="number"
          min="0"
          placeholder="Total Slot"
          className="input"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">
          Session Start Date
        </label>
        <input name="sessionStartDate" required type="date" className="input" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Institution</label>
        <input
          name="institution"
          required
          placeholder="Institution"
          className="input"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Experience</label>
        <input
          name="experience"
          required
          placeholder="5 years"
          className="input"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Location</label>
        <input
          name="location"
          required
          placeholder="Area / City"
          className="input"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">
          Teaching Mode
        </label>
        <select name="teachingMode" required className="input">
          <option value="">Select mode</option>
          {modes.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="mb-1 block text-sm font-semibold">
          Short Tutor Overview
        </label>
        <textarea
          name="bio"
          required
          placeholder="Short tutor overview"
          className="input min-h-28"
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-teal-600 px-5 py-3 font-bold text-white hover:bg-teal-700 md:col-span-2"
      >
        Submit Tutor
      </button>
    </form>
  );
};

export default AddTutorForm;
