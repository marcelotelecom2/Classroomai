import { LucideIcon } from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  progress?: number;
  icon: LucideIcon;
  color?: string;
}

export function MetricCard({ title, value, subtitle, progress, icon: Icon, color = '#6C4DFF' }: MetricCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 min-h-[142px] flex flex-col justify-between">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${color}15` }}>
          <Icon size={20} style={{ color }} />
        </div>
      </div>

      {progress !== undefined && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Progresso</span>
            <span className="text-xs font-medium" style={{ color }}>{progress}%</span>
          </div>
          <Progress.Root className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <Progress.Indicator
              className="h-full rounded-full transition-transform duration-300"
              style={{
                backgroundColor: color,
                transform: `translateX(-${100 - progress}%)`
              }}
            />
          </Progress.Root>
        </div>
      )}
    </div>
  );
}
