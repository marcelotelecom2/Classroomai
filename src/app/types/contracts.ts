import { EmotionState, StudentRecord } from '../data/classroomData';
import { AttendanceEntry, EmotionEntry, LessonRecord, StudentTaskRecord } from '../data/learningData';

export interface StudentOverviewContract {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  attendanceRate: number;
  completedLessons: number;
  totalLessons: number;
  deliveredTasks: number;
  totalTasks: number;
  currentLessonTitle: string;
  currentTaskTitle: string;
}

export interface TeacherClassOverviewContract {
  totalStudents: number;
  averageAttendance: number;
  averageProgress: number;
  pendingTasks: number;
  overdueTasks: number;
  atRiskStudentIds: number[];
  dominantEmotion: EmotionState;
}

export interface LessonDetailContract extends LessonRecord {}

export interface TaskDetailContract extends StudentTaskRecord {}

export interface AttendanceHistoryContract {
  items: AttendanceEntry[];
}

export interface EmotionHistoryContract {
  items: EmotionEntry[];
}

export interface AppPreferencesContract {
  emailNotifications: boolean;
  taskReminders: boolean;
  weeklySummary: boolean;
  compactMode: boolean;
}

export interface ChatMessageContract {
  id: number;
  role: 'assistant' | 'user';
  content: string;
}

export interface TeacherStudentsContract {
  items: StudentRecord[];
}
