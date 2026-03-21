import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', present: 95, absent: 5 },
  { name: 'Feb', present: 92, absent: 8 },
  { name: 'Mar', present: 96, absent: 4 },
  { name: 'Apr', present: 88, absent: 12 },
  { name: 'May', present: 94, absent: 6 },
];

export function Reports() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Reports & Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">Average Attendance</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">93.2%</div>
            <p className="text-sm text-green-600 mt-1">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">Total Classes</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">1,245</div>
            <p className="text-sm text-gray-500 mt-1">This term</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">Active Staff</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">48</div>
            <p className="text-sm text-gray-500 mt-1">Teachers & Admins</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="present" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Present %" />
                <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} name="Absent %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
