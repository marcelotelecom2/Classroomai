import { Sparkles, ArrowRight } from 'lucide-react';

export function AIAssistant() {
  return (
    <div className="bg-primary/5 rounded-xl p-5 border border-primary/20">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary rounded-lg shrink-0">
          <Sparkles size={22} className="text-primary-foreground" />
        </div>

        <div className="flex-1">
          <h3 className="text-base font-semibold mb-2">Assistente IA</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Tire suas dúvidas sobre as aulas, exercícios ou conceitos de IA com nosso assistente inteligente.
          </p>

          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Abrir Chat IA
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function AITip() {
  return (
    <div className="bg-card rounded-xl p-5 border border-border">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Sparkles size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-base font-semibold mb-1">Dica da IA</h3>
          <p className="text-sm text-muted-foreground">
            Revise Machine Learning por 20 minutos antes da próxima aula para chegar com os conceitos frescos.
          </p>
        </div>
      </div>
    </div>
  );
}
