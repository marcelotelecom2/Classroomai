import { AlertCircle, CheckCircle2, Circle, ClipboardList, Filter } from 'lucide-react';
import { useMemo, useState } from 'react';
import { type StudentTaskRecord } from '../data/learningData';
import { appDataService } from '../services/appDataService';
import { cn } from '../components/ui/utils';

type TaskStatusFilter = StudentTaskRecord['status'] | 'todas';
type DisciplineFilter = 'todas' | 'Machine Learning' | 'Visao Computacional' | 'NLP';

const taskFilters: Array<{ label: string; value: TaskStatusFilter }> = [
  { label: 'Todas', value: 'todas' },
  { label: 'Em andamento', value: 'em andamento' },
  { label: 'Entregues', value: 'entregue' },
  { label: 'Atrasadas', value: 'atrasada' },
];

const disciplineFilters: DisciplineFilter[] = ['todas', 'Machine Learning', 'Visao Computacional', 'NLP'];

const statusStyles: Record<StudentTaskRecord['status'], string> = {
  atrasada: 'bg-red-50 text-destructive',
  'em andamento': 'bg-blue-50 text-blue-700',
  entregue: 'bg-green-50 text-green-700',
};

const priorityStyles: Record<StudentTaskRecord['priority'], string> = {
  alta: 'text-destructive',
  media: 'text-amber-600',
  baixa: 'text-green-600',
};

function getStatusIcon(status: StudentTaskRecord['status']) {
  switch (status) {
    case 'entregue':
      return <CheckCircle2 size={18} className="text-green-500" />;
    case 'atrasada':
      return <AlertCircle size={18} className="text-destructive" />;
    default:
      return <Circle size={18} className="text-muted-foreground" />;
  }
}

export function TasksPage() {
  const [activeFilter, setActiveFilter] = useState<TaskStatusFilter>('todas');
  const [disciplineFilter, setDisciplineFilter] = useState<DisciplineFilter>('todas');
  const [tasks, setTasks] = useState(() => appDataService.getTasks());
  const [selectedTaskId, setSelectedTaskId] = useState<number>(() => appDataService.getTasks()[0].id);

  const filteredTasks = useMemo(() => {
    const baseTasks = activeFilter === 'todas' ? tasks : tasks.filter((task) => task.status === activeFilter);
    const disciplineTasks =
      disciplineFilter === 'todas' ? baseTasks : baseTasks.filter((task) => task.course === disciplineFilter);

    return [...disciplineTasks].sort((taskA, taskB) => {
      const order = { alta: 0, media: 1, baixa: 2 };
      return order[taskA.priority] - order[taskB.priority];
    });
  }, [activeFilter, disciplineFilter, tasks]);

  const taskCounts = appDataService.getTaskCounts(tasks);
  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? tasks[0];
  const urgentTask = tasks.find((task) => task.status === 'atrasada') ?? tasks.find((task) => task.status === 'em andamento');

  function markTaskAsDelivered(taskId: number) {
    const updatedTasks = appDataService.updateTaskStatus(taskId, 'entregue');
    setTasks(updatedTasks);
    setSelectedTaskId(taskId);
  }

  return (
    <div className="mx-auto max-w-[1440px] px-8 py-7">
      <header className="mb-7 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">Tarefas</h1>
          <p className="text-sm text-muted-foreground">
            Reorganize a fila de entregas com uma leitura mais objetiva entre urgencia, andamento e concluido.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-red-50 p-2">
              <AlertCircle size={18} className="text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium">Prioridade agora</p>
              <p className="text-xs text-muted-foreground">Seu gargalo da semana</p>
            </div>
          </div>
          <p className="text-sm font-medium">
            {urgentTask ? `${urgentTask.title} precisa da sua atencao.` : 'Nenhuma tarefa urgente no momento.'}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Resolva primeiro para aliviar o resto da fila.</p>
        </div>
      </header>

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Em andamento</p>
          <p className="mt-2 text-2xl font-semibold">{taskCounts.inProgress}</p>
          <p className="mt-1 text-sm text-muted-foreground">precisam de continuidade</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Entregues</p>
          <p className="mt-2 text-2xl font-semibold">{taskCounts.delivered}</p>
          <p className="mt-1 text-sm text-muted-foreground">ja concluidas</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Atrasadas</p>
          <p className="mt-2 text-2xl font-semibold">{taskCounts.overdue}</p>
          <p className="mt-1 text-sm text-muted-foreground">pedem acao imediata</p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-5 flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Fila de tarefas</h2>
                <p className="mt-1 text-sm text-muted-foreground">Ordene sua semana com foco nas entregas mais criticas.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 rounded-xl bg-secondary/60 p-1">
                <Filter size={16} className="ml-2 text-muted-foreground" />
                {taskFilters.map((filter) => (
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

            <div className="flex flex-wrap gap-2">
              {disciplineFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={disciplineFilter === filter}
                  onClick={() => setDisciplineFilter(filter)}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    disciplineFilter === filter ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <article
                key={task.id}
                className={`grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 rounded-xl border p-4 transition-colors ${
                  selectedTask.id === task.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-secondary/40'
                }`}
              >
                <div className="pt-0.5">{getStatusIcon(task.status)}</div>

                <button type="button" onClick={() => setSelectedTaskId(task.id)} className="min-w-0 text-left">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold">{task.title}</h3>
                    <span className={cn('text-xs font-medium', priorityStyles[task.priority])}>
                      {task.priority === 'alta'
                        ? 'Prioridade alta'
                        : task.priority === 'media'
                          ? 'Prioridade media'
                          : 'Prioridade baixa'}
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">{task.course}</p>
                  <p className="text-xs text-muted-foreground">Prazo: {task.dueDate} • {task.estimatedTime}</p>
                </button>

                <div className="flex flex-col items-end gap-2">
                  <span className={cn('whitespace-nowrap rounded-full px-2.5 py-1 text-xs', statusStyles[task.status])}>
                    {task.status}
                  </span>
                  {task.status !== 'entregue' && (
                    <button
                      type="button"
                      aria-label={`Marcar ${task.title} como entregue`}
                      onClick={() => markTaskAsDelivered(task.id)}
                      className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
                    >
                      Marcar entregue
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-lg bg-primary p-2 text-primary-foreground">
                <ClipboardList size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold">Detalhe da tarefa</h2>
                <p className="mt-1 text-sm text-muted-foreground">{selectedTask.course}</p>
              </div>
            </div>
            <p className="text-sm font-medium">{selectedTask.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{selectedTask.description}</p>

            <div className="mt-4 rounded-xl bg-background/80 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Checklist</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {selectedTask.checklist.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold">Sugestao de ritmo</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Feche a tarefa atrasada primeiro e depois retome o projeto final para evitar acumulo no fim da semana.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
