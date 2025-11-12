import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'faculty' | 'depthead' | 'dean' | 'citl' | 'vpaa' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample credentials for testing
const sampleUsers: { [key: string]: { password: string; user: User } } = {
  'faculty1@uni.edu': {
    password: 'Faculty123!',
    user: {
      id: '1',
      email: 'faculty1@uni.edu',
      name: 'Dr. John Smith',
      role: 'faculty',
      department: 'Computer Science'
    }
  },
  'depthead@uni.edu': {
    password: 'Head123!',
    user: {
      id: '2',
      email: 'depthead@uni.edu',
      name: 'Prof. Sarah Johnson',
      role: 'depthead',
      department: 'Computer Science'
    }
  },
  'dean@uni.edu': {
    password: 'Dean123!',
    user: {
      id: '3',
      email: 'dean@uni.edu',
      name: 'Dean Michael Brown',
      role: 'dean',
      department: 'Engineering'
    }
  },
  'citl@uni.edu': {
    password: 'CITL123!',
    user: {
      id: '4',
      email: 'citl@uni.edu',
      name: 'Dr. Emily Davis',
      role: 'citl',
      department: 'CITL'
    }
  },
  'vpaa@uni.edu': {
    password: 'VPAA123!',
    user: {
      id: '5',
      email: 'vpaa@uni.edu',
      name: 'Dr. Robert Wilson',
      role: 'vpaa',
      department: 'Administration'
    }
  },
  'admin@uni.edu': {
    password: 'Admin123!',
    user: {
      id: '6',
      email: 'admin@uni.edu',
      name: 'Admin User',
      role: 'admin',
      department: 'IT'
    }
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const credentials = sampleUsers[email];
    if (credentials && credentials.password === password) {
      setUser(credentials.user);
      localStorage.setItem('syllabo_user', JSON.stringify(credentials.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('syllabo_user');
  };

  // Check for saved session on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('syllabo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
