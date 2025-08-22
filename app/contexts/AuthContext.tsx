'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Employee {
  _id: string;
  employeeId: string;
  employeeName: string;
  email: string;
  designation: string;
  departmentId: string;
  role: string;
  isWorking: boolean;
  accountStatus: string;
}

interface AuthContextType {
  employee: Employee | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (employeeData: Employee) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedEmployee = localStorage.getItem('employeeData');
    if (storedEmployee) {
      try {
        const employeeData = JSON.parse(storedEmployee);
        setEmployee(employeeData);
      } catch (error) {
        console.error('Error parsing stored employee data:', error);
        localStorage.removeItem('employeeData');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (employeeData: Employee) => {
    setEmployee(employeeData);
    localStorage.setItem('employeeData', JSON.stringify(employeeData));
  };

  const logout = () => {
    setEmployee(null);
    localStorage.removeItem('employeeData');
    window.location.href = '/';
  };

  const value: AuthContextType = {
    employee,
    isAuthenticated: !!employee,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
