import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { User, Mail, Building, Briefcase, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeColor = (role: string) => {
    const roleColors: { [key: string]: { bg: string; text: string } } = {
      'faculty': { bg: '#E3F2FD', text: '#2E63B8' },
      'depthead': { bg: '#F3E5F5', text: '#7B1FA2' },
      'dean': { bg: '#FFF3E0', text: '#F57C00' },
      'citl': { bg: '#E8F5E9', text: '#4CAF50' },
      'vpaa': { bg: '#FCE4EC', text: '#C2185B' },
      'admin': { bg: '#EFEBE9', text: '#5D4037' }
    };
    return roleColors[role] || { bg: '#F5F5F5', text: '#757575' };
  };

  const roleColors = getRoleBadgeColor(user.role);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="mb-2">Profile</h1>
        <p style={{ color: '#6B7280' }}>View and manage your account information</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarFallback 
                className="text-2xl"
                style={{ backgroundColor: roleColors.bg, color: roleColors.text }}
              >
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="mb-2">{user.name}</h2>
              <Badge style={{ backgroundColor: roleColors.bg, color: roleColors.text }}>
                {user.role === 'faculty' && 'Faculty'}
                {user.role === 'depthead' && 'Department Head'}
                {user.role === 'dean' && 'Dean'}
                {user.role === 'citl' && 'CITL Director'}
                {user.role === 'vpaa' && 'VPAA'}
                {user.role === 'admin' && 'Administrator'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: '#E3F2FD' }}
              >
                <User className="h-5 w-5" style={{ color: '#2E63B8' }} />
              </div>
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#6B7280' }}>Full Name</p>
                <p>{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div 
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: '#E3F2FD' }}
              >
                <Mail className="h-5 w-5" style={{ color: '#2E63B8' }} />
              </div>
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#6B7280' }}>Email Address</p>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div 
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: '#E3F2FD' }}
              >
                <Building className="h-5 w-5" style={{ color: '#2E63B8' }} />
              </div>
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#6B7280' }}>Department</p>
                <p>{user.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div 
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: '#E3F2FD' }}
              >
                <Briefcase className="h-5 w-5" style={{ color: '#2E63B8' }} />
              </div>
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#6B7280' }}>User ID</p>
                <p>{user.id}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5" style={{ color: '#4CAF50' }} />
            <div>
              <p>Account Active</p>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Your account is in good standing
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
