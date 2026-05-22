import {
  currentStudentId,
  emotionLabels,
  EmotionState,
  students,
  teacherTimeline,
} from '../data/classroomData';
import {
  attendanceHistory,
  emotionHistory as defaultEmotionHistory,
  getCurrentStudent,
  getLessonCounts,
  getStudentTaskCounts,
  lessons,
  quickChatPrompts,
  studentProfile,
  taskRecords as defaultTaskRecords,
} from '../data/learningData';
import type {
  AppPreferencesContract,
  AttendanceHistoryContract,
  ChatMessageContract,
  EmotionHistoryContract,
  StudentOverviewContract,
  TaskDetailContract,
  TeacherClassOverviewContract,
  TeacherStudentsContract,
} from '../types/contracts';

const STORAGE_KEYS = {
  chatMessages: 'classroom-ai.chat-messages',
  emotionHistory: 'classroom-ai.emotion-history',
  preferences: 'classroom-ai.preferences',
  tasks: 'classroom-ai.tasks',
} as const;

const defaultPreferences: AppPreferencesContract = {
  emailNotifications: true,
  taskReminders: true,
  weeklySummary: false,
  compactMode: true,
};

const defaultChatMessages: ChatMessageContract[] = [
  {
    id: 1,
    role: 'assistant',
    content: 'Oi, Lucas. Posso resumir aulas, organizar suas tarefas ou montar um plano rapido para hoje.',
  },
];

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readStorage<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  const rawValue = window.localStorage.getItem(key);
  if (!rawValue) return fallback;

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getDominantEmotion() {
  const history = getEmotionHistory().items;
  const counts = history.reduce<Record<EmotionState, number>>(
    (acc, entry) => {
      acc[entry.emotion] += 1;
      return acc;
    },
    { motivado: 0, normal: 0, confuso: 0, cansado: 0, empolgado: 0 }
  );

  return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'normal') as EmotionState;
}

function getEmotionNote(emotion: EmotionState) {
  switch (emotion) {
    case 'motivado':
      return 'Sinal de boa energia para avancar em conteudos novos e fechar uma entrega importante.';
    case 'confuso':
      return 'Momento bom para reduzir carga nova e buscar uma explicacao objetiva antes de seguir.';
    case 'cansado':
      return 'Vale focar em uma tarefa menor, revisar material e evitar acumulo de contexto.';
    case 'empolgado':
      return 'Aproveite a energia alta para destravar uma tarefa mais complexa ou avancar no projeto.';
    default:
      return 'Estado estavel para manter ritmo consistente nas proximas atividades.';
  }
}

function cloneTasks() {
  return defaultTaskRecords.map((task) => ({ ...task, checklist: [...task.checklist] }));
}

function cloneEmotionHistory() {
  return defaultEmotionHistory.map((entry) => ({ ...entry }));
}

export const appDataService = {
  getStudentOverview(): StudentOverviewContract {
    const taskCounts = getStudentTaskCounts(this.getTasks());
    const currentStudent = getCurrentStudent();
    const currentLesson = lessons.find((lesson) => lesson.status === 'ao vivo') ?? lessons[0];
    const currentTask = this.getTasks().find((task) => task.status === 'atrasada') ?? this.getTasks()[0];

    return {
      name: studentProfile.name,
      avatar: studentProfile.avatar,
      level: studentProfile.level,
      xp: studentProfile.xp,
      attendanceRate: currentStudent.attendanceRate,
      completedLessons: studentProfile.completedLessons,
      totalLessons: studentProfile.totalLessons,
      deliveredTasks: studentProfile.totalTasks - (taskCounts.inProgress + taskCounts.overdue),
      totalTasks: studentProfile.totalTasks,
      currentLessonTitle: currentLesson.title,
      currentTaskTitle: currentTask?.title ?? 'Sem tarefa urgente',
    };
  },

  getTeacherClassOverview(): TeacherClassOverviewContract {
    const taskCounts = getStudentTaskCounts(this.getTasks());
    const averageAttendance = Math.round(students.reduce((sum, student) => sum + student.attendanceRate, 0) / students.length);
    const averageProgress = Math.round(students.reduce((sum, student) => sum + student.progressRate, 0) / students.length);
    const pendingTasks = students.reduce((sum, student) => sum + student.pendingTasks, 0);

    return {
      totalStudents: students.length,
      averageAttendance,
      averageProgress,
      pendingTasks,
      overdueTasks: taskCounts.overdue,
      atRiskStudentIds: students
        .filter((student) => student.attendanceRate < 85 || student.overdueTasks > 0 || student.progressRate < 55)
        .map((student) => student.id),
      dominantEmotion: getDominantEmotion(),
    };
  },

  getLessons() {
    return lessons.map((lesson) => ({ ...lesson }));
  },

  getLessonCounts() {
    return getLessonCounts(this.getLessons());
  },

  getTasks(): TaskDetailContract[] {
    return readStorage(STORAGE_KEYS.tasks, cloneTasks());
  },

  saveTasks(tasks: TaskDetailContract[]) {
    writeStorage(STORAGE_KEYS.tasks, tasks);
  },

  updateTaskStatus(taskId: number, status: TaskDetailContract['status']) {
    const updatedTasks = this.getTasks().map((task) => (task.id === taskId ? { ...task, status } : task));
    this.saveTasks(updatedTasks);
    return updatedTasks;
  },

  getTaskCounts(tasks = this.getTasks()) {
    return getStudentTaskCounts(tasks);
  },

  getAttendanceHistory(): AttendanceHistoryContract {
    return { items: attendanceHistory.map((entry) => ({ ...entry })) };
  },

  getEmotionHistory(): EmotionHistoryContract {
    return { items: readStorage(STORAGE_KEYS.emotionHistory, cloneEmotionHistory()) };
  },

  saveEmotionCheck(emotion: EmotionState) {
    const currentHistory = this.getEmotionHistory().items.filter((entry) => entry.label !== 'Hoje');
    const nextHistory = [
      ...currentHistory.slice(-4),
      {
        label: 'Hoje',
        emotion,
        energyLevel:
          emotion === 'motivado' || emotion === 'empolgado'
            ? 'alta'
            : emotion === 'normal'
              ? 'estavel'
              : 'baixa',
        note: getEmotionNote(emotion),
      },
    ];

    writeStorage(STORAGE_KEYS.emotionHistory, nextHistory);
    return { items: nextHistory };
  },

  getPreferences(): AppPreferencesContract {
    return readStorage(STORAGE_KEYS.preferences, defaultPreferences);
  },

  savePreferences(preferences: AppPreferencesContract) {
    writeStorage(STORAGE_KEYS.preferences, preferences);
    return preferences;
  },

  getChatMessages(): ChatMessageContract[] {
    return readStorage(STORAGE_KEYS.chatMessages, defaultChatMessages);
  },

  saveChatMessages(messages: ChatMessageContract[]) {
    writeStorage(STORAGE_KEYS.chatMessages, messages);
    return messages;
  },

  getQuickChatPrompts() {
    return [...quickChatPrompts];
  },

  getTeacherStudents(): TeacherStudentsContract {
    return { items: students.map((student) => ({ ...student })) };
  },

  getTeacherTimeline() {
    return teacherTimeline.map((event) => ({ ...event }));
  },

  getCurrentStudentId() {
    return currentStudentId;
  },

  getEmotionLabel(emotion: EmotionState) {
    return emotionLabels[emotion];
  },
};
