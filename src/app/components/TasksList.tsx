import { AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { appDataService } from '../services/appDataService';

export function TasksList() {
  const tasks = appDataService.getTasks().slice(0, 4);
  const taskCounts = appDataService.getTaskCounts(tasks);

  const getStatusIcon = (status: (typeof tasks)[number]['status']) => {
    switch (status) {
      case 'entregue':
        return <CheckCircle2 size={18} className="text-green-500" />;
      case 'atrasada':
        return <AlertCircle size={18} className="text-destructive" />;
      default:
        return <Circle size={18} className="text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: (typeof tasks)[number]['status']) => {
    switch (status) {
      case 'entregue':
        return 'bg-green-50 text-green-700';
      case 'atrasada':
        return 'bg-red-50 text-destructive';
      default:
        return 'bg-blue-50 text-blue-700';
    }
  };

  return (
    <div className="h-full rounded-xl border border-border bg-card p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Tarefas em foco</h3>
          <p className="mt-1 text-sm text-muted-foreground">Resolva o que pede atencao primeiro e mantenha o ritmo da semana.</p>
        </div>
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs text-destructive">{taskCounts.overdue} atrasada</span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-secondary/40"
          >
            <div className="pt-0.5">{getStatusIcon(task.status)}</div>

            <div className="min-w-0">
              <p className="mb-1 text-sm font-semibold">{task.title}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>{task.course}</span>
                <span>Prazo: {task.dueDate}</span>
              </div>
            </div>

            <span className={`rounded-full px-2.5 py-1 text-xs ${getStatusColor(task.status)}`}>{task.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
