import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Upload, 
  TrendingUp, 
  Bell, 
  Settings, 
  User, 
  LogOut,
  CheckCircle,
  Users,
  FileText,
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isMobileOpen,
  setIsMobileOpen 
}) => {
  const { user, logout } = useAuth();

  const facultyMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload Syllabus', icon: Upload },
    { id: 'track', label: 'Track Syllabus', icon: TrendingUp },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const approverMenuItems = [
    { id: 'approval-workflow', label: 'Approval Workflow', icon: CheckCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'manage-users', label: 'Manage Users', icon: Users },
    { id: 'faculty-pages', label: 'Faculty Pages', icon: FileText },
    { id: 'approval-workflow', label: 'Approval Workflow', icon: CheckCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const getMenuItems = () => {
    if (user?.role === 'faculty') return facultyMenuItems;
    if (user?.role === 'admin') return adminMenuItems;
    return approverMenuItems;
  };

  const menuItems = getMenuItems();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <FileText className="h-8 w-8" style={{ color: '#2E63B8' }} />
          <span className="font-semibold" style={{ color: '#2E63B8' }}>Syllabo</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <Separator />
      
      <div className="p-4">
        <div className="rounded-lg p-3" style={{ backgroundColor: '#F4F7FB' }}>
          <p className="text-sm text-muted-foreground">Logged in as</p>
          <p className="mt-1">{user?.name}</p>
          <p className="text-sm" style={{ color: '#6B7280' }}>{user?.role}</p>
        </div>
      </div>
      
      <ScrollArea className="flex-1 px-3">
        <nav className="flex flex-col gap-1" role="navigation" aria-label="Main navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  isActive 
                    ? 'text-white' 
                    : 'hover:bg-gray-100'
                }`}
                style={isActive ? { backgroundColor: '#2E63B8' } : {}}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </ScrollArea>
      
      <div className="p-4">
        <Separator className="mb-4" />
        <Button
          onClick={logout}
          variant="outline"
          className="w-full justify-start gap-3"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-white transition-transform duration-200 ease-in-out lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar navigation"
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside 
        className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:block lg:w-64 lg:border-r lg:bg-white"
        aria-label="Sidebar navigation"
      >
        {sidebarContent}
      </aside>
    </>
  );
};
