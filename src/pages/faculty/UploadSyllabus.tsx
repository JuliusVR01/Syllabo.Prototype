import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Upload, FileText, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export const UploadSyllabus: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    courseCode: '',
    courseTitle: '',
    semester: '',
    department: ''
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
      } else {
        toast.error('Please upload a PDF or DOCX file');
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    if (!formData.courseCode || !formData.courseTitle || !formData.semester || !formData.department) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Syllabus uploaded successfully!');
    
    setSelectedFile(null);
    setFormData({
      courseCode: '',
      courseTitle: '',
      semester: '',
      department: ''
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="mb-2" style={{ fontSize: '2rem', color: '#2E63B8' }}>Upload Syllabus</h1>
        <p style={{ color: '#6B7280' }}>Upload a new course syllabus for approval</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Syllabus Information</CardTitle>
            <CardDescription>Provide details about the course syllabus</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="mb-2">Syllabus File *</Label>
              <div
                className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileInput}
                  className="hidden"
                  aria-label="Upload syllabus file"
                />

                {selectedFile ? (
                  <div className="flex w-full items-center justify-between rounded-lg bg-white p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8" style={{ color: '#2E63B8' }} />
                      <div>
                        <p>{selectedFile.name}</p>
                        <p className="text-sm" style={{ color: '#6B7280' }}>
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="rounded-full p-1 hover:bg-gray-100"
                      aria-label="Remove file"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <label htmlFor="file-upload" className="flex cursor-pointer flex-col items-center">
                    <Upload className="mb-4 h-12 w-12" style={{ color: '#6B7280' }} />
                    <p className="mb-2">
                      <span style={{ color: '#2E63B8' }}>Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm" style={{ color: '#6B7280' }}>
                      PDF or DOCX files only
                    </p>
                  </label>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="courseCode">Course Code *</Label>
                <Input
                  id="courseCode"
                  placeholder="e.g., CS101"
                  value={formData.courseCode}
                  onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseTitle">Course Title *</Label>
              <Input
                id="courseTitle"
                placeholder="e.g., Introduction to Computer Science"
                value={formData.courseTitle}
                onChange={(e) => setFormData({ ...formData, courseTitle: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester">Semester *</Label>
              <Select
                value={formData.semester}
                onValueChange={(value) => setFormData({ ...formData, semester: value })}
              >
                <SelectTrigger id="semester">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fall-2025">Fall 2025</SelectItem>
                  <SelectItem value="spring-2026">Spring 2026</SelectItem>
                  <SelectItem value="summer-2026">Summer 2026</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" style={{ backgroundColor: '#2E63B8' }}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Syllabus
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};