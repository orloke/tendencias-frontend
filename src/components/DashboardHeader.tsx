"use client";

import { GithubIcon } from "@/components/icons";
import { LogoutButton } from "@/components/LogoutButton";
import { ThemeToggle } from "@/components/ThemeToggle";

export function DashboardHeader() {
  return (
    <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="p-2 bg-indigo-600/10 border border-indigo-500/20 rounded-xl"
            aria-hidden="true"
          >
            <GithubIcon className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="font-bold tracking-tight text-zinc-100">
            GitHub Dev Analytics
          </span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
