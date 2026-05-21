import { BookOpen, Calendar, CheckSquare, MessageCircle, Settings, LayoutDashboard, Heart } from 'lucide-react';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export function Sidebar() {
  const menuItems: MenuItem[] = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { icon: <BookOpen size={20} />, label: 'Aulas' },
    { icon: <Calendar size={20} />, label: 'Presença' },
    { icon: <CheckSquare size={20} />, label: 'Tarefas' },
    { icon: <Heart size={20} />, label: 'Emotion' },
    { icon: <MessageCircle size={20} />, label: 'Chat IA' },
    { icon: <Settings size={20} />, label: 'Configurações' },
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
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              item.active
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
