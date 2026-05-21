import { ReactNode } from 'react';
import { BookOpen, Calendar, CheckSquare, Heart, LayoutDashboard, MessageCircle, Settings } from 'lucide-react';

export type AppView = 'dashboard' | 'classes' | 'attendance' | 'tasks' | 'emotion' | 'chat' | 'settings';

interface MenuItem {
  icon: ReactNode;
  label: string;
  view: AppView;
}

interface SidebarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const menuItems: MenuItem[] = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', view: 'dashboard' },
    { icon: <BookOpen size={20} />, label: 'Aulas', view: 'classes' },
    { icon: <Calendar size={20} />, label: 'Presença', view: 'attendance' },
    { icon: <CheckSquare size={20} />, label: 'Tarefas', view: 'tasks' },
    { icon: <Heart size={20} />, label: 'Emotion', view: 'emotion' },
    { icon: <MessageCircle size={20} />, label: 'Chat IA', view: 'chat' },
    { icon: <Settings size={20} />, label: 'Configurações', view: 'settings' },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>ClassRoom AI</h1>
        <p className="text-sm text-muted-foreground mt-1">Sistema da Turma</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onNavigate(item.view)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              activeView === item.view
                ? 'bg-primary text-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            L
          </div>
          <div className="flex-1">
            <p className="font-medium">Lucas</p>
            <p className="text-xs text-muted-foreground">Nível 12 • 2.450 XP</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
