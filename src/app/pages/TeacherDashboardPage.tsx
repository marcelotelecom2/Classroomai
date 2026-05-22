import {
  AlertTriangle,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  HeartPulse,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import { Link } from 'react-router';
import { MetricCard } from '../components/MetricCard';
import { emotionEmoji, emotionLabels, students, teacherTimeline } from '../data/classroomData';

function average(values: number[]) {
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function formatEmotionSummary() {
  const emotionCount = students.reduce<Record<string, number>>((acc, student) => {
    acc[student.lastEmotion] = (acc[student.lastEmotion] || 0) + 1;
    return acc;
  }, {});

  const topEmotion = Object.entries(emotionCount).sort((a, b) => b[1] - a[1])[0];
  if (!topEmotion) return 'Sem check-ins recentes';

  const emotionKey = topEmotion[0] as keyof typeof emotionLabels;
  return `${emotionEmoji[emotionKey]} ${emotionLabels[emotionKey]} em ${topEmotion[1]} alunos`;
}

export function TeacherDashboardPage() {
  const averageAttendance = average(students.map((student) => student.attendanceRate));
  const averageProgress = average(students.map((student) => student.progressRate));
  const pendingTasks = students.reduce((sum, student) => sum + student.pendingTasks, 0);
  const overdueTasks = students.reduce((sum, student) => sum + student.overdueTasks, 0);
  const atRiskStudents = students.filter(
    (student) => student.attendanceRate < 85 || student.overdueTasks > 0 || student.progressRate < 55
  );
  const completedTaskRate = Math.max(0, Math.round(((students.length * 4 - pendingTasks) / (students.length * 4)) * 100));

  return (
    <div className="mx-auto max-w-[1440px] px-8 py-7">
      <header className="mb-7 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Painel do professor</span>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">Leitura consolidada</span>
          </div>
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">Visao consolidada da turma</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Monitore presenca, progresso, tarefas e engajamento da turma com uma hierarquia mais clara para priorizar intervencoes.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2">
              <CalendarClock size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Proximo marco</p>
              <p className="text-xs text-muted-foreground">Foco operacional da turma</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl bg-secondary/60 p-3">
              <p className="text-sm font-medium">{teacherTimeline[0].title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{teacherTimeline[0].dateLabel} as {teacherTimeline[0].time}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-secondary/60 p-3">
                <p className="text-xs text-muted-foreground">Alertas</p>
                <p className="mt-1 text-lg font-semibold">{atRiskStudents.length}</p>
              </div>
              <div className="rounded-xl bg-secondary/60 p-3">
                <p className="text-xs text-muted-foreground">Atrasos</p>
                <p className="mt-1 text-lg font-semibold">{overdueTasks}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-5 xl:grid-cols-4">
        <MetricCard
          title="Alunos na turma"
          value={String(students.length)}
          subtitle={`${atRiskStudents.length} precisam de atencao`}
          progress={Math.round(((students.length - atRiskStudents.length) / students.length) * 100)}
          icon={Users}
          color="#2563EB"
        />
        <MetricCard
          title="Presenca media"
          value={`${averageAttendance}%`}
          subtitle="consolidado da semana"
          progress={averageAttendance}
          icon={UserCheck}
          color="#10B981"
        />
        <MetricCard
          title="Entrega de tarefas"
          value={`${completedTaskRate}%`}
          subtitle={`${pendingTasks} pendentes, ${overdueTasks} atrasadas`}
          progress={completedTaskRate}
          icon={CheckCircle2}
          color="#F59E0B"
        />
        <MetricCard
          title="Progresso medio"
          value={`${averageProgress}%`}
          subtitle="andamento da trilha"
          progress={averageProgress}
          icon={TrendingUp}
          color="#EC4899"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Prioridades da semana</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Uma leitura executiva para decidir onde atuar primeiro com a turma.
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Atualizado hoje</span>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-secondary/60 p-4">
                <AlertTriangle size={18} className="mb-3 text-destructive" />
                <p className="text-sm font-medium">{atRiskStudents.length} alunos com risco</p>
                <p className="mt-1 text-xs text-muted-foreground">baixa presenca, atraso ou pouco progresso</p>
              </div>
              <div className="rounded-xl bg-secondary/60 p-4">
                <HeartPulse size={18} className="mb-3 text-primary" />
                <p className="text-sm font-medium">Engajamento da turma</p>
                <p className="mt-1 text-xs text-muted-foreground">{formatEmotionSummary()}</p>
              </div>
              <div className="rounded-xl bg-secondary/60 p-4">
                <BookOpen size={18} className="mb-3 text-primary" />
                <p className="text-sm font-medium">{teacherTimeline.length} marcos proximos</p>
                <p className="mt-1 text-xs text-muted-foreground">aulas, revisoes e entregas mapeadas</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Alunos com risco</h2>
                <p className="mt-1 text-sm text-muted-foreground">Quem precisa de intervencao ou acompanhamento mais proximo.</p>
              </div>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs text-destructive">{atRiskStudents.length} alertas</span>
            </div>

            <div className="space-y-3">
              {atRiskStudents.map((student) => (
                <article
                  key={student.id}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                    {student.avatar}
                  </div>

                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="text-sm font-semibold">{student.name}</h3>
                      <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs text-destructive">atencao</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Presenca {student.attendanceRate}% • Progresso {student.progressRate}% • {student.overdueTasks} atrasada(s)
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Ultimo check-in</p>
                    <p className="text-sm font-medium">
                      {emotionEmoji[student.lastEmotion]} {emotionLabels[student.lastEmotion]}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Proximas aulas e marcos</h2>
                <p className="mt-1 text-sm text-muted-foreground">Linha do tempo curta para orientar as proximas decisoes da turma.</p>
              </div>
            </div>

            <div className="space-y-3">
              {teacherTimeline.map((event) => (
                <article
                  key={event.id}
                  className="grid grid-cols-[96px_minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border p-4"
                >
                  <div className="rounded-lg bg-primary/10 px-3 py-3 text-center">
                    <p className="text-sm font-semibold text-primary">{event.dateLabel}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{event.time}</p>
                  </div>

                  <div className="min-w-0">
                    <h3 className="mb-1 text-sm font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">Tipo: {event.type}</p>
                  </div>

                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">{event.type}</span>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <h2 className="mb-3 text-base font-semibold">Presenca da semana</h2>
            <div className="space-y-3">
              {students.slice(0, 4).map((student) => (
                <div key={student.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>{student.name}</span>
                    <span className="text-muted-foreground">{student.attendanceRate}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/70">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${student.attendanceRate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-2 text-base font-semibold">Humor e engajamento</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              O sentimento dominante da turma hoje e <span className="font-medium text-foreground">{formatEmotionSummary()}</span>.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(['motivado', 'normal', 'confuso', 'cansado'] as const).map((emotionKey) => {
                const count = students.filter((student) => student.lastEmotion === emotionKey).length;
                return (
                  <div key={emotionKey} className="rounded-lg bg-secondary/60 px-3 py-3 text-center">
                    <p className="mb-1 text-lg">{emotionEmoji[emotionKey]}</p>
                    <p className="text-xs font-medium">{emotionLabels[emotionKey]}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{count} aluno(s)</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold">Proxima acao operacional</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A lista de alunos agora esta pronta para drill-down. O proximo passo e usar filtros para separar quem precisa de intervencao imediata.
            </p>
            <Link to="/professor/alunos" className="mt-3 inline-flex text-sm font-medium text-primary">
              Abrir lista de alunos
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
