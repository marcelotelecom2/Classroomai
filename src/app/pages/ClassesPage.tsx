import { BookOpen, CalendarDays, CheckCircle2, Clock, Filter, PlayCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { type LessonRecord } from '../data/learningData';
import { appDataService } from '../services/appDataService';
import { cn } from '../components/ui/utils';

type ClassFilter = LessonRecord['status'] | 'todas';
type DetailMode = 'detalhes' | 'material';

const classFilters: Array<{ label: string; value: ClassFilter }> = [
  { label: 'Todas', value: 'todas' },
  { label: 'Ao vivo', value: 'ao vivo' },
  { label: 'Amanha', value: 'amanha' },
  { label: 'Gravadas', value: 'gravada' },
];

const statusStyles: Record<LessonRecord['status'], string> = {
  'ao vivo': 'bg-green-50 text-green-700',
  amanha: 'bg-primary/10 text-primary',
  gravada: 'bg-amber-50 text-amber-700',
  concluida: 'bg-slate-100 text-slate-700',
};

export function ClassesPage() {
  const lessons = appDataService.getLessons();
  const [activeFilter, setActiveFilter] = useState<ClassFilter>('todas');
  const [selectedLessonId, setSelectedLessonId] = useState<number>(lessons[1].id);
  const [detailMode, setDetailMode] = useState<DetailMode>('detalhes');

  const filteredClasses = useMemo(() => {
    if (activeFilter === 'todas') return lessons;
    return lessons.filter((classItem) => classItem.status === activeFilter);
  }, [activeFilter]);

  const selectedLesson =
    lessons.find((lesson) => lesson.id === selectedLessonId) ??
    filteredClasses[0] ??
    lessons[0];

  const lessonCounts = appDataService.getLessonCounts();

  return (
    <div className="mx-auto max-w-[1440px] px-8 py-7">
      <header className="mb-7 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">Aulas</h1>
          <p className="text-sm text-muted-foreground">
            Organize encontros ao vivo, conteudos gravados e materiais de apoio em uma sequencia mais clara.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2">
              <CalendarDays size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Destaque da agenda</p>
              <p className="text-xs text-muted-foreground">Seu proximo ponto de entrada</p>
            </div>
          </div>
          <p className="text-sm font-medium">{selectedLesson.title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{selectedLesson.nextAction}</p>
        </div>
      </header>

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Ao vivo</p>
          <p className="mt-2 text-2xl font-semibold">{lessonCounts.live}</p>
          <p className="mt-1 text-sm text-muted-foreground">prioridade de acompanhamento</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">A seguir</p>
          <p className="mt-2 text-2xl font-semibold">{lessonCounts.upcoming}</p>
          <p className="mt-1 text-sm text-muted-foreground">ja mapeadas para a semana</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Gravadas</p>
          <p className="mt-2 text-2xl font-semibold">{lessonCounts.recorded}</p>
          <p className="mt-1 text-sm text-muted-foreground">boas para revisao</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Concluidas</p>
          <p className="mt-2 text-2xl font-semibold">{lessonCounts.completed}</p>
          <p className="mt-1 text-sm text-muted-foreground">com material fechado</p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Agenda da turma</h2>
              <p className="mt-1 text-sm text-muted-foreground">Filtre rapido o que precisa assistir primeiro.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 rounded-xl bg-secondary/60 p-1">
              <Filter size={16} className="ml-2 text-muted-foreground" />
              {classFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={activeFilter === filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-sm transition-colors',
                    activeFilter === filter.value
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredClasses.map((classItem) => (
              <article
                key={classItem.id}
                className="grid grid-cols-[88px_minmax(0,1fr)_auto] gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-secondary/40"
              >
                <div className="rounded-lg bg-primary/10 px-3 py-3 text-center">
                  <p className="text-sm font-semibold text-primary">{classItem.date}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{classItem.time}</p>
                </div>

                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold">{classItem.title}</h3>
                    <span className={cn('rounded-full px-2.5 py-1 text-xs', statusStyles[classItem.status])}>
                      {classItem.status}
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                      material {classItem.materialStatus}
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">{classItem.category} • {classItem.module}</p>
                  <div className="mb-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={14} />
                      {classItem.duration}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BookOpen size={14} />
                      Progresso {classItem.progress}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${classItem.progress}%` }} />
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    type="button"
                    aria-label={`Ver detalhes de ${classItem.title}`}
                    onClick={() => {
                      setSelectedLessonId(classItem.id);
                      setDetailMode('detalhes');
                    }}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <PlayCircle size={16} />
                    Ver detalhes
                  </button>
                  <button
                    type="button"
                    aria-label={`Acessar material de ${classItem.title}`}
                    onClick={() => {
                      setSelectedLessonId(classItem.id);
                      setDetailMode('material');
                    }}
                    className="rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                  >
                    Acessar material
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold">{detailMode === 'detalhes' ? 'Detalhe da aula' : 'Material da aula'}</h2>
              {selectedLesson.progress === 100 && <CheckCircle2 size={16} className="text-emerald-600" />}
            </div>
            <p className="text-sm font-medium">{selectedLesson.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {detailMode === 'detalhes' ? selectedLesson.description : selectedLesson.nextAction}
            </p>
            <div className="mt-4 rounded-xl bg-background/80 p-4 text-sm text-muted-foreground">
              {detailMode === 'detalhes'
                ? `Status: ${selectedLesson.status}. Progresso atual: ${selectedLesson.progress}%.`
                : `Material ${selectedLesson.materialStatus}. Retome pelo ${selectedLesson.module.toLowerCase()}.`}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold">Ritmo sugerido</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Priorize as aulas ao vivo primeiro, continue o que esta em andamento e use as gravadas como reforco no fim da semana.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
