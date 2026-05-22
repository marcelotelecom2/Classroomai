import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  CheckCircle,
  Clock,
  HeartPulse,
  Sparkles,
  TrendingUp,
  UserCheck,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router';
import { AIAssistant, AITip } from '../components/AIAssistant';
import { EmotionCheck } from '../components/EmotionCheck';
import { MetricCard } from '../components/MetricCard';
import { TasksList } from '../components/TasksList';
import { UpcomingClasses } from '../components/UpcomingClasses';
import { getBandStyles, getStudentComparisonSnapshot } from '../data/studentComparison';
import { appDataService } from '../services/appDataService';

export function DashboardPage() {
  const comparison = getStudentComparisonSnapshot();
  const overview = appDataService.getStudentOverview();
  const lessonCounts = appDataService.getLessonCounts();
  const taskCounts = appDataService.getTaskCounts();

  return (
    <div className="mx-auto max-w-[1440px] px-8 py-7">
      <header className="mb-7 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Painel do aluno</span>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">Atualizado hoje</span>
          </div>
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">Ola, {overview.name}</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Aqui esta a sua visao do dia: progresso, comparativo com a turma e os proximos passos para manter seu ritmo.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2">
              <CalendarDays size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Hoje na trilha</p>
              <p className="text-xs text-muted-foreground">Sua agenda imediata</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl bg-secondary/60 p-3">
              <p className="text-sm font-medium">{overview.currentLessonTitle}</p>
              <p className="mt-1 text-xs text-muted-foreground">Continue do ponto atual ou revise o material antes da aula.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-secondary/60 p-3">
                <p className="text-xs text-muted-foreground">Pendencias</p>
                <p className="mt-1 text-lg font-semibold">{taskCounts.overdue + taskCounts.inProgress} tarefas</p>
              </div>
              <div className="rounded-xl bg-secondary/60 p-3">
                <p className="text-xs text-muted-foreground">Frequencia</p>
                <p className="mt-1 text-lg font-semibold">{overview.attendanceRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-5 xl:grid-cols-4">
        <MetricCard
          title="Aulas concluidas"
          value={`${overview.completedLessons}/${overview.totalLessons}`}
          subtitle={`${overview.totalLessons - overview.completedLessons} aulas restantes`}
          progress={Math.round((overview.completedLessons / overview.totalLessons) * 100)}
          icon={BookOpen}
          color="#6C4DFF"
        />
        <MetricCard
          title="Presenca media"
          value={`${overview.attendanceRate}%`}
          subtitle="acima da meta"
          progress={overview.attendanceRate}
          icon={UserCheck}
          color="#10B981"
        />
        <MetricCard
          title="Tarefas entregues"
          value={`${overview.deliveredTasks}/${overview.totalTasks}`}
          subtitle={`${taskCounts.overdue + taskCounts.inProgress} tarefas em aberto`}
          progress={Math.round((overview.deliveredTasks / overview.totalTasks) * 100)}
          icon={CheckCircle}
          color="#F59E0B"
        />
        <MetricCard
          title="XP total"
          value={overview.xp.toLocaleString('pt-BR')}
          subtitle={`Level ${overview.level}`}
          progress={72}
          icon={Zap}
          color="#EC4899"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Painel do dia</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Organize o que fazer agora antes de mergulhar na agenda e nas tarefas.
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Hoje</span>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-secondary/60 p-4">
                <Clock size={18} className="mb-3 text-primary" />
                <p className="text-sm font-medium">{lessonCounts.live} aula ao vivo</p>
                <p className="mt-1 text-xs text-muted-foreground">acompanhamento prioritario hoje</p>
              </div>
              <div className="rounded-xl bg-secondary/60 p-4">
                <CheckCircle size={18} className="mb-3 text-green-600" />
                <p className="text-sm font-medium">{taskCounts.inProgress} em andamento</p>
                <p className="mt-1 text-xs text-muted-foreground">continue hoje</p>
              </div>
              <div className="rounded-xl bg-secondary/60 p-4">
                <AlertCircle size={18} className="mb-3 text-destructive" />
                <p className="text-sm font-medium">{taskCounts.overdue} atrasada</p>
                <p className="mt-1 text-xs text-muted-foreground">{overview.currentTaskTitle}</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Voce em relacao a turma</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Leitura agregada do seu momento sem expor colegas individualmente.
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Comparativo agregado</span>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              {comparison.highlights.map((highlight) => (
                <article key={highlight.title} className="rounded-xl bg-secondary/60 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{highlight.title}</p>
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getBandStyles(highlight.band)}`}>
                      {highlight.band}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </article>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {comparison.metrics.map((metric) => (
                  <article key={metric.key} className="rounded-xl border border-border p-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">{metric.label}</p>
                        <p className="mt-1 text-2xl font-semibold tracking-tight">{metric.studentValue}</p>
                      </div>
                      <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getBandStyles(metric.band)}`}>
                        {metric.band}
                      </span>
                    </div>
                    <p className="mb-2 text-xs text-muted-foreground">Media da turma: {metric.groupValue}</p>
                    <p className="text-sm text-muted-foreground">{metric.summary}</p>
                  </article>
                ))}
              </div>

              <aside className="space-y-3 rounded-xl bg-primary/5 p-5">
                <div className="rounded-lg bg-background/80 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <TrendingUp size={16} className="text-primary" />
                    <p className="text-sm font-semibold">Leitura geral</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sua presenca esta forte, enquanto progresso e tarefas pedem mais regularidade para alinhar seu ritmo com a turma.
                  </p>
                </div>

                <div className="rounded-lg bg-background/80 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <HeartPulse size={16} className="text-primary" />
                    <p className="text-sm font-semibold">Comportamento e energia</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{comparison.groupMood}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{comparison.energySummary}</p>
                </div>

                <div className="rounded-lg bg-background/80 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles size={16} className="text-primary" />
                    <p className="text-sm font-semibold">Proximo ajuste</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Reduzir atrasos nesta semana tende a melhorar sua comparacao geral mais rapido do que aumentar carga de estudo agora.
                  </p>
                </div>
              </aside>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <UpcomingClasses />
            <TasksList />
          </section>
        </div>

        <aside className="space-y-6">
          <EmotionCheck />
          <AIAssistant />
          <AITip />

          <section className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              <h2 className="text-base font-semibold">Ritmo sugerido</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Feche a tarefa atrasada, revise a aula anterior por 20 minutos e use o chat da IA se travar em algum conceito.
            </p>
            <Link to="/tarefas" className="mt-3 inline-flex text-sm font-medium text-primary">
              Ir para tarefas
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
