"use client";

import { useState } from "react";
import { AuthTabButton } from "@/components/auth/AuthTabButton";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { GithubIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div
        className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center p-3 bg-zinc-900 border border-zinc-800 rounded-2xl mb-4 shadow-xl"
            aria-hidden="true"
          >
            <GithubIcon className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            GitHub Dev Analytics
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Análise profissional de perfis e linguagens do GitHub
          </p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl relative glow-indigo">
          <div
            className="flex border-b border-zinc-800 mb-6 p-1 bg-zinc-950/50 rounded-xl"
            role="tablist"
            aria-label="Opções de Acesso"
          >
            <AuthTabButton
              selected={isLogin}
              onClick={() => setIsLogin(true)}
              label="Login"
            />
            <AuthTabButton
              selected={!isLogin}
              onClick={() => setIsLogin(false)}
              label="Cadastro"
            />
          </div>

          <div
            id="auth-form-panel"
            role="tabpanel"
            aria-label={isLogin ? "Painel de Login" : "Painel de Cadastro"}
          >
            {isLogin ? <LoginForm /> : <SignupForm />}
          </div>
        </div>

        <p className="text-center text-xs text-zinc-500 mt-6">
          Desenvolvido para fins de avaliação técnica - Tendências Consultoria
        </p>
      </div>
    </main>
  );
}
