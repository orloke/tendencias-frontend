import { DashboardHeader } from "@/components/DashboardHeader";
import { SearchForm } from "@/components/SearchForm";
import { DashboardStats } from "@/components/DashboardStats";
import { WelcomeSearch } from "@/components/WelcomeSearch";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import { Suspense } from "react";

export default async function DashboardPage(props: {
  searchParams: Promise<{ username?: string }>;
}) {
  const searchParams = await props.searchParams;
  const username = searchParams.username || "";

  return (
    <div className="flex flex-col h-screen text-zinc-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2.5 focus:rounded-xl focus:z-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Pular para o conteúdo principal
      </a>

      <DashboardHeader />

      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8 relative overflow-y-auto"
      >
        <div
          className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />

        <section
          aria-labelledby="search-heading"
          className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl backdrop-blur-md"
        >
          <div>
            <h2
              id="search-heading"
              className="text-xl font-bold text-zinc-100 mb-1"
            >
              Analisador de Desenvolvedor
            </h2>
            <p className="text-xs text-zinc-500">
              Busque um desenvolvedor para ver estatísticas, gráficos e
              portfólio
            </p>
          </div>
          <SearchForm />
        </section>

        {username ? (
          <Suspense key={username} fallback={<DashboardSkeleton />}>
            <DashboardStats username={username} />
          </Suspense>
        ) : (
          <WelcomeSearch />
        )}
      </main>
    </div>
  );
}
