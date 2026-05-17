import { Clock } from 'lucide-react';

interface ClassItem {
  date: string;
  name: string;
  time: string;
  status: 'próxima' | 'hoje' | 'amanhã';
}

export function UpcomingClasses() {
  const classes: ClassItem[] = [
    { date: '18 Mai', name: 'Fundamentos de Machine Learning', time: '14:00', status: 'amanhã' },
    { date: '19 Mai', name: 'Redes Neurais e Deep Learning', time: '14:00', status: 'próxima' },
    { date: '20 Mai', name: 'Processamento de Linguagem Natural', time: '14:00', status: 'próxima' },
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold">Próximas Aulas</h3>
          <p className="text-sm text-muted-foreground mt-1">Agenda dos próximos encontros da turma</p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">3 aulas</span>
      </div>

      <div className="space-y-2">
        {classes.map((classItem, index) => (
          <div
            key={index}
            className="grid grid-cols-[72px_1fr_auto] items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
          >
            <div className="rounded-lg bg-primary/10 px-3 py-2 text-center">
              <p className="text-sm font-semibold text-primary">{classItem.date}</p>
            </div>

            <div className="min-w-0">
              <p className="font-medium text-sm mb-1">{classItem.name}</p>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock size={14} />
                <span className="text-xs">{classItem.time}</span>
              </div>
            </div>

            <span className={`text-xs px-3 py-1 rounded-full ${
              classItem.status === 'amanhã'
                ? 'bg-primary/10 text-primary'
                : 'bg-secondary text-muted-foreground'
            }`}>
              {classItem.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
