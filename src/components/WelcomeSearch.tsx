import { Search, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export function WelcomeSearch() {
  return (
    <section
      aria-label="Introdução à busca"
      className="flex flex-col items-center justify-center text-center p-12 bg-zinc-900/10 border border-zinc-900/50 rounded-3xl backdrop-blur-md max-w-2xl mx-auto space-y-6 py-16"
    >
      <div className="inline-flex items-center justify-center p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl text-indigo-400">
        <Search className="w-8 h-8" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-zinc-100 tracking-tight">
          Pronto para começar?
        </h3>
        <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
          Digite o nome de usuário do GitHub de qualquer desenvolvedor no campo de busca acima para carregar suas estatísticas, linguagens mais utilizadas e portfólio.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md pt-4 text-left">
        <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-900/60 flex items-start gap-3">
          <Terminal className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-zinc-100">Estatísticas Reais</h4>
            <p className="text-[11px] text-zinc-500 mt-1">Total de estrelas, forks e commits mais relevantes.</p>
          </div>
        </div>
        <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-900/60 flex items-start gap-3">
          <GithubIcon className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-zinc-100">Gráficos de Linguagens</h4>
            <p className="text-[11px] text-zinc-500 mt-1">Análise da distribuição percentual de linguagens de código.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
