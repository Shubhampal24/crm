import { useAuthStore } from '../../store/authStore';
import { Card, CardContent } from '../../components/ui/Card';
import { Users, GraduationCap, CheckCircle, AlertTriangle } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuthStore();

  const stats = [
    { label: 'Total Students', value: '1,248', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Teachers', value: '84', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: 'Today Attendance', value: '94.5%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Active Complaints', value: '12', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Welcome back, {user?.role || 'User'}!</h1>
        <p className="text-gray-500">Here's what's happening at your school today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className={`p-4 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-96">
          <CardContent className="p-6 flex flex-col items-center justify-center h-full text-gray-500">
            <p>Recent Activities Chart will appear here</p>
          </CardContent>
        </Card>
        <Card className="h-96">
          <CardContent className="p-6 flex flex-col items-center justify-center h-full text-gray-500">
            <p>Upcoming Events Calendar will appear here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
