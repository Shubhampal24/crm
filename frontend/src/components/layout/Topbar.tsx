import { useAuthStore } from '../../store/authStore';
import { Bell, LogOut, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Topbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 shadow-sm z-10">
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell size={20} />
        </button>
        
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900 leading-tight">{user?.email || 'Loading...'}</p>
            <p className="text-xs text-gray-500">{user?.role || 'Guest'}</p>
          </div>
          <div className="h-9 w-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <UserIcon size={18} />
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="ml-2 text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
