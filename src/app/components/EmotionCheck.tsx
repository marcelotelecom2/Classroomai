interface Emotion {
  emoji: string;
  label: string;
  selected?: boolean;
}

export function EmotionCheck() {
  const emotions: Emotion[] = [
    { emoji: '🙂', label: 'Motivado', selected: false },
    { emoji: '😐', label: 'Normal', selected: true },
    { emoji: '😕', label: 'Confuso', selected: false },
    { emoji: '😴', label: 'Cansado', selected: false },
    { emoji: '🚀', label: 'Empolgado', selected: false },
  ];

  return (
    <div className="bg-card rounded-xl p-5 border border-border">
      <div className="mb-4">
        <h3 className="text-base font-semibold">Como você está hoje?</h3>
        <p className="text-xs text-muted-foreground mt-1">Seu check-in ajuda a IA a ajustar seu ritmo.</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {emotions.map((emotion, index) => (
          <button
            key={index}
            className={`flex min-h-[58px] min-w-0 items-center gap-3 rounded-lg border px-3 py-2 text-left transition-all ${
              index === emotions.length - 1 ? 'col-span-2' : ''
            } ${
              emotion.selected
                ? 'border-primary bg-primary/10 shadow-sm'
                : 'border-border hover:bg-secondary'
            }`}
          >
            <span className="text-2xl leading-none">{emotion.emoji}</span>
            <span className={`whitespace-nowrap text-sm leading-none ${
              emotion.selected ? 'text-primary font-medium' : 'text-muted-foreground'
            }`}>
              {emotion.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
