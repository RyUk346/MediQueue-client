import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold text-teal-600">MediQueue</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Digital tutor booking with organized slots and smoother learning
            schedules.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Learning Services</h3>
          <div className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Link href="/tutors">Browse Tutors</Link>
            <Link href="/add-tutor">Become a Tutor</Link>
            <Link href="/my-booked-sessions">Booked Sessions</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Contact</h3>
          <div className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            <p>support@mediqueue.edu</p>
            <p>Dhaka Learning Hub</p>
            <p>+880 1700 000 111</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Social</h3>
          <div className="mt-3 flex gap-3">
            <a
              className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 dark:bg-slate-800"
              href="#"
            >
              <FaFacebookF />
            </a>
            <a
              className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 dark:bg-slate-800"
              href="#"
            >
              <FaXTwitter />
            </a>
            <a
              className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 dark:bg-slate-800"
              href="#"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <p className="border-t border-slate-200 py-4 text-center text-sm text-slate-500 dark:border-slate-800">
        Copyright 2026 MediQueue. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
