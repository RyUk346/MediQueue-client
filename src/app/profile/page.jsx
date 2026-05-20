import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile",
};

export const dynamic = "force-dynamic";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <Image
          src={user.image || "https://i.ibb.co.com/0jHc7nX/user.png"}
          alt={user.name || "User"}
          width={112}
          height={112}
          className="mx-auto h-28 w-28 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />

        <h1 className="mt-4 text-3xl font-bold">{user.name}</h1>

        <p className="text-slate-600 dark:text-slate-300">{user.email}</p>
      </div>
    </section>
  );
};

export default ProfilePage;
