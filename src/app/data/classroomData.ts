export type EmotionState = 'motivado' | 'normal' | 'confuso' | 'cansado' | 'empolgado';
export type TaskStatus = 'entregue' | 'em andamento' | 'atrasada';

export interface StudentRecord {
  id: number;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  attendanceRate: number;
  progressRate: number;
  pendingTasks: number;
  overdueTasks: number;
  lastEmotion: EmotionState;
}

export interface ClassEvent {
  id: number;
  title: string;
  dateLabel: string;
  time: string;
  type: 'ao vivo' | 'revisao' | 'entrega';
}

export const students: StudentRecord[] = [
  {
    id: 1,
    name: 'Lucas',
    avatar: 'LC',
    level: 12,
    xp: 2400,
    attendanceRate: 92,
    progressRate: 60,
    pendingTasks: 2,
    overdueTasks: 1,
    lastEmotion: 'normal',
  },
  {
    id: 2,
    name: 'Marina',
    avatar: 'MR',
    level: 11,
    xp: 2210,
    attendanceRate: 95,
    progressRate: 74,
    pendingTasks: 1,
    overdueTasks: 0,
    lastEmotion: 'empolgado',
  },
  {
    id: 3,
    name: 'Rafael',
    avatar: 'RF',
    level: 10,
    xp: 1980,
    attendanceRate: 84,
    progressRate: 58,
    pendingTasks: 3,
    overdueTasks: 1,
    lastEmotion: 'confuso',
  },
  {
    id: 4,
    name: 'Bianca',
    avatar: 'BC',
    level: 9,
    xp: 1740,
    attendanceRate: 78,
    progressRate: 49,
    pendingTasks: 2,
    overdueTasks: 2,
    lastEmotion: 'cansado',
  },
  {
    id: 5,
    name: 'Henrique',
    avatar: 'HQ',
    level: 12,
    xp: 2530,
    attendanceRate: 97,
    progressRate: 82,
    pendingTasks: 0,
    overdueTasks: 0,
    lastEmotion: 'motivado',
  },
  {
    id: 6,
    name: 'Aline',
    avatar: 'AL',
    level: 8,
    xp: 1480,
    attendanceRate: 81,
    progressRate: 54,
    pendingTasks: 3,
    overdueTasks: 1,
    lastEmotion: 'normal',
  },
];

export const currentStudentId = 1;

export const teacherTimeline: ClassEvent[] = [
  { id: 1, title: 'Redes Neurais e Deep Learning', dateLabel: 'Hoje', time: '14:00', type: 'ao vivo' },
  { id: 2, title: 'Revisao de exercicios de regressao', dateLabel: 'Amanha', time: '10:00', type: 'revisao' },
  { id: 3, title: 'Entrega do mini projeto de NLP', dateLabel: '25 Mai', time: '23:59', type: 'entrega' },
];

export const emotionLabels: Record<EmotionState, string> = {
  motivado: 'Motivado',
  normal: 'Normal',
  confuso: 'Confuso',
  cansado: 'Cansado',
  empolgado: 'Empolgado',
};

export const emotionEmoji: Record<EmotionState, string> = {
  motivado: '\u{1F642}',
  normal: '\u{1F610}',
  confuso: '\u{1F615}',
  cansado: '\u{1F634}',
  empolgado: '\u{1F680}',
};

export const emotionEnergy: Record<EmotionState, number> = {
  cansado: 1,
  confuso: 2,
  normal: 3,
  motivado: 4,
  empolgado: 5,
};
