"use client";

interface RepoFiltersProps {
  repoSearch: string;
  setRepoSearch: (value: string) => void;
  repoSort: "stars" | "forks" | "name";
  setRepoSort: (value: "stars" | "forks" | "name") => void;
}

export function RepoFilters({
  repoSearch,
  setRepoSearch,
  repoSort,
  setRepoSort,
}: RepoFiltersProps) {
  return (
    <div
      className="flex flex-wrap w-full sm:w-auto gap-2.5"
      role="search"
      aria-label="Filtros de repositórios"
    >
      <div className="flex flex-col w-full sm:w-auto">
        <label htmlFor="repo-filter-input" className="sr-only">
          Filtrar repositórios por nome
        </label>
        <input
          id="repo-filter-input"
          type="text"
          placeholder="Filtrar por nome..."
          value={repoSearch}
          onChange={(e) => setRepoSearch(e.target.value)}
          className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 transition-all duration-200"
        />
      </div>

      <div className="flex flex-col w-full sm:w-auto">
        <label htmlFor="repo-sort-select" className="sr-only">
          Ordenar repositórios por
        </label>
        <select
          id="repo-sort-select"
          value={repoSort}
          onChange={(e) =>
            setRepoSort(e.target.value as "stars" | "forks" | "name")
          }
          className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 transition-all duration-200"
        >
          <option value="stars">Mais Estrelados</option>
          <option value="forks">Mais Forks</option>
          <option value="name">Ordem Alfabética</option>
        </select>
      </div>
    </div>
  );
}
