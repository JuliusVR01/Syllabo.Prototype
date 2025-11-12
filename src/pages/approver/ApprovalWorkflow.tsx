import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { FileText, Download, CheckCircle, XCircle, Upload } from 'lucide-react';
import { mockSyllabi } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { SignatureModal } from '../../components/SignatureModal';
import { toast } from 'sonner@2.0.3';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';

export const ApprovalWorkflow: React.FC = () => {
  const { user } = useAuth();
  const [selectedSyllabus, setSelectedSyllabus] = useState<string | null>(null);
  const [comments, setComments] = useState('');
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [editedFile, setEditedFile] = useState<File | null>(null);

  const getSyllabiForApproval = () => {
    const roleStatusMap: { [key: string]: string } = {
      'depthead': 'dept_head_review',
      'dean': 'dean_review',
      'citl': 'citl_review',
      'vpaa': 'vpaa_review'
    };

    const status = roleStatusMap[user?.role || ''];
    return mockSyllabi.filter(s => s.status === status);
  };

  const syllabiForApproval = getSyllabiForApproval();
  const selectedSyllabusData = mockSyllabi.find(s => s.id === selectedSyllabus);

  const handleApprove = (signature: string) => {
    toast.success('Syllabus approved successfully!');
    setShowSignatureModal(false);
    setSelectedSyllabus(null);
    setComments('');
  };

  const handleRevision = () => {
    if (!comments.trim()) {
      toast.error('Please provide comments for revision');
      return;
    }
    toast.success('Syllabus sent back for revision');
    setSelectedSyllabus(null);
    setComments('');
    setEditedFile(null);
  };

  const handleDownload = (fileName: string) => {
    toast.success(`Downloading ${fileName}...`);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type (accept PDF, DOC, DOCX)
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setEditedFile(file);
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };

  const handleRemoveFile = () => {
    setEditedFile(null);
    toast.success('Uploaded file removed');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2" style={{ fontSize: '2rem', color: '#2E63B8' }}>Approval Workflow</h1>
        <p style={{ color: '#6B7280' }}>Review and approve syllabus submissions</p>
      </div>

      {syllabiForApproval.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle className="mx-auto mb-4 h-12 w-12 opacity-50" style={{ color: '#4CAF50' }} />
            <p style={{ color: '#6B7280' }}>No syllabi pending your approval</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {syllabiForApproval.map((syllabus) => (
            <Card key={syllabus.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="mb-2">
                      {syllabus.courseCode} - {syllabus.courseTitle}
                    </CardTitle>
                    <div className="space-y-1 text-sm" style={{ color: '#6B7280' }}>
                      <p>Faculty: {syllabus.facultyName}</p>
                      <p>Department: {syllabus.department}</p>
                      <p>Semester: {syllabus.semester}</p>
                      <p>Uploaded: {syllabus.uploadDate}</p>
                    </div>
                  </div>
                  <FileText className="h-8 w-8" style={{ color: '#2E63B8' }} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => setSelectedSyllabus(syllabus.id)}
                    className="flex-1"
                    style={{ backgroundColor: '#2E63B8' }}
                  >
                    Review
                  </Button>
                  <Button
                    onClick={() => handleDownload(syllabus.fileName)}
                    variant="outline"
                    size="icon"
                    aria-label="Download syllabus"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedSyllabus} onOpenChange={() => setSelectedSyllabus(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Review Syllabus: {selectedSyllabusData?.courseCode}
            </DialogTitle>
            <DialogDescription>
              Review the syllabus and provide your approval or request revisions
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="document" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="document">Document</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="history">Version History</TabsTrigger>
            </TabsList>

            <TabsContent value="document" className="space-y-4">
              <div className="rounded-lg border-2 bg-white p-8 text-center" style={{ minHeight: '400px' }}>
                <FileText className="mx-auto mb-4 h-16 w-16" style={{ color: '#6B7280' }} />
                <p className="mb-2">{selectedSyllabusData?.fileName}</p>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  Document viewer placeholder
                </p>
                <Button
                  onClick={() => selectedSyllabusData && handleDownload(selectedSyllabusData.fileName)}
                  variant="outline"
                  className="mt-4"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download to View
                </Button>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <p className="mb-3">Comments & Suggestions</p>
                  <Textarea
                    placeholder="Add comments or suggestions for the faculty..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="rounded-lg border p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Upload className="h-5 w-5" style={{ color: '#2E63B8' }} />
                    <p>Upload Edited Syllabus (Optional)</p>
                  </div>
                  <p className="mb-4 text-sm" style={{ color: '#6B7280' }}>
                    Download the syllabus, edit it in your preferred application, and upload the corrected version here.
                  </p>
                  
                  {editedFile ? (
                    <div className="flex items-center justify-between rounded-lg border p-3" style={{ backgroundColor: '#F4F7FB' }}>
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8" style={{ color: '#2E63B8' }} />
                        <div>
                          <p className="text-sm">{editedFile.name}</p>
                          <p className="text-xs" style={{ color: '#6B7280' }}>
                            {(editedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleRemoveFile}
                        variant="ghost"
                        size="sm"
                        style={{ color: '#E53935' }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Label 
                        htmlFor="edited-file" 
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors hover:bg-gray-50"
                      >
                        <Upload className="h-5 w-5" style={{ color: '#6B7280' }} />
                        <span className="text-sm" style={{ color: '#6B7280' }}>
                          Click to upload edited syllabus (PDF, DOC, DOCX)
                        </span>
                      </Label>
                      <Input
                        id="edited-file"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <div className="space-y-3">
                {selectedSyllabusData?.approvalHistory.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      step.status === 'approved' ? 'bg-green-100' :
                      step.status === 'revision_required' ? 'bg-red-100' :
                      'bg-gray-100'
                    }`}>
                      {step.status === 'approved' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : step.status === 'revision_required' ? (
                        <XCircle className="h-5 w-5 text-red-600" />
                      ) : (
                        <FileText className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p>{step.approver}</p>
                      <p className="text-sm" style={{ color: '#6B7280' }}>{step.role}</p>
                      {step.date && (
                        <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>
                          {step.date}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
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
                    <FileText className="mx-auto mb-4 h-12 w-12 opacity-50" />
                    <p>No version history available</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:justify-end">
            <Button
              onClick={handleRevision}
              variant="outline"
              style={{ borderColor: '#E53935', color: '#E53935' }}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Request Revision
            </Button>
            <Button
              onClick={() => setShowSignatureModal(true)}
              style={{ backgroundColor: '#4CAF50' }}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve with Signature
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <SignatureModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onSave={handleApprove}
      />
    </div>
  );
};