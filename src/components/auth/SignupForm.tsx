"use client";

import { Mail, User as UserIcon, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { apiFetch } from "@/actions/api";
import { setAuthCookie, redirectToDashboard } from "@/utils/auth";
import { PasswordInput } from "./PasswordInput";

const signupSchema = z.object({
  name: z
    .string()
    .min(1, "O nome completo é obrigatório")
    .min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Endereço de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface AuthResponse {
  access_token: string;
  user: { id: string; email: string; name?: string };
}

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (formData: SignupFormValues) => {
    try {
      const data = await apiFetch<AuthResponse>({
        url: "/auth/register",
        method: "POST",
        data: formData,
      });

      setAuthCookie(data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Cadastro realizado com sucesso!");
      redirectToDashboard();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ocorreu um erro ao cadastrar.";
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      aria-label="Formulário de Cadastro"
    >
      <div>
        <label
          htmlFor="signup-name"
          className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2"
        >
          Nome Completo
        </label>
        <div className="relative">
          <UserIcon
            className="absolute left-3 top-3 w-5 h-5 text-zinc-500"
            aria-hidden="true"
          />
          <input
            id="signup-name"
            type="text"
            placeholder="Seu nome"
            {...register("name")}
            className={`w-full bg-zinc-950 border ${
              errors.name
                ? "border-rose-500 focus-visible:ring-rose-500"
                : "border-zinc-800 focus-visible:ring-indigo-500"
            } rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 transition-all duration-200`}
            disabled={isSubmitting}
          />
        </div>
        {errors.name && (
          <p className="text-xs text-rose-500 mt-1.5" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="signup-email"
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
            id="signup-email"
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
        id="signup-password"
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
            Criar Minha Conta
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
