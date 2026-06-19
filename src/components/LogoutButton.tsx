'use client';

import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export function LogoutButton() {
  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure';
    localStorage.removeItem('user');
    toast.success('Sessão encerrada com sucesso.');
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleLogout}
      aria-label="Encerrar sessão e sair da conta"
      className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-rose-400 border border-zinc-800 hover:border-rose-950/50 bg-zinc-950 py-2 px-3.5 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
      <span className="hidden sm:inline">Sair</span>
    </button>
  );
}
