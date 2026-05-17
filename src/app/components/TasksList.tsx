import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface Task {
  name: string;
  status: 'atrasada' | 'em andamento' | 'entregue';
  dueDate: string;
}

export function TasksList() {
  const tasks: Task[] = [
    { name: 'Implementar modelo de classificação', status: 'em andamento', dueDate: 'Hoje' },
    { name: 'Análise de dataset de imagens', status: 'entregue', dueDate: '16 Mai' },
    { name: 'Projeto final - Chatbot com IA', status: 'em andamento', dueDate: '25 Mai' },
    { name: 'Exercícios de regressão linear', status: 'atrasada', dueDate: '15 Mai' },
  ];

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'entregue':
        return <CheckCircle2 size={18} className="text-green-500" />;
      case 'atrasada':
        return <AlertCircle size={18} className="text-destructive" />;
      default:
        return <Circle size={18} className="text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
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
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold">Tarefas Pendentes</h3>
          <p className="text-sm text-muted-foreground mt-1">Priorize o que pede atenção hoje</p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-red-50 text-destructive">1 atrasada</span>
      </div>

      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
          >
            {getStatusIcon(task.status)}

            <div className="min-w-0">
              <p className="text-sm font-medium mb-0.5">{task.name}</p>
              <p className="text-xs text-muted-foreground">{task.dueDate}</p>
            </div>

            <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
