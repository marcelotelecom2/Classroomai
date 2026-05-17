import { LucideIcon } from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';

interface MetricCardProps {
  title: string;
  value: string;
  progress?: number;
  icon: LucideIcon;
  color?: string;
}

export function MetricCard({ title, value, progress, icon: Icon, color = '#6C4DFF' }: MetricCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 border border-border">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${color}15` }}>
          <Icon size={20} style={{ color }} />
        </div>
      </div>

      {progress !== undefined && (
        <Progress.Root className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <Progress.Indicator
            className="h-full rounded-full transition-transform duration-300"
            style={{
              backgroundColor: color,
              transform: `translateX(-${100 - progress}%)`
            }}
          />
        </Progress.Root>
      )}
    </div>
  );
}
