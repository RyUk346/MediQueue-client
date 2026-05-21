import MyTutorsTable from "@/components/MyTutorsTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Tutors",
};

export const dynamic = "force-dynamic";

const MyTutorsPage = async () => {
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

  const res = await fetch(`${serverUrl}/my-tutors/${session.user.email}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const tutors = await res.json();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">My Tutors</h1>

      <p className="mb-6 mt-2 text-slate-600 dark:text-slate-300">
        Update or remove tutor profiles you created.
      </p>

      <MyTutorsTable tutors={tutors} token={token} />
    </section>
  );
};

export default MyTutorsPage;
