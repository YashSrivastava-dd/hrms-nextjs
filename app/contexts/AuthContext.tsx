'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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

  const logout = async () => {
    try {
      // Clear all authentication-related data
      setEmployee(null);
      localStorage.removeItem('employeeData');
      
      // Clear any other stored data that might be related to the session
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.clear();
      
      // Clear any cookies if they exist
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });

      // Call logout API endpoint for server-side cleanup
      try {
        await fetch('/api/employees/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });
      } catch (error) {
        console.error('Logout API call failed:', error);
        // Continue with logout even if API call fails
      }

      // Redirect to login page using Next.js router
      router.push('/');
      router.refresh(); // Force a refresh to clear any cached data
    } catch (error) {
      console.error('Error during logout:', error);
      // Fallback: force redirect even if there's an error
      router.push('/');
    }
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
