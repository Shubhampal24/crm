import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        const { user, accessToken } = response.data.data;
        setAuth(user, accessToken);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h2 className="text-3xl font-extrabold text-blue-600 tracking-tight">
          School CRM
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access your dashboard
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-lg border-0 shadow-gray-200/50">
          <CardHeader>
            <CardTitle className="text-center text-xl">Sign in to your account</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm font-medium">
                {error}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleLogin}>
              <Input
                label="Email address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@school.com"
              />
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
