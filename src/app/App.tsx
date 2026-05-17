import { Sidebar } from './components/Sidebar';
import { MetricCard } from './components/MetricCard';
import { UpcomingClasses } from './components/UpcomingClasses';
import { EmotionCheck } from './components/EmotionCheck';
import { TasksList } from './components/TasksList';
import { AIAssistant } from './components/AIAssistant';
import { BookOpen, UserCheck, CheckCircle, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Dashboard" />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">Olá, Lucas 👋</h1>
            <p className="text-muted-foreground">Vamos continuar evoluindo hoje.</p>
          </header>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Aulas concluídas"
              value="12/20"
              progress={60}
              icon={BookOpen}
              color="#6C4DFF"
            />
            <MetricCard
              title="Presença média"
              value="92%"
              progress={92}
              icon={UserCheck}
              color="#10B981"
            />
            <MetricCard
              title="Tarefas entregues"
              value="15/18"
              progress={83}
              icon={CheckCircle}
              color="#F59E0B"
            />
            <MetricCard
              title="XP total"
              value="2.400"
              icon={Zap}
              color="#EC4899"
            />
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-2">
              <UpcomingClasses />
            </div>

            <div>
              <EmotionCheck />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <TasksList />
            </div>

            <div>
              <AIAssistant />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}