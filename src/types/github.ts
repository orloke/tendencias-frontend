export interface ProfileData {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  company: string;
  location: string;
}

export interface LanguageStat {
  name: string;
  value: number;
}

export interface RepoData {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

export interface GithubStats {
  profile: ProfileData;
  stats: {
    totalStars: number;
    totalForks: number;
    languages: LanguageStat[];
  };
  repos: RepoData[];
}
