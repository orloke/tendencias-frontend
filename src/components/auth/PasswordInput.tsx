"use client";

import { useState } from "react";
import { KeyRound, Eye, EyeOff } from "lucide-react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface PasswordInputProps {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  disabled?: boolean;
}

export function PasswordInput({ id, label, registration, error, disabled }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <KeyRound
          className="absolute left-3 top-3 w-5 h-5 text-zinc-500"
          aria-hidden="true"
        />
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          {...registration}
          className={`w-full bg-zinc-950 border ${
            error
              ? "border-rose-500 focus-visible:ring-rose-500"
              : "border-zinc-800 focus-visible:ring-indigo-500"
          } rounded-xl py-2.5 pl-10 pr-12 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 transition-all duration-200`}
          disabled={disabled}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
          aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
          className="absolute right-3 top-2 p-1 text-zinc-500 hover:text-zinc-300 rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Eye className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>
      {error && (
        <p className="text-xs text-rose-500 mt-1.5" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
