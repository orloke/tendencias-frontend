import { MapPin, Building, BookOpen, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { ProfileData } from '@/types/github';

interface ProfileCardProps {
  profile: ProfileData;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <section 
      aria-label="Perfil do Desenvolvedor" 
      className="bg-zinc-900/30 border border-zinc-900 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full blur-xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-300" />
      
      <div className="flex flex-col items-center text-center">
        <Image
          src={profile.avatar_url}
          alt={`Foto de perfil de ${profile.name}`}
          width={96}
          height={96}
          className="rounded-2xl border border-zinc-800 shadow-xl mb-4 group-hover:scale-[1.03] transition-all duration-300"
          priority
        />
        
        <h3 className="text-xl font-bold text-zinc-100 tracking-tight">{profile.name}</h3>
        
        <a
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver perfil de @${profile.login} no GitHub (abre em nova aba)`}
          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mt-1.5 group/link focus:outline-none focus-visible:underline focus-visible:text-indigo-300"
        >
          @{profile.login}
          <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" aria-hidden="true" />
        </a>

        {profile.bio && (
          <p className="text-sm text-zinc-400 mt-4 leading-relaxed line-clamp-4">
            {profile.bio}
          </p>
        )}
      </div>

      <hr className="border-zinc-900 my-6" aria-hidden="true" />

      <div className="space-y-4" role="list">
        {profile.location && (
          <div className="flex items-center gap-3 text-sm text-zinc-400" role="listitem">
            <MapPin className="w-4 h-4 text-zinc-600 shrink-0" aria-hidden="true" />
            <span className="sr-only">Localização:</span>
            <span>{profile.location}</span>
          </div>
        )}
        {profile.company && (
          <div className="flex items-center gap-3 text-sm text-zinc-400" role="listitem">
            <Building className="w-4 h-4 text-zinc-600 shrink-0" aria-hidden="true" />
            <span className="sr-only">Empresa:</span>
            <span>{profile.company}</span>
          </div>
        )}
        <div className="flex items-center gap-3 text-sm text-zinc-400" role="listitem">
          <BookOpen className="w-4 h-4 text-zinc-600 shrink-0" aria-hidden="true" />
          <span className="sr-only">Repositórios públicos:</span>
          <span>{profile.public_repos} Repositórios Públicos</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-zinc-900 text-center">
        <div className="bg-zinc-950/40 p-3 rounded-xl border border-zinc-900/50">
          <div className="text-lg font-bold text-zinc-100">{profile.followers}</div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Seguidores</div>
        </div>
        <div className="bg-zinc-950/40 p-3 rounded-xl border border-zinc-900/50">
          <div className="text-lg font-bold text-zinc-100">{profile.following}</div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Seguindo</div>
        </div>
      </div>
    </section>
  );
}
