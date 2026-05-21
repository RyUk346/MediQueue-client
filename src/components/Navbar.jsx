"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiChevronDown,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
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
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navLinkClass = (href) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition ${
      isActive(href)
        ? "bg-teal-600 text-white shadow-sm"
        : "text-slate-700 hover:bg-teal-50 hover:text-teal-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-teal-300"
    }`;

  const profileLoading = (
    <div className="flex items-center gap-2">
      <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="hidden h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700 sm:block" />
    </div>
  );

  const authArea = isPending ? (
    profileLoading
  ) : user ? (
    <div className="relative">
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="flex items-center gap-2 rounded-full border border-slate-200 p-1 pr-3 dark:border-slate-700"
      >
        <Avatar>
          <Avatar.Image
            src={user.image || "https://i.ibb.co.com/0jHc7nX/user.png"}
            alt={user.name || "User"}
            referrerPolicy="no-referrer"
            className="h-8 w-8 rounded-full"
          />
          <Avatar.Fallback>{user.name?.charAt(0) || "U"}</Avatar.Fallback>
        </Avatar>
        <FiChevronDown />
      </button>

      {profileOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <p className="font-semibold">{user.name}</p>
          <p className="mb-3 break-all text-xs text-slate-500">{user.email}</p>

          <Link
            href="/profile"
            onClick={() => setProfileOpen(false)}
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
      )}
    </div>
  ) : (
    <div className="hidden items-center gap-2 sm:flex">
      <Link href="/login" className={navLinkClass("/login")}>
        Login
      </Link>

      <Link
        href="/signup"
        className="rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
      >
        Register
      </Link>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <nav className="mx-auto max-w-7xl px-4">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 md:hidden dark:border-slate-700"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-teal-600"
            >
              <FiBookOpen />
              MediQueue
            </Link>
          </div>

          <div className="hidden items-center gap-2 md:flex">
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

          <div className="flex items-center gap-3 mouse-pointer">
            <Button
              isIconOnly
              variant="bordered"
              radius="full"
              onPress={handleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </Button>

            {authArea}
          </div>
        </div>

        {menuOpen && (
          <div className="grid gap-2 border-t border-slate-200 py-4 md:hidden dark:border-slate-800 mouse-pointer">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={navLinkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}

            {isPending ? (
              <div className="flex items-center gap-2 px-3 py-3">
                <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            ) : !user ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClass("/login")}
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  Register
                </Link>
              </>
            ) : null}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
