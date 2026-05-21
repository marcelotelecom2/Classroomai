interface UpcomingClassProps {
  date: string;
  title: string;
  time: string;
  status: 'soon' | 'today' | 'scheduled';
}

export function UpcomingClass({ date, title, time, status }: UpcomingClassProps) {
  const statusColors = {
    soon: 'bg-yellow-100 text-yellow-700',
    today: 'bg-primary/10 text-primary',
    scheduled: 'bg-muted text-muted-foreground',
  };

  const statusLabels = {
    soon: 'Em breve',
    today: 'Hoje',
    scheduled: 'Agendada',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">{date.split(' ')[0]}</p>
          <p className="font-semibold">{date.split(' ')[1]}</p>
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{time}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {statusLabels[status]}
      </span>
    </div>
  );
}
