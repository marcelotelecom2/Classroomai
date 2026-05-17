import { Sidebar } from './components/Sidebar';
import { MetricCard } from './components/MetricCard';
import { UpcomingClasses } from './components/UpcomingClasses';
import { EmotionCheck } from './components/EmotionCheck';
import { TasksList } from './components/TasksList';
import { AIAssistant, AITip } from './components/AIAssistant';
import { BookOpen, UserCheck, CheckCircle, Zap, CalendarDays, Clock, AlertCircle } from 'lucide-react';

export default function App() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="Dashboard" />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1360px] mx-auto px-8 py-7">
          <header className="mb-7 flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight mb-2">Olá, Lucas 👋</h1>
              <p className="text-muted-foreground">Vamos continuar evoluindo hoje.</p>
            </div>

            <div className="hidden lg:flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <CalendarDays size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Próxima aula amanhã</p>
                <p className="text-xs text-muted-foreground">Machine Learning às 14:00</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
            <MetricCard
              title="Aulas concluídas"
              value="12/20"
              subtitle="8 aulas restantes"
              progress={60}
              icon={BookOpen}
              color="#6C4DFF"
            />
            <MetricCard
              title="Presença média"
              value="92%"
              subtitle="acima da meta"
              progress={92}
              icon={UserCheck}
              color="#10B981"
            />
            <MetricCard
              title="Tarefas entregues"
              value="15/18"
              subtitle="3 tarefas pendentes"
              progress={83}
              icon={CheckCircle}
              color="#F59E0B"
            />
            <MetricCard
              title="XP total"
              value="2.400"
              subtitle="Level 12"
              progress={72}
              icon={Zap}
              color="#EC4899"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6">
            <div className="space-y-6">
              <section className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-lg font-semibold">Resumo do dia</h2>
                    <p className="text-sm text-muted-foreground mt-1">Um panorama rápido para você decidir o próximo passo.</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">Hoje</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="rounded-lg bg-secondary/60 p-4">
                    <Clock size={18} className="text-primary mb-3" />
                    <p className="text-sm font-medium">1 aula próxima</p>
                    <p className="text-xs text-muted-foreground mt-1">Amanhã às 14:00</p>
                  </div>
                  <div className="rounded-lg bg-secondary/60 p-4">
                    <CheckCircle size={18} className="text-green-600 mb-3" />
                    <p className="text-sm font-medium">2 em andamento</p>
                    <p className="text-xs text-muted-foreground mt-1">continue hoje</p>
                  </div>
                  <div className="rounded-lg bg-secondary/60 p-4">
                    <AlertCircle size={18} className="text-destructive mb-3" />
                    <p className="text-sm font-medium">1 atrasada</p>
                    <p className="text-xs text-muted-foreground mt-1">prioridade alta</p>
                  </div>
                </div>
              </section>

              <UpcomingClasses />

              <TasksList />
            </div>

            <aside className="space-y-6">
              <EmotionCheck />
              <AIAssistant />
              <AITip />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
