"use client";

import { useState } from "react";
import { RepoFilters } from "./RepoFilters";
import { RepoGrid } from "./RepoGrid";
import { RepoData } from "@/types/github";

interface RepoListProps {
  repos: RepoData[];
}

export function RepoList({ repos }: RepoListProps) {
  const [repoSearch, setRepoSearch] = useState("");
  const [repoSort, setRepoSort] = useState<"stars" | "forks" | "name">("stars");

  const filteredRepos = repos
    .filter((repo) =>
      repo.name.toLowerCase().includes(repoSearch.toLowerCase()),
    )
    .sort((a, b) => {
      if (repoSort === "stars") return b.stargazers_count - a.stargazers_count;
      if (repoSort === "forks") return b.forks_count - a.forks_count;
      return a.name.localeCompare(b.name);
    });

  return (
    <section
      aria-labelledby="repos-heading"
      className="bg-zinc-900/30 border border-zinc-900 rounded-3xl p-6 backdrop-blur-md space-y-6 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h4 id="repos-heading" className="font-bold text-zinc-100 text-base">
          Portfólio & Repositórios
        </h4>

        <RepoFilters
          repoSearch={repoSearch}
          setRepoSearch={setRepoSearch}
          repoSort={repoSort}
          setRepoSort={setRepoSort}
        />
      </div>

      {filteredRepos.length > 0 ? (
        <RepoGrid repos={filteredRepos} />
      ) : (
        <div className="text-center py-12 bg-zinc-950/20 border border-zinc-900 rounded-2xl">
          <p className="text-sm text-zinc-500">
            Nenhum repositório corresponde aos critérios de busca.
          </p>
        </div>
      )}
    </section>
  );
}
