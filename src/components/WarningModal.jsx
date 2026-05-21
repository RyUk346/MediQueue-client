"use client";

const WarningModal = ({
  open,
  title,
  message,
  confirmText,
  onClose,
  onConfirm,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-rose-600">{title}</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-4 py-2 font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-rose-600 px-4 py-2 font-bold text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
