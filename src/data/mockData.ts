export interface Syllabus {
  id: string;
  courseCode: string;
  courseTitle: string;
  semester: string;
  department: string;
  facultyId: string;
  facultyName: string;
  uploadDate: string;
  fileName: string;
  fileType: 'pdf' | 'docx';
  status: 'pending' | 'dept_head_review' | 'dean_review' | 'citl_review' | 'vpaa_review' | 'approved' | 'revision_required';
  currentApprover?: string;
  approvalHistory: ApprovalStep[];
  comments: Comment[];
  versionHistory?: SyllabusVersion[];
}

export interface SyllabusVersion {
  versionNumber: number;
  fileName: string;
  uploadDate: string;
  status: 'approved' | 'revision_required' | 'current';
  comments?: string;
  approvedBy?: string;
  rejectedBy?: string;
}

export interface ApprovalStep {
  approver: string;
  role: string;
  status: 'pending' | 'approved' | 'revision_required';
  date?: string;
  signature?: string;
  comments?: string;
}

export interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  date: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
}

// Mock syllabus submissions
export const mockSyllabi: Syllabus[] = [
  {
    id: 'syl-001',
    courseCode: 'CS101',
    courseTitle: 'Introduction to Computer Science',
    semester: 'Fall 2025',
    department: 'Computer Science',
    facultyId: '1',
    facultyName: 'Dr. John Smith',
    uploadDate: '2025-11-01',
    fileName: 'CS101_Syllabus_Fall2025.pdf',
    fileType: 'pdf',
    status: 'dept_head_review',
    currentApprover: 'depthead@uni.edu',
    approvalHistory: [
      {
        approver: 'Dr. John Smith',
        role: 'Faculty',
        status: 'approved',
        date: '2025-11-01',
        signature: 'faculty-signature-1'
      },
      {
        approver: 'Prof. Sarah Johnson',
        role: 'Department Head',
        status: 'pending',
      },
      {
        approver: 'Dean Michael Brown',
        role: 'Dean',
        status: 'pending',
      },
      {
        approver: 'Dr. Emily Davis',
        role: 'CITL Director',
        status: 'pending',
      },
      {
        approver: 'Dr. Robert Wilson',
        role: 'VPAA',
        status: 'pending',
      }
    ],
    comments: []
  },
  {
    id: 'syl-002',
    courseCode: 'CS202',
    courseTitle: 'Data Structures and Algorithms',
    semester: 'Fall 2025',
    department: 'Computer Science',
    facultyId: '1',
    facultyName: 'Dr. John Smith',
    uploadDate: '2025-10-28',
    fileName: 'CS202_Syllabus_Fall2025.pdf',
    fileType: 'pdf',
    status: 'approved',
    approvalHistory: [
      {
        approver: 'Dr. John Smith',
        role: 'Faculty',
        status: 'approved',
        date: '2025-10-28',
        signature: 'faculty-signature-2'
      },
      {
        approver: 'Prof. Sarah Johnson',
        role: 'Department Head',
        status: 'approved',
        date: '2025-10-29',
        signature: 'depthead-signature-1'
      },
      {
        approver: 'Dean Michael Brown',
        role: 'Dean',
        status: 'approved',
        date: '2025-10-30',
        signature: 'dean-signature-1'
      },
      {
        approver: 'Dr. Emily Davis',
        role: 'CITL Director',
        status: 'approved',
        date: '2025-10-31',
        signature: 'citl-signature-1'
      },
      {
        approver: 'Dr. Robert Wilson',
        role: 'VPAA',
        status: 'approved',
        date: '2025-11-01',
        signature: 'vpaa-signature-1'
      }
    ],
    comments: [],
    versionHistory: [
      {
        versionNumber: 1,
        fileName: 'CS202_Syllabus_Fall2025_v1.pdf',
        uploadDate: '2025-10-25',
        status: 'revision_required',
        comments: 'Initial submission - needs clearer grading rubric',
        rejectedBy: 'Prof. Sarah Johnson'
      },
      {
        versionNumber: 2,
        fileName: 'CS202_Syllabus_Fall2025_v2.pdf',
        uploadDate: '2025-10-28',
        status: 'approved',
        comments: 'All revisions completed successfully',
        approvedBy: 'Dr. Robert Wilson'
      }
    ]
  },
  {
    id: 'syl-003',
    courseCode: 'MATH201',
    courseTitle: 'Calculus II',
    semester: 'Fall 2025',
    department: 'Mathematics',
    facultyId: '7',
    facultyName: 'Dr. Lisa Anderson',
    uploadDate: '2025-11-03',
    fileName: 'MATH201_Syllabus_Fall2025.pdf',
    fileType: 'pdf',
    status: 'dean_review',
    currentApprover: 'dean@uni.edu',
    approvalHistory: [
      {
        approver: 'Dr. Lisa Anderson',
        role: 'Faculty',
        status: 'approved',
        date: '2025-11-03',
        signature: 'faculty-signature-3'
      },
      {
        approver: 'Prof. Mark Thompson',
        role: 'Department Head',
        status: 'approved',
        date: '2025-11-04',
        signature: 'depthead-signature-2'
      },
      {
        approver: 'Dean Michael Brown',
        role: 'Dean',
        status: 'pending',
      },
      {
        approver: 'Dr. Emily Davis',
        role: 'CITL Director',
        status: 'pending',
      },
      {
        approver: 'Dr. Robert Wilson',
        role: 'VPAA',
        status: 'pending',
      }
    ],
    comments: []
  },
  {
    id: 'syl-004',
    courseCode: 'CS303',
    courseTitle: 'Database Management Systems',
    semester: 'Fall 2025',
    department: 'Computer Science',
    facultyId: '1',
    facultyName: 'Dr. John Smith',
    uploadDate: '2025-10-25',
    fileName: 'CS303_Syllabus_Fall2025.pdf',
    fileType: 'pdf',
    status: 'revision_required',
    currentApprover: 'faculty1@uni.edu',
    approvalHistory: [
      {
        approver: 'Dr. John Smith',
        role: 'Faculty',
        status: 'approved',
        date: '2025-10-25',
        signature: 'faculty-signature-4'
      },
      {
        approver: 'Prof. Sarah Johnson',
        role: 'Department Head',
        status: 'revision_required',
        date: '2025-10-26',
        comments: 'Please update the course learning outcomes to align with the new departmental standards. Also, the assessment breakdown needs more detail on the final project requirements.'
      }
    ],
    comments: [
      {
        id: 'comment-001',
        author: 'Prof. Sarah Johnson',
        role: 'Department Head',
        text: 'The syllabus looks good overall, but please revise the learning outcomes section and add more details about the final project assessment criteria.',
        date: '2025-10-26'
      }
    ],
    versionHistory: [
      {
        versionNumber: 1,
        fileName: 'CS303_Syllabus_Fall2025_v1.pdf',
        uploadDate: '2025-10-25',
        status: 'current',
        comments: 'Current version pending revision',
        rejectedBy: 'Prof. Sarah Johnson'
      }
    ]
  },
  {
    id: 'syl-005',
    courseCode: 'CS401',
    courseTitle: 'Software Engineering',
    semester: 'Fall 2025',
    department: 'Computer Science',
    facultyId: '1',
    facultyName: 'Dr. John Smith',
    uploadDate: '2025-10-20',
    fileName: 'CS401_Syllabus_Fall2025.pdf',
    fileType: 'pdf',
    status: 'revision_required',
    currentApprover: 'faculty1@uni.edu',
    approvalHistory: [
      {
        approver: 'Dr. John Smith',
        role: 'Faculty',
        status: 'approved',
        date: '2025-10-20',
        signature: 'faculty-signature-5'
      },
      {
        approver: 'Prof. Sarah Johnson',
        role: 'Department Head',
        status: 'approved',
        date: '2025-10-21',
        signature: 'depthead-signature-3'
      },
      {
        approver: 'Dean Michael Brown',
        role: 'Dean',
        status: 'approved',
        date: '2025-10-22',
        signature: 'dean-signature-2'
      },
      {
        approver: 'Dr. Emily Davis',
        role: 'CITL Director',
        status: 'revision_required',
        date: '2025-10-23',
        comments: 'The accessibility statement is missing. Please add information about accommodations for students with disabilities. Also, include more information about the use of AI tools in coursework.'
      }
    ],
    comments: [
      {
        id: 'comment-002',
        author: 'Dr. Emily Davis',
        role: 'CITL Director',
        text: 'Please add an accessibility statement and clarify the policy on AI tool usage in assignments.',
        date: '2025-10-23'
      }
    ],
    versionHistory: [
      {
        versionNumber: 1,
        fileName: 'CS401_Syllabus_Fall2025_v1.pdf',
        uploadDate: '2025-10-15',
        status: 'revision_required',
        comments: 'Initial submission - missing required sections',
        rejectedBy: 'Prof. Sarah Johnson'
      },
      {
        versionNumber: 2,
        fileName: 'CS401_Syllabus_Fall2025_v2.pdf',
        uploadDate: '2025-10-20',
        status: 'current',
        comments: 'Current version pending revision for accessibility statement',
        rejectedBy: 'Dr. Emily Davis'
      }
    ]
  }
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    userId: '1',
    title: 'Syllabus Approved',
    message: 'Your syllabus for CS202 has been fully approved.',
    date: '2025-11-01',
    read: false,
    type: 'success'
  },
  {
    id: 'notif-002',
    userId: '1',
    title: 'Syllabus Under Review',
    message: 'Your syllabus for CS101 is currently under review by the Department Head.',
    date: '2025-11-01',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-003',
    userId: '1',
    title: 'Revision Required',
    message: 'Your syllabus for CS303 requires revision. Department Head has requested changes to the learning outcomes and assessment details.',
    date: '2025-10-26',
    read: false,
    type: 'error'
  },
  {
    id: 'notif-004',
    userId: '1',
    title: 'Revision Required',
    message: 'Your syllabus for CS401 requires revision. CITL Director has requested an accessibility statement and AI policy clarification.',
    date: '2025-10-23',
    read: false,
    type: 'error'
  },
  {
    id: 'notif-005',
    userId: '2',
    title: 'New Syllabus Submission',
    message: 'Dr. John Smith has submitted a syllabus for CS101 for your review.',
    date: '2025-11-01',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-006',
    userId: '3',
    title: 'Syllabus Awaiting Review',
    message: 'MATH201 syllabus is awaiting your approval.',
    date: '2025-11-04',
    read: false,
    type: 'warning'
  }
];

// Mock users
export const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'Dr. John Smith',
    email: 'faculty1@uni.edu',
    role: 'Faculty',
    department: 'Computer Science',
    status: 'active'
  },
  {
    id: '2',
    name: 'Prof. Sarah Johnson',
    email: 'depthead@uni.edu',
    role: 'Department Head',
    department: 'Computer Science',
    status: 'active'
  },
  {
    id: '3',
    name: 'Dean Michael Brown',
    email: 'dean@uni.edu',
    role: 'Dean',
    department: 'Engineering',
    status: 'active'
  },
  {
    id: '4',
    name: 'Dr. Emily Davis',
    email: 'citl@uni.edu',
    role: 'CITL Director',
    department: 'CITL',
    status: 'active'
  },
  {
    id: '5',
    name: 'Dr. Robert Wilson',
    email: 'vpaa@uni.edu',
    role: 'VPAA',
    department: 'Administration',
    status: 'active'
  },
  {
    id: '6',
    name: 'Admin User',
    email: 'admin@uni.edu',
    role: 'Admin',
    department: 'IT',
    status: 'active'
  },
  {
    id: '7',
    name: 'Dr. Lisa Anderson',
    email: 'faculty2@uni.edu',
    role: 'Faculty',
    department: 'Mathematics',
    status: 'active'
  }
];