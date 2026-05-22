import { EmotionState, students } from './classroomData';

export type LessonStatus = 'ao vivo' | 'amanha' | 'gravada' | 'concluida';
export type MaterialStatus = 'nao iniciado' | 'em andamento' | 'concluido';
export type StudentTaskStatus = 'atrasada' | 'em andamento' | 'entregue';

export interface LessonRecord {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  status: LessonStatus;
  progress: number;
  materialStatus: MaterialStatus;
  module: string;
  description: string;
  nextAction: string;
}

export interface StudentTaskRecord {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: StudentTaskStatus;
  priority: 'alta' | 'media' | 'baixa';
  estimatedTime: string;
  description: string;
  checklist: string[];
}

export interface AttendanceEntry {
  label: string;
  studentRate: number;
  classRate: number;
  presenceCount: string;
}

export interface EmotionEntry {
  label: string;
  emotion: EmotionState;
  energyLevel: 'alta' | 'estavel' | 'baixa';
  note: string;
}

export const studentProfile = {
  name: 'Lucas',
  avatar: 'LC',
  level: 12,
  xp: 2400,
  completedLessons: 12,
  totalLessons: 20,
  deliveredTasks: 15,
  totalTasks: 18,
};

export const lessons: LessonRecord[] = [
  {
    id: 1,
    title: 'Fundamentos de Machine Learning',
    category: 'Machine Learning',
    date: '18 Mai',
    time: '14:00',
    duration: '90 min',
    status: 'amanha',
    progress: 0,
    materialStatus: 'nao iniciado',
    module: 'Modulo 3',
    description: 'Introducao aos conceitos de treinamento supervisionado e preparacao de dados.',
    nextAction: 'Separar 20 minutos para revisar os conceitos-base antes do encontro.',
  },
  {
    id: 2,
    title: 'Redes Neurais e Deep Learning',
    category: 'Deep Learning',
    date: '19 Mai',
    time: '14:00',
    duration: '120 min',
    status: 'ao vivo',
    progress: 35,
    materialStatus: 'em andamento',
    module: 'Modulo 4',
    description: 'Aula ao vivo com foco em redes neurais densas, ajustes de hiperparametros e erros comuns.',
    nextAction: 'Continuar do minuto 42 e revisar o notebook da aula antes do exercicio.',
  },
  {
    id: 3,
    title: 'Processamento de Linguagem Natural',
    category: 'NLP',
    date: '20 Mai',
    time: '14:00',
    duration: '100 min',
    status: 'gravada',
    progress: 68,
    materialStatus: 'em andamento',
    module: 'Modulo 5',
    description: 'Visao geral de embeddings, tokenizacao e pipelines de NLP aplicados ao projeto final.',
    nextAction: 'Retomar do bloco sobre embeddings e fechar o resumo do modulo.',
  },
  {
    id: 4,
    title: 'Prompt Engineering para APIs',
    category: 'Ferramentas',
    date: '14 Mai',
    time: '10:00',
    duration: '75 min',
    status: 'concluida',
    progress: 100,
    materialStatus: 'concluido',
    module: 'Modulo 2',
    description: 'Boas praticas para estruturar prompts, avaliar respostas e iterar com APIs de IA.',
    nextAction: 'Revisar apenas se precisar reforcar conceitos de integracao.',
  },
];

export const taskRecords: StudentTaskRecord[] = [
  {
    id: 1,
    title: 'Implementar modelo de classificacao',
    course: 'Machine Learning',
    dueDate: 'Hoje',
    status: 'em andamento',
    priority: 'alta',
    estimatedTime: '50 min',
    description: 'Finalizar o pipeline de treino e validar a matriz de confusao do modelo.',
    checklist: ['Revisar dataset', 'Rodar treino final', 'Comparar metricas', 'Subir entrega'],
  },
  {
    id: 2,
    title: 'Analise de dataset de imagens',
    course: 'Visao Computacional',
    dueDate: '16 Mai',
    status: 'entregue',
    priority: 'media',
    estimatedTime: 'Concluida',
    description: 'Entrega de exploracao inicial do dataset e primeiros insights visuais.',
    checklist: ['Explorar classes', 'Identificar desbalanceamento', 'Documentar achados'],
  },
  {
    id: 3,
    title: 'Projeto final - Chatbot com IA',
    course: 'NLP',
    dueDate: '25 Mai',
    status: 'em andamento',
    priority: 'alta',
    estimatedTime: '90 min',
    description: 'Estruturar o fluxo principal do chatbot e validar o entendimento de intencoes.',
    checklist: ['Definir fluxo', 'Mapear intents', 'Montar resposta base', 'Revisar UX'],
  },
  {
    id: 4,
    title: 'Exercicios de regressao linear',
    course: 'Machine Learning',
    dueDate: '15 Mai',
    status: 'atrasada',
    priority: 'alta',
    estimatedTime: '35 min',
    description: 'Fechar a lista de regressao linear e revisar os erros de interpretacao encontrados.',
    checklist: ['Responder questoes 3 a 5', 'Validar formula', 'Enviar atividade'],
  },
];

export const attendanceHistory: AttendanceEntry[] = [
  { label: 'Sem 1', studentRate: 100, classRate: 89, presenceCount: '4/4 aulas' },
  { label: 'Sem 2', studentRate: 75, classRate: 84, presenceCount: '3/4 aulas' },
  { label: 'Sem 3', studentRate: 100, classRate: 86, presenceCount: '4/4 aulas' },
  { label: 'Sem 4', studentRate: 92, classRate: 88, presenceCount: '11/12 aulas' },
];

export const emotionHistory: EmotionEntry[] = [
  { label: 'Seg', emotion: 'motivado', energyLevel: 'alta', note: 'Entrou bem no ritmo do modulo atual.' },
  { label: 'Ter', emotion: 'normal', energyLevel: 'estavel', note: 'Manteve consistencia nas entregas do dia.' },
  { label: 'Qua', emotion: 'confuso', energyLevel: 'baixa', note: 'Travou em um conceito novo de NLP.' },
  { label: 'Qui', emotion: 'normal', energyLevel: 'estavel', note: 'Recuperou o foco apos revisar o material.' },
  { label: 'Hoje', emotion: 'normal', energyLevel: 'estavel', note: 'Pronto para seguir sem sinais de sobrecarga.' },
];

export const quickChatPrompts = [
  'Me explique o que falta para eu fechar a tarefa mais urgente.',
  'Resuma a aula de Redes Neurais em 5 pontos.',
  'Monte um plano de estudo de 30 minutos para hoje.',
  'Quais conceitos eu devo revisar antes da proxima aula?',
];

export function getCurrentStudent() {
  return students.find((student) => student.id === 1) ?? students[0];
}

export function getStudentTaskCounts(tasks = taskRecords) {
  return {
    overdue: tasks.filter((task) => task.status === 'atrasada').length,
    inProgress: tasks.filter((task) => task.status === 'em andamento').length,
    delivered: tasks.filter((task) => task.status === 'entregue').length,
  };
}

export function getLessonCounts(records = lessons) {
  return {
    live: records.filter((lesson) => lesson.status === 'ao vivo').length,
    upcoming: records.filter((lesson) => lesson.status === 'amanha').length,
    recorded: records.filter((lesson) => lesson.status === 'gravada').length,
    completed: records.filter((lesson) => lesson.status === 'concluida').length,
  };
}
