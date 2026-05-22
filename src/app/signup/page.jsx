"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password length must be at least 6 characters";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must have an uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must have a lowercase letter";
    }

    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const passwordError = validatePassword(user.password);

    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    if (data) {
      toast.success("Registration successful. Please login.");
      router.push("/login");
    }

    if (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <section className="mx-auto grid max-w-md px-4 py-12">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-bold">Create Account</h1>

        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Register to book tutor sessions and manage your classes.
        </p>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <input name="name" required placeholder="Name" className="input" />

          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="input"
          />

          <input
            name="image"
            type="url"
            placeholder="Photo URL"
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
                placeholder="Create a strong password"
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

          <p className="text-xs text-slate-500">
            Use at least 6 characters with uppercase and lowercase letters.
          </p>

          <button className="rounded-md bg-teal-600 px-5 py-3 font-bold text-white hover:bg-teal-700">
            Register
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
          Already registered?{" "}
          <Link href="/login" className="font-bold text-teal-600">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;
