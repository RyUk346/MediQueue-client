"use client";

import WarningModal from "@/components/WarningModal";
import { useState } from "react";
import toast from "react-hot-toast";

const BookedSessionsTable = ({ bookings, token }) => {
  const [items, setItems] = useState(bookings || []);
  const [cancelTarget, setCancelTarget] = useState(null);

  const cancelBooking = async () => {
    if (!cancelTarget) {
      return;
    }

    const serverUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

    const res = await fetch(`${serverUrl}/bookings/${cancelTarget._id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setItems(
        items.map((item) =>
          item._id === cancelTarget._id
            ? { ...item, status: "cancelled" }
            : item,
        ),
      );
      setCancelTarget(null);
      toast.success("Booking cancelled");
    } else {
      toast.error("Could not cancel booking");
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-bold">No booked sessions yet</h2>
        <p className="mx-auto mt-2 max-w-md text-slate-600 dark:text-slate-300">
          You have not booked any tutor session. Browse available tutors and
          reserve a learning slot.
        </p>
        <a
          href="/tutors"
          className="mt-5 inline-flex rounded-md bg-teal-600 px-5 py-3 font-bold text-white hover:bg-teal-700"
        >
          Browse Tutors
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full min-w-[780px] text-left text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="p-4">Tutor Name</th>
              <th className="p-4">Student Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((booking) => (
              <tr
                key={booking._id}
                className="border-t border-slate-200 dark:border-slate-800"
              >
                <td className="p-4 font-semibold">{booking.tutorName}</td>
                <td className="p-4">{booking.studentName}</td>
                <td className="p-4">{booking.studentEmail}</td>
                <td className="p-4 capitalize">{booking.status}</td>
                <td className="p-4">
                  <button
                    disabled={booking.status === "cancelled"}
                    onClick={() => setCancelTarget(booking)}
                    className="rounded-md bg-rose-600 px-3 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <WarningModal
        open={!!cancelTarget}
        title="Cancel Booking?"
        message={`Are you sure you want to cancel your session with ${
          cancelTarget?.tutorName || "this tutor"
        }? The tutor slot will be restored.`}
        confirmText="Cancel Session"
        onClose={() => setCancelTarget(null)}
        onConfirm={cancelBooking}
      />
    </>
  );
};

export default BookedSessionsTable;
