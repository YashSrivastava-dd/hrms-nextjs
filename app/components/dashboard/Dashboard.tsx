'use client';

import { useAuth } from '../../contexts/AuthContext';
import HrAdminDashboard from './HrAdminDashboard';
import CeoDashboard from './CeoDashboard';
import ManagerDashboard from './ManagerDashboard';
import ComprehensiveDashboard from './ComprehensiveDashboard';

export default function Dashboard() {
  const { employee: employeeData, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!employeeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">Please login to access the dashboard</p>
          <a 
            href="/" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const userRole = employeeData.role || 'Employee';

  // Render role-specific dashboard
  switch (userRole) {
    case 'HR-Admin':
      return <HrAdminDashboard employeeData={employeeData} />;
    case 'CEO':
    case 'Super-Admin':
      return <CeoDashboard employeeData={employeeData} />;
    case 'Manager':
      return <ManagerDashboard employeeData={employeeData} />;
    default:
      return <ComprehensiveDashboard />;
  }
}
