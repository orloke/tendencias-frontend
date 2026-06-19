import { Star, GitFork } from 'lucide-react';

interface StatsHighlightsProps {
  totalStars: number;
  totalForks: number;
}

export function StatsHighlights({ totalStars, totalForks }: StatsHighlightsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="region" aria-label="Resumo estatístico">
      <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 backdrop-blur-md flex items-center gap-4">
        <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20" aria-hidden="true">
          <Star className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <div className="text-2xl font-black text-zinc-100">{totalStars}</div>
          <div className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Estrelas Totais</div>
        </div>
      </div>

      <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 backdrop-blur-md flex items-center gap-4">
        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20" aria-hidden="true">
          <GitFork className="w-5 h-5 text-emerald-500" />
        </div>
        <div>
          <div className="text-2xl font-black text-zinc-100">{totalForks}</div>
          <div className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Forks Totais</div>
        </div>
      </div>
    </div>
  );
}
