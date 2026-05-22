import { useState } from 'react';
import { Bell, MoonStar, UserRound } from 'lucide-react';
import { studentProfile } from '../data/learningData';
import { appDataService } from '../services/appDataService';
import type { AppPreferencesContract } from '../types/contracts';

export function SettingsPage() {
  const [preferences, setPreferences] = useState<AppPreferencesContract>(() => appDataService.getPreferences());

  function updatePreference<K extends keyof AppPreferencesContract>(key: K, value: AppPreferencesContract[K]) {
    const nextPreferences = appDataService.savePreferences({ ...preferences, [key]: value });
    setPreferences(nextPreferences);
  }

  return (
    <div className="mx-auto max-w-[1440px] px-8 py-7">
      <header className="mb-7 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">Configuracoes</h1>
          <p className="text-sm text-muted-foreground">
            Ajuste notificacoes, preferencia visual e informacoes basicas do seu ambiente de estudo.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2">
              <UserRound size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Perfil ativo</p>
              <p className="text-xs text-muted-foreground">suas preferencias locais</p>
            </div>
          </div>
          <p className="text-sm font-medium">{studentProfile.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">Level {studentProfile.level} • {studentProfile.xp.toLocaleString('pt-BR')} XP</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="space-y-6">
          <article className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2">
                <Bell size={18} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Notificacoes</h2>
                <p className="mt-1 text-sm text-muted-foreground">Escolha o que deve chamar sua atencao no dia a dia.</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
                <div>
                  <p className="text-sm font-medium">Notificacoes por e-mail</p>
                  <p className="mt-1 text-xs text-muted-foreground">Receber avisos de aula e comunicados gerais.</p>
                </div>
                <input
                  aria-label="Notificacoes por e-mail"
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={(event) => updatePreference('emailNotifications', event.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
              </label>

              <label className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
                <div>
                  <p className="text-sm font-medium">Lembretes de tarefas</p>
                  <p className="mt-1 text-xs text-muted-foreground">Avisar quando houver entrega proxima ou atrasada.</p>
                </div>
                <input
                  aria-label="Lembretes de tarefas"
                  type="checkbox"
                  checked={preferences.taskReminders}
                  onChange={(event) => updatePreference('taskReminders', event.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
              </label>

              <label className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
                <div>
                  <p className="text-sm font-medium">Resumo semanal</p>
                  <p className="mt-1 text-xs text-muted-foreground">Receber panorama de progresso e comparacao com a turma.</p>
                </div>
                <input
                  aria-label="Resumo semanal"
                  type="checkbox"
                  checked={preferences.weeklySummary}
                  onChange={(event) => updatePreference('weeklySummary', event.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
              </label>
            </div>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2">
                <MoonStar size={18} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Preferencias de interface</h2>
                <p className="mt-1 text-sm text-muted-foreground">Ajustes simples para o modo de leitura da plataforma.</p>
              </div>
            </div>

            <label className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
              <div>
                <p className="text-sm font-medium">Modo compacto</p>
                <p className="mt-1 text-xs text-muted-foreground">Deixa a interface mais densa para leitura rapida.</p>
              </div>
              <input
                aria-label="Modo compacto"
                type="checkbox"
                checked={preferences.compactMode}
                onChange={(event) => updatePreference('compactMode', event.target.checked)}
                className="h-4 w-4 accent-primary"
              />
            </label>
          </article>
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <h2 className="text-base font-semibold">Resumo das preferencias</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Notificacoes por e-mail: {preferences.emailNotifications ? 'ativas' : 'desativadas'}.
              {' '}Lembretes de tarefas: {preferences.taskReminders ? 'ativos' : 'desativados'}.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold">Proximo passo natural</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Depois podemos incluir preferencia de acessibilidade, horario de foco e integracao com calendario.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
