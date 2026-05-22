import { useState } from 'react';
import { HeartPulse, Sparkles } from 'lucide-react';
import { emotionEmoji, emotionLabels, type EmotionState } from '../data/classroomData';
import { appDataService } from '../services/appDataService';

const energyStyles = {
  alta: 'bg-emerald-50 text-emerald-700',
  estavel: 'bg-blue-50 text-blue-700',
  baixa: 'bg-amber-50 text-amber-700',
} as const;

const checkInOptions: EmotionState[] = ['motivado', 'normal', 'confuso', 'cansado', 'empolgado'];

export function EmotionPage() {
  const [history, setHistory] = useState(() => appDataService.getEmotionHistory().items);
  const latestEmotion = history[history.length - 1];
  const stableDays = history.filter((entry) => entry.energyLevel === 'estavel').length;

  function handleCheckIn(emotion: EmotionState) {
    setHistory(appDataService.saveEmotionCheck(emotion).items);
  }

  return (
    <div className="mx-auto max-w-[1440px] px-8 py-7">
      <header className="mb-7 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">Check-in e bem-estar</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe seu historico emocional e use esses sinais para ajustar carga, foco e revisao ao longo da semana.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2">
              <HeartPulse size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Estado atual</p>
              <p className="text-xs text-muted-foreground">Seu ultimo registro</p>
            </div>
          </div>
          <p className="text-sm font-medium">
            {emotionEmoji[latestEmotion.emotion]} {emotionLabels[latestEmotion.emotion]}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{latestEmotion.note}</p>
        </div>
      </header>

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Ultimo check-in</p>
          <p className="mt-2 text-2xl font-semibold">{emotionLabels[latestEmotion.emotion]}</p>
          <p className="mt-1 text-sm text-muted-foreground">{latestEmotion.label}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Dias estaveis</p>
          <p className="mt-2 text-2xl font-semibold">{stableDays}</p>
          <p className="mt-1 text-sm text-muted-foreground">na janela recente</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Sinal principal</p>
          <p className="mt-2 text-2xl font-semibold">{latestEmotion.energyLevel}</p>
          <p className="mt-1 text-sm text-muted-foreground">energia de hoje</p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Registrar check-in</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Atualize seu estado do dia. O historico abaixo sera ajustado automaticamente.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
            {checkInOptions.map((emotion) => (
              <button
                key={emotion}
                type="button"
                onClick={() => handleCheckIn(emotion)}
                className="rounded-xl border border-border bg-background px-4 py-4 text-left transition-colors hover:bg-secondary"
              >
                <p className="mb-2 text-2xl">{emotionEmoji[emotion]}</p>
                <p className="text-sm font-medium">{emotionLabels[emotion]}</p>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {history.map((entry) => (
              <article key={`${entry.label}-${entry.emotion}`} className="rounded-xl border border-border p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{emotionEmoji[entry.emotion]}</span>
                    <div>
                      <p className="text-sm font-semibold">{emotionLabels[entry.emotion]}</p>
                      <p className="text-xs text-muted-foreground">{entry.label}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs ${energyStyles[entry.energyLevel]}`}>
                    energia {entry.energyLevel}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{entry.note}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-primary" />
              <h2 className="text-base font-semibold">Leitura da IA</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Sua energia volta a um estado estavel quando a rotina fica mais simples e previsivel. Use isso a seu favor nas semanas mais densas.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold">Sugestao pratica</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Quando aparecer um dia de energia baixa, reduza carga nova e foque em revisar uma unica tarefa critica.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
