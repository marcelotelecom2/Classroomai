import { ReactNode, useState } from 'react';
import { BookOpen, Calendar, CheckSquare, Trophy, UserCheck } from 'lucide-react';
import { Sidebar, AppView } from './components/Sidebar';
import { MetricCard } from './components/MetricCard';
import { UpcomingClass } from './components/UpcomingClass';
import { EmotionCheck } from './components/EmotionCheck';
import { TaskItem } from './components/TaskItem';
import { AIAssistant } from './components/AIAssistant';

const classes = [
  { date: 'Seg 19', title: 'Deep Learning e Redes Neurais', time: '19:00 - 21:00', status: 'today' as const },
  { date: 'Qua 21', title: 'Processamento de Linguagem Natural', time: '19:00 - 21:00', status: 'soon' as const },
  { date: 'Sex 23', title: 'Computer Vision Avançado', time: '19:00 - 21:00', status: 'scheduled' as const },
  { date: 'Seg 26', title: 'Deploy de Modelos de IA', time: '19:00 - 21:00', status: 'scheduled' as const },
];

const tasks = [
  { title: 'Implementar modelo de classificação de imagens', status: 'late' as const, dueDate: '16 Mai' },
  { title: 'Estudar algoritmos de otimização', status: 'pending' as const, dueDate: '20 Mai' },
  { title: 'Quiz: Fundamentos de ML', status: 'completed' as const, dueDate: '15 Mai' },
  { title: 'Projeto: Chatbot com GPT', status: 'pending' as const, dueDate: '25 Mai' },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-card rounded-xl p-6 border border-border">
      <h2 className="font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'classes':
        return (
          <>
            <PageHeader title="Aulas" subtitle="Acompanhe sua agenda e o progresso das próximas aulas." />
            <Section title="Calendário de Aulas">
              <div className="space-y-3">
                {classes.map((classItem) => (
                  <UpcomingClass key={classItem.title} {...classItem} />
                ))}
              </div>
            </Section>
          </>
        );
      case 'attendance':
        return (
          <>
            <PageHeader title="Presença" subtitle="Veja sua frequência e histórico recente." />
            <div className="grid grid-cols-3 gap-6 mb-6">
              <MetricCard icon={UserCheck} title="Presença média" value="92%" progress={92} subtitle="Excelente frequência" />
              <MetricCard icon={Calendar} title="Aulas assistidas" value="22/24" progress={92} subtitle="2 faltas registradas" />
              <MetricCard icon={Trophy} title="Sequência atual" value="8 aulas" progress={80} subtitle="Continue nesse ritmo" />
            </div>
            <Section title="Histórico Recente">
              <div className="space-y-3 text-sm">
                <p className="flex justify-between"><span>Deep Learning e Redes Neurais</span><span className="text-green-600">Presente</span></p>
                <p className="flex justify-between"><span>Machine Learning Aplicado</span><span className="text-green-600">Presente</span></p>
                <p className="flex justify-between"><span>Estatística para IA</span><span className="text-destructive">Ausente</span></p>
              </div>
            </Section>
          </>
        );
      case 'tasks':
        return (
          <>
            <PageHeader title="Tarefas" subtitle="Organize entregas, prazos e atividades concluídas." />
            <Section title="Lista de Tarefas">
              <div className="space-y-2">
                {tasks.map((task) => (
                  <TaskItem key={task.title} {...task} />
                ))}
              </div>
            </Section>
          </>
        );
      case 'emotion':
        return (
          <>
            <PageHeader title="Emotion" subtitle="Registre como você está se sentindo hoje." />
            <EmotionCheck />
          </>
        );
      case 'chat':
        return (
          <>
            <PageHeader title="Chat IA" subtitle="Converse com o assistente para tirar dúvidas de estudo." />
            <Section title="Assistente IA">
              <div className="space-y-4">
                <div className="rounded-lg bg-secondary p-4">
                  <p className="text-sm text-muted-foreground">Assistente</p>
                  <p className="mt-1">Olá, Lucas. Posso ajudar com aulas, tarefas ou revisão de conteúdo.</p>
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Digite sua dúvida..."
                  />
                  <button type="button" className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground">
                    Enviar
                  </button>
                </div>
              </div>
            </Section>
          </>
        );
      case 'settings':
        return (
          <>
            <PageHeader title="Configurações" subtitle="Ajuste preferências da sua conta e da experiência de estudo." />
            <Section title="Preferências">
              <div className="space-y-4 text-sm">
                <label className="flex items-center justify-between">
                  <span>Receber lembretes de aula</span>
                  <input type="checkbox" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span>Notificar tarefas próximas do prazo</span>
                  <input type="checkbox" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span>Resumo semanal de desempenho</span>
                  <input type="checkbox" />
                </label>
              </div>
            </Section>
          </>
        );
      default:
        return (
          <>
            <PageHeader title="Olá, Lucas 👋" subtitle="Vamos continuar evoluindo hoje." />
            <div className="grid grid-cols-4 gap-6 mb-8">
              <MetricCard icon={BookOpen} title="Aulas concluídas" value="18/24" progress={75} subtitle="75% completo" />
              <MetricCard icon={Calendar} title="Presença média" value="92%" progress={92} subtitle="Excelente frequência" />
              <MetricCard icon={CheckSquare} title="Tarefas entregues" value="15/18" progress={83} subtitle="3 pendentes" />
              <MetricCard icon={Trophy} title="XP total" value="2.450" subtitle="Nível 12" />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <Section title="Próximas Aulas">
                  <div className="space-y-3">
                    {classes.slice(0, 3).map((classItem) => (
                      <UpcomingClass key={classItem.title} {...classItem} />
                    ))}
                  </div>
                </Section>
                <EmotionCheck />
                <Section title="Tarefas Pendentes">
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <TaskItem key={task.title} {...task} />
                    ))}
                  </div>
                </Section>
              </div>
              <AIAssistant onOpenChat={() => setActiveView('chat')} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {title}
      </h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}
