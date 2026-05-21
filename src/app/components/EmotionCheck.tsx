import { useState } from 'react';

interface Emotion {
  emoji: string;
  label: string;
}

export function EmotionCheck() {
  const [selected, setSelected] = useState<string | null>(null);

  const emotions: Emotion[] = [
    { emoji: '🙂', label: 'Motivado' },
    { emoji: '😐', label: 'Normal' },
    { emoji: '😕', label: 'Confuso' },
    { emoji: '😴', label: 'Cansado' },
    { emoji: '🚀', label: 'Empolgado' },
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="font-semibold mb-4">Como você está hoje?</h3>
      <div className="flex justify-between gap-2">
        {emotions.map((emotion) => (
          <button
            key={emotion.label}
            onClick={() => setSelected(emotion.label)}
            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
              selected === emotion.label
                ? 'bg-primary/10 border-2 border-primary'
                : 'bg-secondary hover:bg-accent border-2 border-transparent'
            }`}
          >
            <span className="text-3xl">{emotion.emoji}</span>
            <span className="text-xs text-center">{emotion.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
