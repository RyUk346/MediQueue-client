import AddTutorForm from "@/components/AddTutorForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Tutor",
};

export const dynamic = "force-dynamic";

const AddTutorPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Add Tutor</h1>

      <p className="mb-6 mt-2 text-slate-600 dark:text-slate-300">
        Create a tutor profile with schedule, subject, and session availability.
      </p>

      <AddTutorForm user={session.user} token={token} />
    </section>
  );
};

export default AddTutorPage;
