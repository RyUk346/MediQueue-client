"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
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
      window.location.href = callbackURL;
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

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                className="input pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-teal-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <button className="rounded-md bg-teal-600 px-5 py-3 font-bold text-white hover:bg-teal-700">
            Login
          </button>
        </form>

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
