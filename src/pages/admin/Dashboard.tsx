import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, FileText, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { mockSyllabi, mockUsers } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.status === 'active').length;
  const totalSubmissions = mockSyllabi.length;
  const pendingApprovals = mockSyllabi.filter(s => s.status !== 'approved').length;
  const approvedSyllabi = mockSyllabi.filter(s => s.status === 'approved').length;

  const kpiCards = [
    {
      title: 'Total Users',
      value: totalUsers,
      change: '+2 this month',
      icon: Users,
      color: '#2E63B8',
      bgColor: '#E3F2FD'
    },
    {
      title: 'Active Users',
      value: activeUsers,
      change: `${Math.round((activeUsers / totalUsers) * 100)}% active`,
      icon: TrendingUp,
      color: '#4CAF50',
      bgColor: '#E8F5E9'
    },
    {
      title: 'Total Submissions',
      value: totalSubmissions,
      change: '+3 this week',
      icon: FileText,
      color: '#F57C00',
      bgColor: '#FFF3E0'
    },
    {
      title: 'Pending Approvals',
      value: pendingApprovals,
      change: 'Requires attention',
      icon: Clock,
      color: '#E53935',
      bgColor: '#FFEBEE'
    },
    {
      title: 'Approved Syllabi',
      value: approvedSyllabi,
      change: `${Math.round((approvedSyllabi / totalSubmissions) * 100)}% approval rate`,
      icon: CheckCircle,
      color: '#4CAF50',
      bgColor: '#E8F5E9'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Admin Dashboard</h1>
        <p style={{ color: '#6B7280' }}>System overview and analytics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">{card.title}</CardTitle>
                <div
                  className="rounded-full p-2"
                  style={{ backgroundColor: card.bgColor }}
                >
                  <Icon className="h-4 w-4" style={{ color: card.color }} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{card.value}</div>
                <p className="mt-1 text-xs" style={{ color: '#6B7280' }}>
                  {card.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSyllabi.slice(0, 5).map((syllabus) => (
              <div
                key={syllabus.id}
                className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <p className="mb-1">{syllabus.courseCode} - {syllabus.courseTitle}</p>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    {syllabus.facultyName} • {syllabus.uploadDate}
                  </p>
                </div>
                <span
                  className="inline-flex w-fit items-center rounded-full px-3 py-1 text-sm"
                  style={{
                    backgroundColor: syllabus.status === 'approved' ? '#E8F5E9' : '#FFF3E0',
                    color: syllabus.status === 'approved' ? '#4CAF50' : '#F57C00'
                  }}
                >
                  {syllabus.status === 'approved' ? 'Approved' : 'In Review'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
