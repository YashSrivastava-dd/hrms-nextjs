'use client';

import { useState, useEffect } from 'react';
import { 
  UsersIcon, 
  ChartBarIcon, 
  CalendarIcon, 
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface Employee {
  employeeId: string;
  employeeName: string;
  designation: string;
  departmentId: string;
  role: string;
}

interface ManagerDashboardProps {
  employeeData: Employee;
}

export default function ManagerDashboard({ employeeData }: ManagerDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const teamStats = [
    {
      title: 'Team Size',
      value: '12',
      icon: UsersIcon,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      change: '+2',
      changeType: 'positive'
    },
    {
      title: 'Active Projects',
      value: '8',
      icon: ChartBarIcon,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      change: '+1',
      changeType: 'positive'
    },
    {
      title: 'Team Performance',
      value: '4.3/5.0',
      icon: ArrowTrendingUpIcon,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      change: '+0.2',
      changeType: 'positive'
    },
    {
      title: 'Pending Reviews',
      value: '5',
      icon: ClockIcon,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
      change: '-2',
      changeType: 'negative'
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Senior Developer',
      performance: 4.5,
      status: 'active',
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'UI/UX Designer',
      performance: 4.2,
      status: 'active',
      avatar: 'SJ'
    },
    {
      id: 3,
      name: 'Mike Davis',
      role: 'Frontend Developer',
      performance: 3.8,
      status: 'review',
      avatar: 'MD'
    },
    {
      id: 4,
      name: 'Emily Wilson',
      role: 'Backend Developer',
      performance: 4.7,
      status: 'active',
      avatar: 'EW'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Performance review completed for John Smith',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      action: 'New project assigned to team',
      time: '1 day ago',
      status: 'completed'
    },
    {
      id: 3,
      action: 'Team meeting scheduled for tomorrow',
      time: '3 days ago',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'completed') {
      return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
    }
    return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {employeeData.employeeName}! 👋
        </h1>
        <p className="text-green-100 text-lg">
          Manager Dashboard | Department: {employeeData.departmentId}
        </p>
        <div className="mt-4 text-sm text-green-100">
          Current Time: {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Team Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamStats.map((stat, index) => {
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
                    {stat.changeType === 'positive' ? (
                      <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
                    )}
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
        {/* Team Members */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <UserGroupIcon className="w-5 h-5 mr-2 text-blue-600" />
              Team Members
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">{member.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{member.performance}/5.0</p>
                    <p className="text-xs text-gray-500">Performance</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                {getStatusIcon(activity.status)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
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
            <UserGroupIcon className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Team Review</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ChartBarIcon className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Performance</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CalendarIcon className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Schedule</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ClockIcon className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Timesheets</span>
          </button>
        </div>
      </div>
    </div>
  );
}
