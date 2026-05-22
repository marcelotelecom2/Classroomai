import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AppShell } from './components/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { ClassesPage } from './pages/ClassesPage';
import { AttendancePage } from './pages/AttendancePage';
import { TasksPage } from './pages/TasksPage';
import { EmotionPage } from './pages/EmotionPage';
import { ChatPage } from './pages/ChatPage';
import { SettingsPage } from './pages/SettingsPage';
import { TeacherShell } from './components/TeacherShell';
import { TeacherDashboardPage } from './pages/TeacherDashboardPage';
import { TeacherStudentsPage } from './pages/TeacherStudentsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="/aulas" element={<ClassesPage />} />
          <Route path="/presenca" element={<AttendancePage />} />
          <Route path="/tarefas" element={<TasksPage />} />
          <Route path="/emotion" element={<EmotionPage />} />
          <Route path="/chat-ia" element={<ChatPage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />
        </Route>
        <Route path="/professor" element={<TeacherShell />}>
          <Route index element={<TeacherDashboardPage />} />
          <Route path="alunos" element={<TeacherStudentsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
