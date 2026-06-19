"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUsername = searchParams.get("username") || "";
  const [usernameInput, setUsernameInput] = useState(currentUsername);
  const [isPending, startTransition] = useTransition();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    startTransition(() => {
      router.push(
        `/dashboard?username=${encodeURIComponent(usernameInput.trim())}`,
      );
    });
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex w-full md:max-w-md gap-2"
      role="search"
      aria-label="Buscar desenvolvedor do GitHub"
    >
      <div className="relative flex-1">
        <label htmlFor="github-username-input" className="sr-only">
          Nome do usuário do GitHub
        </label>
        <Search
          className="absolute left-3 top-3 w-4 h-4 text-zinc-500"
          aria-hidden="true"
        />
        <input
          id="github-username-input"
          type="text"
          placeholder="Nome do usuário (ex: gaearon)"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 transition-all duration-200"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-5 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        {isPending ? (
          <div
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            role="status"
            aria-label="Buscando..."
          />
        ) : (
          "Analisar"
        )}
      </button>
    </form>
  );
}
