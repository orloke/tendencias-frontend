"use client";

interface AuthTabButtonProps {
  selected: boolean;
  onClick: () => void;
  label: string;
}

export function AuthTabButton({ selected, onClick, label }: AuthTabButtonProps) {
  return (
    <button
      role="tab"
      aria-selected={selected}
      aria-controls="auth-form-panel"
      onClick={onClick}
      className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer ${
        selected
          ? "bg-zinc-800 text-zinc-100 shadow-md"
          : "text-zinc-400 hover:text-zinc-200"
      }`}
    >
      {label}
    </button>
  );
}
