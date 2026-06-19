"use client";

import { apiFetch } from "@/actions/api";
import { redirectToDashboard, setAuthCookie } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { PasswordInput } from "./PasswordInput";

const loginSchema = z.object({
  email: z.string().email("Endereço de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface AuthResponse {
  access_token: string;
  user: { id: string; email: string; name?: string };
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (formData: LoginFormValues) => {
    try {
      const { data, error } = await apiFetch<AuthResponse>({
        url: "/auth/login",
        method: "POST",
        data: formData,
      });

      if (error) {
        toast.error(error);
        return;
      }

      if (data) {
        setAuthCookie(data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login realizado com sucesso!");
        redirectToDashboard();
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao fazer login.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      aria-label="Formulário de Login"
    >
      <div>
        <label
          htmlFor="login-email"
          className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
        >
          Endereço de E-mail
        </label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-3 w-5 h-5 text-zinc-500"
            aria-hidden="true"
          />
          <input
            id="login-email"
            type="email"
            placeholder="exemplo@email.com"
            {...register("email")}
            className={`w-full bg-zinc-950 border ${
              errors.email
                ? "border-rose-500 focus-visible:ring-rose-500"
                : "border-zinc-800 focus-visible:ring-indigo-500"
            } rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 transition-all duration-200`}
            disabled={isSubmitting}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-rose-500 mt-1.5" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <PasswordInput
        id="login-password"
        label="Senha de Acesso"
        registration={register("password")}
        error={errors.password}
        disabled={isSubmitting}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        {isSubmitting ? (
          <div
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
            role="status"
            aria-label="Processando..."
          />
        ) : (
          <>
            Entrar no Painel
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </>
        )}
      </button>
    </form>
  );
}
