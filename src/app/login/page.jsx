"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      toast.success("Welcome back");
      router.push(callbackURL);
    }

    if (error) {
      toast.error(error.message || "Invalid email or password");
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });
  };

  return (
    <section className="mx-auto grid max-w-md px-4 py-12">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-bold">Login</h1>

        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Continue booking organized learning sessions.
        </p>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="input"
          />

          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="input"
          />

          <button className="rounded-md bg-teal-600 px-5 py-3 font-bold text-white hover:bg-teal-700">
            Login
          </button>
        </form>

        <p className="mt-3 text-sm text-slate-500">Forget Password</p>

        <button
          onClick={handleGoogleSignin}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 px-5 py-3 font-bold dark:border-slate-700"
        >
          <FcGoogle />
          Continue with Google
        </button>

        <p className="mt-5 text-center text-sm">
          New here?{" "}
          <Link href="/signup" className="font-bold text-teal-600">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
