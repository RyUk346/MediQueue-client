import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiMapPin, FiMonitor, FiUsers } from "react-icons/fi";

const TutorCard = ({ tutor }) => {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-56 w-full">
        <Image
          src={tutor.photo}
          alt={tutor.tutorName}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-teal-600">
              {tutor.subject}
            </p>
            <h2 className="text-xl font-bold">{tutor.tutorName}</h2>
          </div>

          <p className="rounded-md bg-teal-50 px-3 py-1 font-bold text-teal-700">
            ${tutor.hourlyFee}/h
          </p>
        </div>

        <div className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
          <p className="flex items-center gap-2">
            <FiCalendar /> {tutor.availableDays} · {tutor.availableTime}
          </p>

          <p className="flex items-center gap-2">
            <FiMapPin /> {tutor.location}
          </p>

          <p className="flex items-center gap-2">
            <FiMonitor /> {tutor.teachingMode}
          </p>

          <p className="flex items-center gap-2">
            <FiUsers /> {tutor.totalSlot} slots left
          </p>
        </div>

        <Link
          href={`/tutors/${tutor._id}`}
          className="mt-auto inline-flex justify-center rounded-md bg-teal-600 px-4 py-3 font-semibold text-white hover:bg-teal-700"
        >
          Book Session
        </Link>
      </div>
    </article>
  );
};

export default TutorCard;
