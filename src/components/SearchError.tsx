"use client";

import { ShieldAlert } from "lucide-react";

interface SearchErrorProps {
  username: string;
  fetchError: string;
}

export function SearchError({ username, fetchError }: SearchErrorProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex flex-col items-center justify-center text-center p-12 bg-zinc-900/10 border border-red-950/30 rounded-3xl backdrop-blur-md max-w-2xl mx-auto space-y-4"
    >
      <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-400">
        <ShieldAlert className="w-10 h-10" />
      </div>
      <h3 className="text-lg font-bold text-zinc-100">
        Falha na busca pelo desenvolvedor
      </h3>
      <p className="text-sm text-zinc-400 max-w-md">
        Não conseguimos recuperar os dados para o usuário{" "}
        <strong className="text-zinc-100">&quot;{username}&quot;</strong>.
        Verifique se o nome do usuário está digitado corretamente no GitHub.
      </p>
      <div className="text-xs text-red-500 bg-red-950/20 border border-red-900/30 py-1.5 px-3 rounded-lg font-mono">
        Detalhes: {fetchError}
      </div>
    </div>
  );
}
