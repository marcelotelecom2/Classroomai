import { CalendarCheck2, TrendingUp, UserCheck } from 'lucide-react';
import { appDataService } from '../services/appDataService';

function average(values: number[]) {
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

export function AttendancePage() {
  const overview = appDataService.getStudentOverview();
  const attendanceHistory = appDataService.getAttendanceHistory().items;
  const studentAverage = average(attendanceHistory.map((entry) => entry.studentRate));
  const classAverage = average(attendanceHistory.map((entry) => entry.classRate));
  const attendanceGap = studentAverage - classAverage;

  return (
    <div className="mx-auto max-w-[1440px] px-8 py-7">
      <header className="mb-7 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">Presenca</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe sua frequencia recente, compare com a turma e identifique semanas que pedem mais consistencia.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2">
              <CalendarCheck2 size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Meta atual</p>
              <p className="text-xs text-muted-foreground">Consistencia semanal</p>
            </div>
          </div>
          <p className="text-sm font-medium">Voce segue acima da media da turma</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Mantenha presenca em todas as aulas ao vivo desta semana para sustentar o ritmo.
          </p>
        </div>
      </header>

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Sua media</p>
          <p className="mt-2 text-2xl font-semibold">{studentAverage}%</p>
          <p className="mt-1 text-sm text-muted-foreground">presenca consolidada</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Turma</p>
          <p className="mt-2 text-2xl font-semibold">{classAverage}%</p>
          <p className="mt-1 text-sm text-muted-foreground">media recente do grupo</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Comparacao</p>
          <p className="mt-2 text-2xl font-semibold">{attendanceGap >= 0 ? `+${attendanceGap}` : attendanceGap} pts</p>
          <p className="mt-1 text-sm text-muted-foreground">em relacao a turma</p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Historico recente</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Veja como sua presenca ficou nas ultimas semanas em relacao ao ritmo medio da turma.
            </p>
          </div>

          <div className="space-y-4">
            {attendanceHistory.map((entry) => (
              <article key={entry.label} className="rounded-xl border border-border p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{entry.label}</p>
                    <p className="text-xs text-muted-foreground">{entry.presenceCount}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">
                    {entry.studentRate}% voce
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Sua frequencia</span>
                      <span>{entry.studentRate}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${entry.studentRate}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Media da turma</span>
                      <span>{entry.classRate}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${entry.classRate}%` }} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <UserCheck size={18} className="text-primary" />
              <h2 className="text-base font-semibold">Leitura do momento</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {overview.name} esta com boa consistencia de presenca e segue acima da media da turma na maior parte do periodo.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" />
              <h2 className="text-base font-semibold">Proxima acao</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              A semana 2 foi a mais fraca. Vale proteger os horarios das aulas ao vivo para evitar repetir essa queda.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
