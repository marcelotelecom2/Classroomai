import {
  currentStudentId,
  emotionEmoji,
  emotionEnergy,
  emotionLabels,
  EmotionState,
  students,
} from './classroomData';

type ComparisonBand = 'acima da media' | 'na media' | 'abaixo da media';

interface ComparisonMetric {
  key: 'presenca' | 'progresso' | 'xp' | 'tarefas-pendentes' | 'tarefas-atrasadas' | 'comportamento';
  label: string;
  studentValue: string;
  groupValue: string;
  band: ComparisonBand;
  summary: string;
}

interface ComparisonHighlight {
  title: string;
  description: string;
  band: ComparisonBand;
}

export interface StudentComparisonSnapshot {
  highlights: ComparisonHighlight[];
  metrics: ComparisonMetric[];
  groupMood: string;
  energySummary: string;
}

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function round(value: number) {
  return Math.round(value * 10) / 10;
}

function compareHigherIsBetter(studentValue: number, groupAverage: number): ComparisonBand {
  if (studentValue >= groupAverage + 3) return 'acima da media';
  if (studentValue <= groupAverage - 3) return 'abaixo da media';
  return 'na media';
}

function compareLowerIsBetter(studentValue: number, groupAverage: number): ComparisonBand {
  if (studentValue <= groupAverage - 0.5) return 'acima da media';
  if (studentValue >= groupAverage + 0.5) return 'abaixo da media';
  return 'na media';
}

function formatBandPrefix(band: ComparisonBand) {
  if (band === 'acima da media') return 'acima da media da turma';
  if (band === 'abaixo da media') return 'abaixo da media da turma';
  return 'dentro da media da turma';
}

function getDominantEmotion() {
  const emotionCount = students.reduce<Record<EmotionState, number>>(
    (acc, student) => {
      acc[student.lastEmotion] += 1;
      return acc;
    },
    {
      motivado: 0,
      normal: 0,
      confuso: 0,
      cansado: 0,
      empolgado: 0,
    }
  );

  return (Object.entries(emotionCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'normal') as EmotionState;
}

function getEnergyBand(studentEmotion: EmotionState, dominantEmotion: EmotionState) {
  const delta = emotionEnergy[studentEmotion] - emotionEnergy[dominantEmotion];
  if (delta >= 1) return 'mais alta';
  if (delta <= -1) return 'mais baixa';
  return 'alinhada';
}

export function getBandStyles(band: ComparisonBand) {
  if (band === 'acima da media') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  }

  if (band === 'abaixo da media') {
    return 'bg-amber-50 text-amber-700 border-amber-200';
  }

  return 'bg-slate-100 text-slate-700 border-slate-200';
}

export function getStudentComparisonSnapshot(): StudentComparisonSnapshot {
  const currentStudent = students.find((student) => student.id === currentStudentId);

  if (!currentStudent) {
    throw new Error('Current student not found in classroom data.');
  }

  const attendanceAverage = average(students.map((student) => student.attendanceRate));
  const progressAverage = average(students.map((student) => student.progressRate));
  const xpAverage = average(students.map((student) => student.xp));
  const pendingAverage = average(students.map((student) => student.pendingTasks));
  const overdueAverage = average(students.map((student) => student.overdueTasks));
  const dominantEmotion = getDominantEmotion();
  const energyBand = getEnergyBand(currentStudent.lastEmotion, dominantEmotion);

  const attendanceBand = compareHigherIsBetter(currentStudent.attendanceRate, attendanceAverage);
  const progressBand = compareHigherIsBetter(currentStudent.progressRate, progressAverage);
  const xpBand = compareHigherIsBetter(currentStudent.xp, xpAverage);
  const pendingBand = compareLowerIsBetter(currentStudent.pendingTasks, pendingAverage);
  const overdueBand = compareLowerIsBetter(currentStudent.overdueTasks, overdueAverage);
  const behaviorBand =
    energyBand === 'alinhada'
      ? 'na media'
      : energyBand === 'mais alta'
        ? 'acima da media'
        : 'abaixo da media';

  return {
    highlights: [
      {
        title: 'Presenca',
        description: `Sua presenca esta ${formatBandPrefix(attendanceBand)}.`,
        band: attendanceBand,
      },
      {
        title: 'Progresso',
        description: `Seu ritmo de progresso esta ${formatBandPrefix(progressBand)}.`,
        band: progressBand,
      },
      {
        title: 'Entregas',
        description:
          overdueBand === 'acima da media'
            ? 'Seu volume de tarefas atrasadas esta melhor que a media recente da turma.'
            : overdueBand === 'abaixo da media'
              ? 'Seu volume de tarefas atrasadas esta acima do ideal em relacao ao grupo.'
              : 'Seu ritmo de entregas esta proximo da media recente da turma.',
        band: overdueBand,
      },
      {
        title: 'Engajamento',
        description:
          energyBand === 'alinhada'
            ? 'Seu check-in recente esta alinhado com o clima predominante da turma.'
            : `Seu check-in recente mostra uma energia ${energyBand} que o padrao atual da turma.`,
        band: behaviorBand,
      },
    ],
    metrics: [
      {
        key: 'presenca',
        label: 'Presenca',
        studentValue: `${currentStudent.attendanceRate}%`,
        groupValue: `${round(attendanceAverage)}%`,
        band: attendanceBand,
        summary: `Sua frequencia esta ${formatBandPrefix(attendanceBand)}.`,
      },
      {
        key: 'progresso',
        label: 'Progresso',
        studentValue: `${currentStudent.progressRate}%`,
        groupValue: `${round(progressAverage)}%`,
        band: progressBand,
        summary: `Seu andamento de trilha esta ${formatBandPrefix(progressBand)}.`,
      },
      {
        key: 'xp',
        label: 'XP',
        studentValue: currentStudent.xp.toLocaleString('pt-BR'),
        groupValue: round(xpAverage).toLocaleString('pt-BR'),
        band: xpBand,
        summary: `Seu acumulado de XP esta ${formatBandPrefix(xpBand)}.`,
      },
      {
        key: 'tarefas-pendentes',
        label: 'Tarefas pendentes',
        studentValue: `${currentStudent.pendingTasks}`,
        groupValue: `${round(pendingAverage)}`,
        band: pendingBand,
        summary:
          pendingBand === 'acima da media'
            ? 'Voce tem menos tarefas pendentes que a media da turma.'
            : pendingBand === 'abaixo da media'
              ? 'Voce tem mais tarefas pendentes que o ritmo medio da turma.'
              : 'Seu volume de tarefas pendentes esta estavel em relacao ao grupo.',
      },
      {
        key: 'tarefas-atrasadas',
        label: 'Tarefas atrasadas',
        studentValue: `${currentStudent.overdueTasks}`,
        groupValue: `${round(overdueAverage)}`,
        band: overdueBand,
        summary:
          overdueBand === 'acima da media'
            ? 'Seu numero de atrasos esta melhor que a media recente do grupo.'
            : overdueBand === 'abaixo da media'
              ? 'Seu numero de atrasos pede atencao em relacao ao grupo.'
              : 'Seu numero de atrasos esta dentro do comportamento medio da turma.',
      },
      {
        key: 'comportamento',
        label: 'Comportamento',
        studentValue: `${emotionEmoji[currentStudent.lastEmotion]} ${emotionLabels[currentStudent.lastEmotion]}`,
        groupValue: `${emotionEmoji[dominantEmotion]} ${emotionLabels[dominantEmotion]}`,
        band: behaviorBand,
        summary:
          energyBand === 'alinhada'
            ? 'Seu check-in esta alinhado com a energia predominante da turma.'
            : `Seu check-in mostra uma energia ${energyBand} que o padrao recente da turma.`,
      },
    ],
    groupMood: `A turma esta majoritariamente em estado ${emotionLabels[dominantEmotion].toLowerCase()}.`,
    energySummary:
      energyBand === 'alinhada'
        ? 'Seu check-in acompanha o clima geral recente da turma.'
        : `Seu check-in indica uma energia ${energyBand} que o clima predominante recente.`,
  };
}
