import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { mockSyllabi } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';

export const FacultyDashboard: React.FC = () => {
  const { user } = useAuth();

  const userSyllabi = mockSyllabi.filter(s => s.facultyId === user?.id);
  const pendingSyllabi = userSyllabi.filter(s => s.status !== 'approved' && s.status !== 'revision_required');
  const revisionRequiredSyllabi = userSyllabi.filter(s => s.status === 'revision_required');
  const approvedSyllabi = userSyllabi.filter(s => s.status === 'approved');
  const totalSubmissions = userSyllabi.length;

  const kpiCards = [
    {
      title: 'Needs Revision',
      value: revisionRequiredSyllabi.length,
      icon: AlertCircle,
      color: '#E53935',
      bgColor: '#FFEBEE'
    },
    {
      title: 'Pending Approvals',
      value: pendingSyllabi.length,
      icon: Clock,
      color: '#F57C00',
      bgColor: '#FFF3E0'
    },
    {
      title: 'Approved',
      value: approvedSyllabi.length,
      icon: CheckCircle,
      color: '#4CAF50',
      bgColor: '#E8F5E9'
    },
    {
      title: 'Total Submissions',
      value: totalSubmissions,
      icon: FileText,
      color: '#2E63B8',
      bgColor: '#E3F2FD'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Faculty Dashboard</h1>
        <p style={{ color: '#6B7280' }}>Welcome back, {user?.name}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revision Required Section */}
      {revisionRequiredSyllabi.length > 0 && (
        <Card style={{ borderColor: '#E53935', borderWidth: '2px' }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" style={{ color: '#E53935' }} />
              <CardTitle style={{ color: '#E53935' }}>Action Required: Revisions Needed</CardTitle>
            </div>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              The following syllabi require revisions before they can be approved
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {revisionRequiredSyllabi.map((syllabus) => {
                const revisionStep = syllabus.approvalHistory.find(step => step.status === 'revision_required');
                return (
                  <div 
                    key={syllabus.id} 
                    className="rounded-lg border p-4"
                    style={{ backgroundColor: '#FFEBEE' }}
                  >
                    <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h3 className="mb-1">{syllabus.courseCode} - {syllabus.courseTitle}</h3>
                        <p className="text-sm" style={{ color: '#6B7280' }}>
                          {syllabus.semester} • Requested by: {revisionStep?.approver}
                        </p>
                      </div>
                      <span 
                        className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm"
                        style={{ backgroundColor: '#E53935', color: '#fff' }}
                      >
                        <AlertCircle className="h-4 w-4" />
                        Revision Required
                      </span>
                    </div>
                    {revisionStep?.comments && (
                      <div className="mb-3 rounded border border-red-200 bg-white p-3">
                        <p className="mb-1 text-sm">Reviewer Comments:</p>
                        <p className="text-sm" style={{ color: '#6B7280' }}>
                          {revisionStep.comments}
                        </p>
                      </div>
                    )}
                    {syllabus.comments.length > 0 && (
                      <div className="mb-3 space-y-2">
                        {syllabus.comments.map((comment) => (
                          <div key={comment.id} className="rounded border border-red-200 bg-white p-3">
                            <p className="mb-1 text-sm">{comment.author} - {comment.role}</p>
                            <p className="text-sm" style={{ color: '#6B7280' }}>
                              {comment.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button 
                      style={{ backgroundColor: '#2E63B8' }}
                      size="sm"
                    >
                      Upload Revised Version
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {userSyllabi.length === 0 ? (
            <div className="py-8 text-center" style={{ color: '#6B7280' }}>
              <FileText className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>No syllabus submissions yet</p>
              <p className="text-sm">Upload your first syllabus to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {userSyllabi.map((syllabus) => (
                <div 
                  key={syllabus.id} 
                  className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <h3 className="mb-1">{syllabus.courseCode} - {syllabus.courseTitle}</h3>
                    <p className="text-sm" style={{ color: '#6B7280' }}>
                      {syllabus.semester} • Uploaded {syllabus.uploadDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {syllabus.status === 'approved' ? (
                      <span 
                        className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm"
                        style={{ backgroundColor: '#E8F5E9', color: '#4CAF50' }}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approved
                      </span>
                    ) : syllabus.status === 'revision_required' ? (
                      <span 
                        className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm"
                        style={{ backgroundColor: '#FFEBEE', color: '#E53935' }}
                      >
                        <AlertCircle className="h-4 w-4" />
                        Needs Revision
                      </span>
                    ) : (
                      <span 
                        className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm"
                        style={{ backgroundColor: '#FFF3E0', color: '#F57C00' }}
                      >
                        <Clock className="h-4 w-4" />
                        In Review
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
