import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Bell, CheckCheck, Info, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { mockNotifications, Notification } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export const Notifications: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(
    mockNotifications.filter(n => n.userId === user?.id)
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return '#E8F5E9';
      case 'error':
        return '#FFEBEE';
      case 'warning':
        return '#FFF3E0';
      default:
        return '#E3F2FD';
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2">Notifications</h1>
          <p style={{ color: '#6B7280' }}>
            Stay updated with your syllabus approvals and activities
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              All Notifications
            </CardTitle>
            {unreadCount > 0 && (
              <Badge style={{ backgroundColor: '#E53935', color: 'white' }}>
                {unreadCount} unread
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="py-8 text-center">
              <Bell className="mx-auto mb-4 h-12 w-12 opacity-50" style={{ color: '#6B7280' }} />
              <p style={{ color: '#6B7280' }}>No notifications yet</p>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                You'll see updates about your syllabi here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-lg border p-4 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex gap-4">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: getBackgroundColor(notification.type) }}
                    >
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-start justify-between gap-4">
                        <h3 className="flex items-center gap-2">
                          {notification.title}
                          {!notification.read && (
                            <Badge variant="outline" style={{ borderColor: '#2E63B8', color: '#2E63B8' }}>
                              New
                            </Badge>
                          )}
                        </h3>
                      </div>
                      <p className="mb-2 text-sm" style={{ color: '#6B7280' }}>
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs" style={{ color: '#6B7280' }}>
                          {notification.date}
                        </p>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
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
