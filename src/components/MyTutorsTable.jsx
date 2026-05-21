"use client";

import WarningModal from "@/components/WarningModal";
import { useState } from "react";
import toast from "react-hot-toast";

const MyTutorsTable = ({ tutors, token }) => {
  const [items, setItems] = useState(Array.isArray(tutors) ? tutors : []);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const deleteTutor = async () => {
    if (!deleteTarget) {
      return;
    }

    const serverUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

    const res = await fetch(`${serverUrl}/tutors/${deleteTarget._id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setItems(items.filter((item) => item._id !== deleteTarget._id));
      setDeleteTarget(null);
      toast.success("Tutor deleted");
    } else {
      toast.error("Could not delete tutor");
    }
  };

  const updateTutor = async (e) => {
    e.preventDefault();

    const updatedTutor = {
      ...editing,
      ...Object.fromEntries(new FormData(e.currentTarget).entries()),
    };

    const serverUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

    const res = await fetch(`${serverUrl}/tutors/${editing._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTutor),
    });

    if (res.ok) {
      setItems(
        items.map((item) => (item._id === editing._id ? updatedTutor : item)),
      );
      setEditing(null);
      toast.success("Tutor updated");
    } else {
      toast.error("Could not update tutor");
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-bold">No tutors added yet</h2>
        <p className="mx-auto mt-2 max-w-md text-slate-600 dark:text-slate-300">
          You have not created any tutor profile. Add your first tutor to start
          receiving session bookings.
        </p>
        <a
          href="/add-tutor"
          className="mt-5 inline-flex rounded-md bg-teal-600 px-5 py-3 font-bold text-white hover:bg-teal-700"
        >
          Add Tutor
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="p-4">Tutor Name</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Available</th>
              <th className="p-4">Hourly Fee</th>
              <th className="p-4">Total Seat</th>
              <th className="p-4">Registration Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((tutor) => (
              <tr
                key={tutor._id}
                className="border-t border-slate-200 dark:border-slate-800"
              >
                <td className="p-4 font-semibold">{tutor.tutorName}</td>

                <td className="p-4">{tutor.subject}</td>

                <td className="p-4">
                  {tutor.availableDays}, {tutor.availableTime}
                </td>

                <td className="p-4">${tutor.hourlyFee}</td>

                <td className="p-4">{tutor.totalSlot}</td>

                <td className="p-4">
                  {tutor.createdAt
                    ? new Date(tutor.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="flex gap-2 p-4 items-end justify-end">
                  <button
                    onClick={() => setEditing(tutor)}
                    className="rounded-md bg-amber-500 px-3 py-2 font-semibold text-white"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => setDeleteTarget(tutor)}
                    className="rounded-md bg-rose-600 px-3 py-2 font-semibold text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4">
          <form
            onSubmit={updateTutor}
            className="grid max-h-[90vh] w-full max-w-2xl gap-4 overflow-auto rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900 md:grid-cols-2"
          >
            <h2 className="text-2xl font-bold md:col-span-2">Update Tutor</h2>

            {[
              ["tutorName", "Tutor Name"],
              ["photo", "Photo URL"],
              ["subject", "Subject"],
              ["availableDays", "Available Days"],
              ["availableTime", "Available Time"],
              ["hourlyFee", "Hourly Fee"],
              ["totalSlot", "Total Slot"],
              ["sessionStartDate", "Session Start Date"],
              ["institution", "Institution"],
              ["experience", "Experience"],
              ["location", "Location"],
              ["teachingMode", "Teaching Mode"],
            ].map(([name, label]) => (
              <div key={name}>
                <label className="mb-1 block text-sm font-semibold">
                  {label}
                </label>
                <input
                  name={name}
                  defaultValue={editing[name]}
                  className="input"
                  required
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-semibold">
                Short Tutor Overview
              </label>
              <textarea
                name="bio"
                defaultValue={editing.bio}
                className="input min-h-24"
                required
              />
            </div>

            <button
              type="submit"
              className="rounded-md bg-teal-600 px-4 py-3 font-bold text-white"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-md border border-slate-300 px-4 py-3 font-bold"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <WarningModal
        open={!!deleteTarget}
        title="Delete Tutor?"
        message={`Are you sure you want to delete ${
          deleteTarget?.tutorName || "this tutor"
        }? This action cannot be undone.`}
        confirmText="Delete"
        onClose={() => setDeleteTarget(null)}
        onConfirm={deleteTutor}
      />
    </>
  );
};

export default MyTutorsTable;
