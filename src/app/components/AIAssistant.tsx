import { Sparkles } from 'lucide-react';

interface AIAssistantProps {
  onOpenChat?: () => void;
}

export function AIAssistant({ onOpenChat }: AIAssistantProps) {
  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-primary-foreground">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
          <Sparkles size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Assistente IA</h3>
          <p className="text-sm text-primary-foreground/90 mb-4">
            Tire suas dúvidas sobre os conteúdos, peça ajuda com exercícios ou converse sobre programação.
          </p>
          <button
            type="button"
            onClick={onOpenChat}
            className="bg-white text-primary px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            Abrir Chat IA
          </button>
        </div>
      </div>
    </div>
  );
}
