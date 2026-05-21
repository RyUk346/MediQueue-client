"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const BookingForm = ({ tutor, user, token }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const noSlot = Number(tutor.totalSlot) <= 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const booking = {
      ...Object.fromEntries(new FormData(e.currentTarget).entries()),
      tutorId: tutor._id,
      tutorName: tutor.tutorName,
      studentEmail: user.email,
    };

    const serverUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

    const res = await fetch(`${serverUrl}/bookings`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(booking),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Session booked successfully");
      setOpen(false);
      router.push("/my-booked-sessions");
      router.refresh();
    } else {
      toast.error(data.message || "Booking failed");
    }
  };

  return (
    <>
      <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-bold">Ready to book?</h2>

        {noSlot ? (
          <p className="mt-3 rounded-md bg-rose-50 p-3 text-sm text-rose-700">
            No available slots left.
          </p>
        ) : (
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Open the booking form and confirm your learning session.
          </p>
        )}

        <button
          type="button"
          disabled={noSlot}
          onClick={() => setOpen(true)}
          className="mt-5 w-full rounded-md bg-teal-600 px-5 py-3 font-bold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Book Session
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4">
          <form
            onSubmit={onSubmit}
            className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900"
          >
            <h2 className="text-2xl font-bold">Book Session</h2>

            <div className="mt-5 grid gap-4">
              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Student Name
                </label>
                <input
                  name="studentName"
                  defaultValue={user.name}
                  required
                  className="input"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold">Phone</label>
                <input name="phone" required className="input" />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Tutor ID
                </label>
                <input
                  value={tutor._id}
                  readOnly
                  className="input bg-slate-100 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Tutor Name
                </label>
                <input
                  value={tutor.tutorName}
                  readOnly
                  className="input bg-slate-100 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Student Email
                </label>
                <input
                  value={user.email}
                  readOnly
                  className="input bg-slate-100 dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-slate-300 px-4 py-2 font-semibold"
              >
                Close
              </button>
              <button
                type="submit"
                className="rounded-md bg-teal-600 px-4 py-2 font-bold text-white"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default BookingForm;
