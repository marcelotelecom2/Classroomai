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
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold mb-4">Como você está hoje?</h3>

      <div className="flex gap-3 justify-between">
        {emotions.map((emotion, index) => (
          <button
            key={index}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
              emotion.selected
                ? 'bg-primary/10 ring-2 ring-primary'
                : 'hover:bg-secondary'
            }`}
          >
            <span className="text-3xl">{emotion.emoji}</span>
            <span className={`text-xs ${
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
