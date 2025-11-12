import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { FileText, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const success = login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  const sampleCredentials = [
    { role: 'Faculty', email: 'faculty1@uni.edu', password: 'Faculty123!' },
    { role: 'Dept Head', email: 'depthead@uni.edu', password: 'Head123!' },
    { role: 'Dean', email: 'dean@uni.edu', password: 'Dean123!' },
    { role: 'CITL Director', email: 'citl@uni.edu', password: 'CITL123!' },
    { role: 'VPAA', email: 'vpaa@uni.edu', password: 'VPAA123!' },
    { role: 'Admin', email: 'admin@uni.edu', password: 'Admin123!' },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-4" style={{ backgroundColor: '#F4F7FB' }}>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          {/* Branding */}
          <div className="flex items-center justify-center gap-3">
            <FileText className="h-12 w-12" style={{ color: '#2E63B8' }} />
            <div className="text-left">
              <h1 className="text-4xl" style={{ color: '#2E63B8' }}>Syllabo</h1>
              <p className="text-xs" style={{ color: '#6B7280' }}>University Syllabus Management</p>
            </div>
          </div>
          
          <div>
            <CardTitle className="mb-2">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your syllabus management dashboard
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email / Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required="true"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-required="true"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full"
              style={{ backgroundColor: '#2E63B8' }}
            >
              Sign In
            </Button>
          </form>

          {/* Sample Test Credentials */}
          <div className="space-y-3 border-t pt-6">
            <div className="text-center">
              <p className="text-sm">Sample Test Credentials</p>
              <p className="text-xs" style={{ color: '#6B7280' }}>
                Use these credentials to test different roles
              </p>
            </div>
            <div className="space-y-2 text-sm">
              {sampleCredentials.map((cred, index) => (
                <div 
                  key={index} 
                  className="flex justify-between rounded p-2" 
                  style={{ backgroundColor: '#F4F7FB' }}
                >
                  <span>{cred.role}:</span>
                  <span className="text-right" style={{ color: '#6B7280' }}>
                    {cred.email} / {cred.password}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
