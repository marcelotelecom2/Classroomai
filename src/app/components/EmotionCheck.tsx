import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { emotionEmoji, emotionLabels } from '../data/classroomData';
import { appDataService } from '../services/appDataService';

export function EmotionCheck() {
  const history = appDataService.getEmotionHistory().items;
  const latestEmotion = history[history.length - 1];

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Como voce esta hoje?</h2>
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] text-primary">check-in rapido</span>
        </div>
        <p className="text-xs text-muted-foreground">Seu check-in ajuda a IA a ajustar seu ritmo e suas sugestoes.</p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        {history.slice(-4).map((entry) => {
          const selected = entry.label === latestEmotion.label;
          return (
            <div
              key={`${entry.label}-${entry.emotion}`}
              className={`flex min-h-[60px] min-w-0 items-center gap-3 rounded-xl border px-3 py-3 ${
                selected ? 'border-primary bg-primary/10 shadow-sm' : 'border-border bg-background/70'
              }`}
            >
              <span className="text-2xl leading-none">{emotionEmoji[entry.emotion]}</span>
              <div className="min-w-0">
                <p className={`truncate text-sm ${selected ? 'font-medium text-primary' : 'text-foreground'}`}>
                  {emotionLabels[entry.emotion]}
                </p>
                <p className="text-xs text-muted-foreground">{entry.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl bg-secondary/60 p-4">
        <p className="text-sm font-medium">Historico recente</p>
        <p className="mt-1 text-xs text-muted-foreground">{latestEmotion.note}</p>
        <Link
          to="/emotion"
          aria-label="Ver historico de check-in"
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          Ver historico
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
