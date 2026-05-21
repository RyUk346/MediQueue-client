"use client";

const ErrorPage = ({ error, reset }) => {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold">Something went wrong</h1>

        <p className="mt-3 text-slate-600 dark:text-slate-300">
          {error?.message || "Please try again."}
        </p>

        <button
          onClick={reset}
          className="mt-6 rounded-md bg-teal-600 px-5 py-3 font-bold text-white"
        >
          Try Again
        </button>
      </div>
    </section>
  );
};

export default ErrorPage;
