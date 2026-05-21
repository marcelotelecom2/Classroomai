import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  progress?: number;
  subtitle?: string;
}

export function MetricCard({ icon: Icon, title, value, progress, subtitle }: MetricCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 border border-border">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <Icon size={20} />
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-1">{value}</h3>
      <p className="text-sm text-muted-foreground mb-3">{title}</p>

      {progress !== undefined && (
        <div className="space-y-1">
          <div className="w-full bg-secondary rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  );
}
