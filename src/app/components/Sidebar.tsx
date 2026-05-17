import {
  LayoutDashboard,
  BookOpen,
  UserCheck,
  ClipboardList,
  Smile,
  MessageSquare,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem = 'Dashboard' }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: BookOpen, label: 'Aulas' },
    { icon: UserCheck, label: 'Presença' },
    { icon: ClipboardList, label: 'Tarefas' },
    { icon: Smile, label: 'Emotion' },
    { icon: MessageSquare, label: 'Chat IA' },
    { icon: Settings, label: 'Configurações' },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-semibold text-primary">ClassRoom AI</h1>
        <p className="text-sm text-muted-foreground mt-1">Sistema da Turma</p>
      </div>

      <nav className="flex-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.label === activeItem;

          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            LC
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Lucas</p>
            <p className="text-xs text-muted-foreground">Level 12 - 2.400 XP</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
