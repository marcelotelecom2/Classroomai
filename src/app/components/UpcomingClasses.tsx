import { BookOpen, Clock } from 'lucide-react';
import { lessons } from '../data/learningData';

export function UpcomingClasses() {
  const classes = lessons.filter((lesson) => lesson.status !== 'concluida').slice(0, 3);

  return (
    <div className="h-full rounded-xl border border-border bg-card p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Proximas aulas</h3>
          <p className="mt-1 text-sm text-muted-foreground">Veja o que vem a seguir para se preparar com antecedencia.</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{classes.length} mapeadas</span>
      </div>

      <div className="space-y-3">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="grid cursor-pointer grid-cols-[72px_minmax(0,1fr)] gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-secondary/40"
          >
            <div className="rounded-lg bg-primary/10 px-3 py-3 text-center">
              <p className="text-sm font-semibold text-primary">{classItem.date}</p>
              <p className="mt-1 text-xs text-muted-foreground">{classItem.time}</p>
            </div>

            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-semibold">{classItem.title}</h4>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] ${
                    classItem.status === 'amanha'
                      ? 'bg-primary/10 text-primary'
                      : classItem.status === 'ao vivo'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {classItem.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock size={14} />
                  {classItem.duration}
                </span>
                <span className="inline-flex items-center gap-1">
                  <BookOpen size={14} />
                  material {classItem.materialStatus}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
