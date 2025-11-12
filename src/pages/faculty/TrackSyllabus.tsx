import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { CheckCircle, Clock, AlertCircle, FileText, Search, Download, History } from 'lucide-react';
import { mockSyllabi } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { toast } from 'sonner@2.0.3';

export const TrackSyllabus: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSyllabusHistory, setSelectedSyllabusHistory] = useState<string | null>(null);

  const userSyllabi = mockSyllabi.filter(s => s.facultyId === user?.id);

  const filteredSyllabi = userSyllabi.filter(syllabus => {
    const matchesSearch = syllabus.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         syllabus.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || syllabus.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    if (status === 'approved') return <CheckCircle className="h-4 w-4" />;
    if (status === 'revision_required') return <AlertCircle className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'approved') return { bg: '#E8F5E9', text: '#4CAF50' };
    if (status === 'revision_required') return { bg: '#FFEBEE', text: '#E53935' };
    return { bg: '#FFF3E0', text: '#F57C00' };
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      'pending': 'Pending',
      'dept_head_review': 'Dept Head Review',
      'dean_review': 'Dean Review',
      'citl_review': 'CITL Review',
      'vpaa_review': 'VPAA Review',
      'approved': 'Approved',
      'revision_required': 'Revision Required'
    };
    return labels[status] || status;
  };

  const handleDownload = (fileName: string) => {
    toast.success(`Downloading ${fileName}...`);
  };

  const selectedSyllabusData = mockSyllabi.find(s => s.id === selectedSyllabusHistory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2" style={{ fontSize: '2rem', color: '#2E63B8' }}>Track Syllabus</h1>
        <p style={{ color: '#6B7280' }}>Monitor the approval progress of your syllabi</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: '#6B7280' }} />
              <Input
                placeholder="Search by course code or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="dept_head_review">Dept Head Review</SelectItem>
                <SelectItem value="dean_review">Dean Review</SelectItem>
                <SelectItem value="citl_review">CITL Review</SelectItem>
                <SelectItem value="vpaa_review">VPAA Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="revision_required">Revision Required</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredSyllabi.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 opacity-50" style={{ color: '#6B7280' }} />
            <p style={{ color: '#6B7280' }}>No syllabi found matching your criteria</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredSyllabi.map((syllabus) => (
            <Card key={syllabus.id}>
              <CardHeader>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {syllabus.courseCode} - {syllabus.courseTitle}
                  </CardTitle>
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm"
                    style={{
                      backgroundColor: getStatusColor(syllabus.status).bg,
                      color: getStatusColor(syllabus.status).text
                    }}
                  >
                    {getStatusIcon(syllabus.status)}
                    {getStatusLabel(syllabus.status)}
                  </span>
                </div>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  {syllabus.semester} • {syllabus.department} • Uploaded {syllabus.uploadDate}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="mb-4 text-sm">Approval Progress</p>
                  <div className="space-y-3">
                    {syllabus.approvalHistory.map((step, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          step.status === 'approved' ? 'bg-green-100' : 
                          step.status === 'revision_required' ? 'bg-red-100' : 
                          'bg-gray-100'
                        }`}>
                          {step.status === 'approved' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : step.status === 'revision_required' ? (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{step.approver}</p>
                          <p className="text-xs" style={{ color: '#6B7280' }}>{step.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 border-t pt-4">
                    {syllabus.status === 'approved' && (
                      <Button
                        onClick={() => handleDownload(syllabus.fileName)}
                        style={{ backgroundColor: '#4CAF50' }}
                        size="sm"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Approved Syllabus
                      </Button>
                    )}
                    {syllabus.status === 'revision_required' && (
                      <Button
                        onClick={() => handleDownload(syllabus.fileName)}
                        variant="outline"
                        size="sm"
                        style={{ borderColor: '#E53935', color: '#E53935' }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download for Corrections
                      </Button>
                    )}
                    {syllabus.versionHistory && syllabus.versionHistory.length > 0 && (
                      <Button
                        onClick={() => setSelectedSyllabusHistory(syllabus.id)}
                        variant="outline"
                        size="sm"
                      >
                        <History className="mr-2 h-4 w-4" />
                        Version History ({syllabus.versionHistory.length})
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Version History Dialog */}
      <Dialog open={!!selectedSyllabusHistory} onOpenChange={() => setSelectedSyllabusHistory(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle style={{ color: '#2E63B8' }}>
              Version History: {selectedSyllabusData?.courseCode}
            </DialogTitle>
            <DialogDescription>
              View and download all previous versions of this syllabus
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {selectedSyllabusData?.versionHistory && selectedSyllabusData.versionHistory.length > 0 ? (
              selectedSyllabusData.versionHistory.map((version) => (
                <div 
                  key={version.versionNumber} 
                  className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                  style={{ 
                    backgroundColor: version.status === 'approved' ? '#E8F5E9' : 
                                    version.status === 'current' ? '#FFF3E0' : '#FFEBEE'
                  }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5" style={{ color: '#2E63B8' }} />
                      <p className="font-medium">Version {version.versionNumber}</p>
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
                        style={{
                          backgroundColor: version.status === 'approved' ? '#4CAF50' :
                                          version.status === 'current' ? '#F57C00' : '#E53935',
                          color: '#fff'
                        }}
                      >
                        {version.status === 'approved' ? 'Approved' : 
                         version.status === 'current' ? 'Current' : 'Rejected'}
                      </span>
                    </div>
                    <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>
                      Uploaded: {version.uploadDate}
                    </p>
                    {version.comments && (
                      <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>
                        {version.comments}
                      </p>
                    )}
                    {version.approvedBy && (
                      <p className="mt-1 text-sm" style={{ color: '#4CAF50' }}>
                        Approved by: {version.approvedBy}
                      </p>
                    )}
                    {version.rejectedBy && (
                      <p className="mt-1 text-sm" style={{ color: '#E53935' }}>
                        Rejected by: {version.rejectedBy}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={() => handleDownload(version.fileName)}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))
            ) : (
              <div className="py-8 text-center" style={{ color: '#6B7280' }}>
                <History className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>No version history available</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};