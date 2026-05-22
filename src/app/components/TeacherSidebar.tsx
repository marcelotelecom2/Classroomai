import { ArrowLeftRight, LayoutDashboard, Users } from 'lucide-react';
import { NavLink } from 'react-router';
import { cn } from './ui/utils';

const teacherMenuGroups = [
  {
    title: 'Consolidado',
    items: [{ icon: LayoutDashboard, label: 'Visao da Turma', to: '/professor' }],
  },
  {
    title: 'Gestao',
    items: [{ icon: Users, label: 'Lista de Alunos', to: '/professor/alunos' }],
  },
];

export function TeacherSidebar() {
  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="border-b border-sidebar-border px-6 py-6">
        <span className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
          Professor
        </span>
        <p className="text-xl font-semibold text-primary">ClassRoom AI</p>
        <p className="mt-1 text-sm text-muted-foreground">Gestao da turma com leitura rapida e acionavel.</p>
      </div>

      <nav aria-label="Navegacao do professor" className="flex-1 overflow-y-auto px-4 py-5">
        {teacherMenuGroups.map((group) => (
          <div key={group.title} className="mb-5 last:mb-0">
            <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end={item.to === '/professor'}
                    aria-label={item.label}
                    className={({ isActive }) =>
                      cn(
                        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent'
                      )
                    }
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 pb-4">
        <div className="rounded-xl border border-sidebar-border bg-background/60 p-4">
          <p className="text-sm font-medium">Voltar para a experiencia do aluno</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Use a area do aluno para validar como as informacoes aparecem para a turma.
          </p>
          <NavLink
            to="/"
            aria-label="Area do Aluno"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-sidebar-border px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
          >
            <ArrowLeftRight size={16} />
            Area do Aluno
          </NavLink>
        </div>
      </div>

      <div className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3 rounded-xl bg-background/70 p-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
            PR
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-medium">Prof. Ricardo</p>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                turma ativa
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">Turma IA 2025</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
