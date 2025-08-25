'use client';

import { useState, useEffect } from 'react';
import { 
  UsersIcon, 
  ChartBarIcon, 
  CalendarIcon, 
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface Employee {
  employeeId: string;
  employeeName: string;
  designation: string;
  departmentId: string;
  role: string;
}

interface HrAdminDashboardProps {
  employeeData: Employee;
}

export default function HrAdminDashboard({ employeeData }: HrAdminDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hrStats = [
    {
      title: 'Total Employees',
      value: '156',
      icon: UsersIcon,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      change: '+12',
      changeType: 'positive'
    },
    {
      title: 'Active Recruitments',
      value: '8',
      icon: UserGroupIcon,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      change: '+3',
      changeType: 'positive'
    },
    {
      title: 'Pending Approvals',
      value: '23',
      icon: ClockIcon,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      change: '-5',
      changeType: 'negative'
    },
    {
      title: 'Departments',
      value: '12',
      icon: BuildingOfficeIcon,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      change: '+1',
      changeType: 'positive'
    }
  ];

  const recentHrActivities = [
    {
      id: 1,
      action: 'New employee onboarding completed',
      time: '1 hour ago',
      status: 'completed',
      type: 'onboarding'
    },
    {
      id: 2,
      action: 'Leave request requires approval',
      time: '2 hours ago',
      status: 'pending',
      type: 'leave'
    },
    {
      id: 3,
      action: 'Performance review scheduled',
      time: '1 day ago',
      status: 'completed',
      type: 'review'
    },
    {
      id: 4,
      action: 'Payroll processing started',
      time: '2 days ago',
      status: 'completed',
      type: 'payroll'
    }
  ];

  const departmentStats = [
    { name: 'Engineering', count: 45, growth: '+8%' },
    { name: 'Sales', count: 32, growth: '+12%' },
    { name: 'Marketing', count: 28, growth: '+5%' },
    { name: 'HR', count: 15, growth: '+2%' },
    { name: 'Finance', count: 18, growth: '+3%' },
    { name: 'Operations', count: 18, growth: '+7%' }
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'completed') {
      return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
    }
    return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />;
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'onboarding':
        return 'bg-blue-100 text-blue-800';
      case 'leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'review':
        return 'bg-green-100 text-green-800';
      case 'payroll':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {employeeData.employeeName}! 👋
        </h1>
        <p className="text-purple-100 text-lg">
          HR Admin Dashboard | Department: {employeeData.departmentId}
        </p>
        <div className="mt-4 text-sm text-purple-100">
          Current Time: {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* HR Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hrStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div className="text-right">
                  <div className={`flex items-center text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                    {stat.change}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Statistics */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <BuildingOfficeIcon className="w-5 h-5 mr-2 text-blue-600" />
              Department Statistics
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View Details
            </button>
          </div>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">{dept.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{dept.name}</h3>
                    <p className="text-sm text-gray-500">{dept.count} employees</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-green-600">{dept.growth}</span>
                  <p className="text-xs text-gray-500">Growth</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent HR Activities */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentHrActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                {getStatusIcon(activity.status)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getActivityTypeColor(activity.type)}`}>
                    {activity.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <UsersIcon className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Employee</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <DocumentTextIcon className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Process Payroll</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ChartBarIcon className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Generate Reports</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CalendarIcon className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Schedule Review</span>
          </button>
        </div>
      </div>

      {/* Additional HR Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Requests</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending</span>
              <span className="text-lg font-semibold text-yellow-600">15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Approved</span>
              <span className="text-lg font-semibold text-green-600">42</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Rejected</span>
              <span className="text-lg font-semibold text-red-600">8</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruitment</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Open Positions</span>
              <span className="text-lg font-semibold text-blue-600">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Applications</span>
              <span className="text-lg font-semibold text-green-600">89</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Interviews</span>
              <span className="text-lg font-semibold text-purple-600">23</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Reviews Due</span>
              <span className="text-lg font-semibold text-orange-600">18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completed</span>
              <span className="text-lg font-semibold text-green-600">67</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Rating</span>
              <span className="text-lg font-semibold text-blue-600">4.2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
