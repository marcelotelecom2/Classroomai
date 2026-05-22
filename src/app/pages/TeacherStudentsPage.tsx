import { useMemo, useState } from 'react';
import { AlertTriangle, Search, UserCheck, Users } from 'lucide-react';
import { emotionEmoji, emotionLabels, students } from '../data/classroomData';

type RiskFilter = 'todos' | 'risco' | 'estaveis';

function isAtRisk(studentId: number) {
  const student = students.find((item) => item.id === studentId);
  if (!student) return false;
  return student.attendanceRate < 85 || student.overdueTasks > 0 || student.progressRate < 55;
}

function getRiskLabel(studentId: number) {
  return isAtRisk(studentId) ? 'atencao' : 'estavel';
}

export function TeacherStudentsPage() {
  const [query, setQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('todos');
  const [selectedStudentId, setSelectedStudentId] = useState<number>(students[0].id);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesQuery = student.name.toLowerCase().includes(query.toLowerCase());
      const matchesRisk =
        riskFilter === 'todos' ||
        (riskFilter === 'risco' && isAtRisk(student.id)) ||
        (riskFilter === 'estaveis' && !isAtRisk(student.id));
      return matchesQuery && matchesRisk;
    });
  }, [query, riskFilter]);

  const selectedStudent =
    filteredStudents.find((student) => student.id === selectedStudentId) ??
    students.find((student) => student.id === selectedStudentId) ??
    filteredStudents[0] ??
    students[0];

  const riskStudentsCount = students.filter((student) => isAtRisk(student.id)).length;

  return (
    <div className="mx-auto max-w-[1440px] px-8 py-7">
      <header className="mb-7 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">Lista de alunos</h1>
          <p className="text-sm text-muted-foreground">
            Um ponto operacional para buscar alunos, identificar risco e abrir uma leitura individual da turma.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2">
              <Users size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Panorama rapido</p>
              <p className="text-xs text-muted-foreground">monitoramento da turma</p>
            </div>
          </div>
          <p className="text-sm font-medium">{riskStudentsCount} alunos pedem atencao</p>
          <p className="mt-1 text-xs text-muted-foreground">Use a busca e os filtros para priorizar acompanhamento.</p>
        </div>
      </header>

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Alunos</p>
          <p className="mt-2 text-2xl font-semibold">{students.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">ativos na turma</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Em atencao</p>
          <p className="mt-2 text-2xl font-semibold">{riskStudentsCount}</p>
          <p className="mt-1 text-sm text-muted-foreground">com risco de atraso, presenca ou progresso</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Media da turma</p>
          <p className="mt-2 text-2xl font-semibold">
            {Math.round(students.reduce((sum, student) => sum + student.attendanceRate, 0) / students.length)}%
          </p>
          <p className="mt-1 text-sm text-muted-foreground">de presenca</p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Busca e filtros</h2>
              <p className="mt-1 text-sm text-muted-foreground">Selecione quem precisa de acompanhamento mais proximo.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['todos', 'risco', 'estaveis'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={riskFilter === filter}
                  onClick={() => setRiskFilter(filter)}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    riskFilter === filter ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <label className="mb-5 flex items-center gap-3 rounded-xl border border-border px-4 py-3">
            <Search size={16} className="text-muted-foreground" />
            <input
              aria-label="Buscar aluno"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nome"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>

          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <button
                key={student.id}
                type="button"
                onClick={() => setSelectedStudentId(student.id)}
                className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
                  selectedStudent.id === student.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-secondary/40'
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  {student.avatar}
                </div>

                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="text-sm font-semibold">{student.name}</p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] ${
                        isAtRisk(student.id) ? 'bg-red-50 text-destructive' : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {getRiskLabel(student.id)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Presenca {student.attendanceRate}% • Progresso {student.progressRate}% • {student.overdueTasks} atrasada(s)
                  </p>
                </div>

                <p className="text-sm font-medium">{emotionEmoji[student.lastEmotion]}</p>
              </button>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <UserCheck size={18} className="text-primary" />
              <h2 className="text-base font-semibold">Aluno selecionado</h2>
            </div>
            <p className="text-sm font-medium">{selectedStudent.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Ultimo check-in: {emotionEmoji[selectedStudent.lastEmotion]} {emotionLabels[selectedStudent.lastEmotion]}
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold">Leitura individual</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-lg bg-secondary/60 p-3">
                <p className="font-medium">Presenca</p>
                <p className="mt-1 text-muted-foreground">{selectedStudent.attendanceRate}%</p>
              </div>
              <div className="rounded-lg bg-secondary/60 p-3">
                <p className="font-medium">Progresso</p>
                <p className="mt-1 text-muted-foreground">{selectedStudent.progressRate}%</p>
              </div>
              <div className="rounded-lg bg-secondary/60 p-3">
                <p className="font-medium">Tarefas</p>
                <p className="mt-1 text-muted-foreground">
                  {selectedStudent.pendingTasks} pendentes • {selectedStudent.overdueTasks} atrasadas
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle size={18} className="text-primary" />
              <h2 className="text-base font-semibold">Proxima acao</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {isAtRisk(selectedStudent.id)
                ? `Vale acompanhar ${selectedStudent.name} de perto, com foco em presenca, progresso e tarefas atrasadas.`
                : `${selectedStudent.name} esta estavel. O melhor uso agora e manter acompanhamento leve e consistente.`}
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
