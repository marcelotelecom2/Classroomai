import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

export function AIAssistant() {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-xl bg-primary p-3">
          <Sparkles size={22} className="text-primary-foreground" />
        </div>

        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-base font-semibold">Assistente IA</h3>
            <span className="rounded-full bg-background/80 px-2 py-0.5 text-[11px] text-primary">disponivel</span>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Tire duvidas sobre aulas, exercicios e conceitos sem perder o contexto da sua trilha.
          </p>

          <Link
            to="/chat-ia"
            aria-label="Abrir Chat IA"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Abrir Chat IA
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AITip() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <Sparkles size={18} className="text-primary" />
        </div>
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-base font-semibold">Dica da IA</h3>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">agora</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Revise Machine Learning por 20 minutos antes da proxima aula para chegar com os conceitos mais frescos.
          </p>
        </div>
      </div>
    </div>
  );
}
