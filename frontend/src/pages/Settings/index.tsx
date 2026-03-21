import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuthStore } from '../../store/authStore';

export function Settings() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Email Address" value={user?.email || ''} readOnly disabled />
            <Input label="Role" value={user?.role || ''} readOnly disabled />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Current Password" type="password" />
          <Input label="New Password" type="password" />
          <Input label="Confirm New Password" type="password" />
          <Button>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
