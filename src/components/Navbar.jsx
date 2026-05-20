"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiChevronDown,
  FiLogOut,
  FiMoon,
  FiSun,
} from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tutors", label: "Tutors" },
  { href: "/add-tutor", label: "Add Tutor" },
  { href: "/my-tutors", label: "My Tutors" },
  { href: "/my-booked-sessions", label: "My Booked Sessions" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const handleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const navLinkClass = (href) => {
    return `rounded-md px-3 py-2 transition ${
      isActive(href)
        ? "bg-teal-600 text-white shadow-sm"
        : "text-slate-700 hover:bg-teal-50 hover:text-teal-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-teal-300"
    }`;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-teal-600"
        >
          <FiBookOpen />
          MediQueue
        </Link>

        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={navLinkClass(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTheme}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 transition hover:border-teal-500 hover:text-teal-600 dark:border-slate-700"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          {user ? (
            <div className="group relative">
              <button className="flex items-center gap-2 rounded-full border border-slate-200 p-1 pr-3 dark:border-slate-700">
                <Image
                  src={user.image || "https://i.ibb.co.com/0jHc7nX/user.png"}
                  alt={user.name || "User"}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <FiChevronDown />
              </button>

              <div className="invisible absolute right-0 mt-2 w-52 rounded-lg border border-slate-200 bg-white p-3 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 dark:border-slate-700 dark:bg-slate-900">
                <p className="font-semibold">{user.name}</p>
                <p className="mb-3 break-all text-xs text-slate-500">
                  {user.email}
                </p>

                <Link
                  href="/profile"
                  className="block rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className={`rounded-md px-4 py-2 font-semibold transition ${
                  isActive("/login")
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                    : "hover:text-teal-600"
                }`}
              >
                Login
              </Link>

              <Link
                href="/signup"
                className={`rounded-md px-4 py-2 font-semibold transition ${
                  isActive("/signup")
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                    : "bg-teal-600 text-white hover:bg-teal-700"
                }`}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
