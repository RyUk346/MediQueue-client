import BookingForm from "@/components/BookingForm";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FiCalendar, FiMapPin, FiMonitor, FiUsers } from "react-icons/fi";

export const metadata = {
  title: "Tutor Details",
};

export const dynamic = "force-dynamic";

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const serverUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const res = await fetch(`${serverUrl}/tutors/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const tutor = await res.json();

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px]">
      <div>
        <div className="relative h-96 w-full overflow-hidden rounded-lg">
          <Image
            src={tutor.photo}
            alt={tutor.tutorName}
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover"
          />
        </div>

        <div className="mt-6">
          <p className="font-semibold text-teal-600">{tutor.subject}</p>

          <h1 className="text-4xl font-bold">{tutor.tutorName}</h1>

          <div className="mt-5 grid gap-3 text-slate-600 dark:text-slate-300 md:grid-cols-2">
            <p className="flex items-center gap-2">
              <FiCalendar /> {tutor.availableDays}, {tutor.availableTime}
            </p>

            <p className="flex items-center gap-2">
              <FiUsers /> {tutor.totalSlot} slots available
            </p>

            <p className="flex items-center gap-2">
              <FiMapPin /> {tutor.location}
            </p>

            <p className="flex items-center gap-2">
              <FiMonitor /> {tutor.teachingMode}
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-bold">Tutor Profile</h2>

            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {tutor.bio}
            </p>

            <p className="mt-4">
              <b>Institution:</b> {tutor.institution}
            </p>

            <p>
              <b>Experience:</b> {tutor.experience}
            </p>

            <p>
              <b>Session starts:</b> {tutor.sessionStartDate}
            </p>

            <p className="mt-3 text-2xl font-bold text-teal-600">
              ${tutor.hourlyFee}/hour
            </p>
          </div>
        </div>
      </div>

      <BookingForm tutor={tutor} user={session.user} token={token} />
    </section>
  );
};

export default TutorDetailsPage;
