import { BookOpen, Calendar, CheckSquare, Trophy } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { MetricCard } from './components/MetricCard';
import { UpcomingClass } from './components/UpcomingClass';
import { EmotionCheck } from './components/EmotionCheck';
import { TaskItem } from './components/TaskItem';
import { AIAssistant } from './components/AIAssistant';

export default function App() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Olá, Lucas 👋
            </h1>
            <p className="text-muted-foreground">Vamos continuar evoluindo hoje.</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <MetricCard
              icon={BookOpen}
              title="Aulas concluídas"
              value="18/24"
              progress={75}
              subtitle="75% completo"
            />
            <MetricCard
              icon={Calendar}
              title="Presença média"
              value="92%"
              progress={92}
              subtitle="Excelente frequência"
            />
            <MetricCard
              icon={CheckSquare}
              title="Tarefas entregues"
              value="15/18"
              progress={83}
              subtitle="3 pendentes"
            />
            <MetricCard
              icon={Trophy}
              title="XP total"
              value="2.450"
              subtitle="Nível 12"
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="font-semibold mb-4">Próximas Aulas</h2>
                <div className="space-y-3">
                  <UpcomingClass
                    date="Seg 19"
                    title="Deep Learning e Redes Neurais"
                    time="19:00 - 21:00"
                    status="today"
                  />
                  <UpcomingClass
                    date="Qua 21"
                    title="Processamento de Linguagem Natural"
                    time="19:00 - 21:00"
                    status="soon"
                  />
                  <UpcomingClass
                    date="Sex 23"
                    title="Computer Vision Avançado"
                    time="19:00 - 21:00"
                    status="scheduled"
                  />
                </div>
              </div>

              <EmotionCheck />

              <div className="bg-card rounded-xl p-6 border border-border">
                <h2 className="font-semibold mb-4">Tarefas Pendentes</h2>
                <div className="space-y-2">
                  <TaskItem
                    title="Implementar modelo de classificação de imagens"
                    status="late"
                    dueDate="16 Mai"
                  />
                  <TaskItem
                    title="Estudar algoritmos de otimização"
                    status="pending"
                    dueDate="20 Mai"
                  />
                  <TaskItem
                    title="Quiz: Fundamentos de ML"
                    status="completed"
                    dueDate="15 Mai"
                  />
                  <TaskItem
                    title="Projeto: Chatbot com GPT"
                    status="pending"
                    dueDate="25 Mai"
                  />
                </div>
              </div>
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