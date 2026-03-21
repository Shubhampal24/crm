import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, UserCog, CalendarCheck, 
  CalendarDays, BarChart3, AlertCircle, Settings
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuthStore } from '../../store/authStore';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Students', path: '/students', icon: Users, roles: ['ADMIN', 'PRINCIPAL', 'STAFF'] },
  { name: 'Staff', path: '/staff', icon: UserCog, roles: ['ADMIN', 'PRINCIPAL'] },
  { name: 'Attendance', path: '/attendance', icon: CalendarCheck, roles: ['ADMIN', 'PRINCIPAL', 'STAFF'] },
  { name: 'Timetable', path: '/timetable', icon: CalendarDays },
  { name: 'Reports', path: '/reports', icon: BarChart3, roles: ['ADMIN', 'PRINCIPAL'] },
  { name: 'Complaints', path: '/complaints', icon: AlertCircle },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: (val: boolean) => void }) {
  const { user } = useAuthStore();
  const role = user?.role || 'STUDENT';

  const visibleItems = menuItems.filter(item => !item.roles || item.roles.includes(role));

  return (
    <aside className={cn("bg-gray-900 text-white transition-all duration-300 flex flex-col h-screen overflow-hidden", collapsed ? 'w-16' : 'w-64')}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
        {!collapsed && <span className="font-bold text-lg whitespace-nowrap overflow-hidden">School CRM</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-white p-1 rounded-md transition-colors">
          <LayoutDashboard size={20} />
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden space-y-1 px-2">
        {visibleItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors whitespace-nowrap",
              isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
            )}
          >
            <item.icon size={20} className="shrink-0" />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
