import Link from "next/link";

const NotFound = () => {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 text-center">
      <div>
        <p className="text-7xl font-bold text-teal-600">404</p>

        <h1 className="mt-4 text-3xl font-bold">Page not found</h1>

        <p className="mt-3 text-slate-600 dark:text-slate-300">
          The class route you are looking for is not available.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-teal-600 px-5 py-3 font-bold text-white"
        >
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
