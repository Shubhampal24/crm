import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function MainLayout() {
  const { user, accessToken } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  if (!user || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden text-gray-900">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
