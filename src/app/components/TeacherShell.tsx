import { Outlet } from 'react-router';
import { TeacherSidebar } from './TeacherSidebar';

export function TeacherShell() {
  return (
    <div className="flex h-screen bg-background">
      <TeacherSidebar />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
