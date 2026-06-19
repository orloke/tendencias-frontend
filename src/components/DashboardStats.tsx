import { apiFetch } from "@/actions/api";
import { LanguageChart } from "@/components/LanguageChart";
import { ProfileCard } from "@/components/ProfileCard";
import { RepoList } from "@/components/RepoList";
import { SearchError } from "@/components/SearchError";
import { StatsHighlights } from "@/components/StatsHighlights";
import { GithubStats } from "@/types/github";

interface DashboardStatsProps {
  username: string;
}

export async function DashboardStats({ username }: DashboardStatsProps) {
  const { data: statsData, error: fetchError } = await apiFetch<GithubStats>({
    url: `/github/stats/${encodeURIComponent(username.trim())}`,
    next: { revalidate: 600 },
  });

  if (fetchError) {
    return <SearchError username={username} fetchError={fetchError} />;
  }

  if (!statsData) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="space-y-6 lg:col-span-1">
        <ProfileCard profile={statsData.profile} />
        <StatsHighlights
          totalStars={statsData.stats.totalStars}
          totalForks={statsData.stats.totalForks}
        />
      </div>
      <div className="lg:col-span-2 space-y-6">
        <LanguageChart languages={statsData.stats.languages} />
        <RepoList repos={statsData.repos} />
      </div>
    </div>
  );
}
