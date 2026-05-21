import { Circle, CheckCircle2, AlertCircle } from 'lucide-react';

interface TaskItemProps {
  title: string;
  status: 'pending' | 'late' | 'completed';
  dueDate?: string;
}

export function TaskItem({ title, status, dueDate }: TaskItemProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={18} className="text-green-600" />;
      case 'late':
        return <AlertCircle size={18} className="text-destructive" />;
      default:
        return <Circle size={18} className="text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-muted-foreground line-through';
      case 'late':
        return 'text-destructive';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-accent transition-colors">
      {getStatusIcon()}
      <div className="flex-1">
        <p className={`font-medium ${getStatusColor()}`}>{title}</p>
        {dueDate && (
          <p className="text-xs text-muted-foreground mt-0.5">Prazo: {dueDate}</p>
        )}
      </div>
    </div>
  );
}
