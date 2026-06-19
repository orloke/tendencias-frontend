"use client";

import { ExternalLink, GitFork, Star } from "lucide-react";
import { RepoData } from "@/types/github";

interface RepoGridProps {
  repos: RepoData[];
}

export function RepoGrid({ repos }: RepoGridProps) {
  return (
    <div className="max-h-62 overflow-y-auto">
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        role="feed"
        aria-busy="false"
        aria-label="Grade de repositórios"
      >
        {repos.map((repo) => (
          <article
            key={repo.id}
            className="bg-zinc-950/50 hover:bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 focus-within:border-zinc-700 focus-within:bg-zinc-950/80"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Acessar repositório ${repo.name} no GitHub (abre em nova aba)`}
                  className="font-bold text-zinc-100 hover:text-indigo-400 text-sm flex items-center gap-1 transition-colors break-all focus:outline-none focus-visible:underline focus-visible:text-indigo-400"
                >
                  {repo.name}
                  <ExternalLink
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                </a>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full shrink-0 font-semibold">
                  {repo.language}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed line-clamp-2">
                {repo.description || "Nenhuma descrição fornecida."}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-5 pt-3 border-t border-zinc-900/60 text-zinc-500">
              <div
                className="flex items-center gap-1 text-xs"
                title={`${repo.stargazers_count} estrelas`}
              >
                <Star
                  className="w-3.5 h-3.5 text-amber-500/80 fill-amber-500/10"
                  aria-hidden="true"
                />
                <span className="sr-only">Estrelas:</span>
                <span>{repo.stargazers_count}</span>
              </div>
              <div
                className="flex items-center gap-1 text-xs"
                title={`${repo.forks_count} forks`}
              >
                <GitFork
                  className="w-3.5 h-3.5 text-emerald-500/80"
                  aria-hidden="true"
                />
                <span className="sr-only">Forks:</span>
                <span>{repo.forks_count}</span>
              </div>
              <span className="text-[10px] text-zinc-600 ml-auto">
                Atualizado em{" "}
                {new Date(repo.updated_at).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
