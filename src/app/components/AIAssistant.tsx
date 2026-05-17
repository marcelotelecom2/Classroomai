import { Sparkles, ArrowRight } from 'lucide-react';

export function AIAssistant() {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary rounded-lg">
          <Sparkles size={24} className="text-primary-foreground" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Assistente IA</h3>
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
