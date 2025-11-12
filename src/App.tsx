import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeProvider';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { FacultyDashboard } from './pages/faculty/Dashboard';
import { UploadSyllabus } from './pages/faculty/UploadSyllabus';
import { TrackSyllabus } from './pages/faculty/TrackSyllabus';
import { ApprovalWorkflow } from './pages/approver/ApprovalWorkflow';
import { AdminDashboard } from './pages/admin/Dashboard';
import { ManageUsers } from './pages/admin/ManageUsers';
import { Notifications } from './pages/shared/Notifications';
import { Profile } from './pages/shared/Profile';
import { Settings } from './pages/shared/Settings';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Set default active tab based on role
  useEffect(() => {
    if (user) {
      if (user.role === 'faculty') {
        setActiveTab('dashboard');
      } else if (user.role === 'admin') {
        setActiveTab('dashboard');
      } else {
        // Approver roles
        setActiveTab('approval-workflow');
      }
    }
  }, [user]);

  // If not authenticated, show login
  if (!user) {
    return <Login />;
  }

  // Render content based on active tab
  const renderContent = () => {
    // Faculty pages
    if (user.role === 'faculty') {
      switch (activeTab) {
        case 'dashboard':
          return <FacultyDashboard />;
        case 'upload':
          return <UploadSyllabus />;
        case 'track':
          return <TrackSyllabus />;
        case 'notifications':
          return <Notifications />;
        case 'settings':
          return <Settings />;
        case 'profile':
          return <Profile />;
        default:
          return <FacultyDashboard />;
      }
    }

    // Admin pages
    if (user.role === 'admin') {
      switch (activeTab) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'manage-users':
          return <ManageUsers />;
        case 'faculty-pages':
          return <FacultyDashboard />;
        case 'approval-workflow':
          return <ApprovalWorkflow />;
        case 'notifications':
          return <Notifications />;
        case 'profile':
          return <Profile />;
        default:
          return <AdminDashboard />;
      }
    }

    // Approver pages (depthead, dean, citl, vpaa)
    switch (activeTab) {
      case 'approval-workflow':
        return <ApprovalWorkflow />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      default:
        return <ApprovalWorkflow />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </ThemeProvider>
  );
}
