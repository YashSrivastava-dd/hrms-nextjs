'use client';

import { useState, useEffect } from 'react';
import { 
  UsersIcon, 
  ChartBarIcon, 
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Employee {
  employeeId: string;
  employeeName: string;
  designation: string;
  departmentId: string;
  role: string;
}

interface CeoDashboardProps {
  employeeData: Employee;
}

export default function CeoDashboard({ employeeData }: CeoDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const companyStats = [
    {
      title: 'Total Revenue',
      value: '$2.4M',
      icon: CurrencyDollarIcon,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      title: 'Total Employees',
      value: '156',
      icon: UsersIcon,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      title: 'Active Projects',
      value: '24',
      icon: ChartBarIcon,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      change: '+15.3%',
      changeType: 'positive'
    },
    {
      title: 'Market Share',
      value: '18.7%',
      icon: GlobeAltIcon,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
      change: '+2.1%',
      changeType: 'positive'
    }
  ];

  const departmentPerformance = [
    { name: 'Engineering', revenue: '$850K', growth: '+18%', employees: 45 },
    { name: 'Sales', revenue: '$720K', growth: '+22%', employees: 32 },
    { name: 'Marketing', revenue: '$420K', growth: '+15%', employees: 28 },
    { name: 'Operations', revenue: '$310K', growth: '+12%', employees: 18 }
  ];

  const strategicInitiatives = [
    {
      id: 1,
      title: 'Market Expansion - Asia Pacific',
      status: 'In Progress',
      progress: 65,
      deadline: '2024-Q2',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Product Innovation Pipeline',
      status: 'Planning',
      progress: 30,
      deadline: '2024-Q3',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Digital Transformation',
      status: 'Completed',
      progress: 100,
      deadline: '2024-Q1',
      priority: 'high'
    }
  ];

  const recentBoardUpdates = [
    {
      id: 1,
      action: 'Q4 Financial Results Approved',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      action: 'New Board Member Nomination',
      time: '1 day ago',
      status: 'pending'
    },
    {
      id: 3,
      action: 'Strategic Plan Review Meeting',
      time: '3 days ago',
      status: 'completed'
    }
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'completed') {
      return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
    }
    return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {employeeData.employeeName}! 👋
        </h1>
        <p className="text-indigo-100 text-lg">
          CEO Dashboard | Strategic Overview
        </p>
        <div className="mt-4 text-sm text-indigo-100">
          Current Time: {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Company Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {companyStats.map((stat, index) => {
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
        {/* Department Performance */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <BuildingOfficeIcon className="w-5 h-5 mr-2 text-blue-600" />
              Department Performance
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View Details
            </button>
          </div>
          <div className="space-y-4">
            {departmentPerformance.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-semibold text-blue-600">{dept.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{dept.name}</h3>
                    <p className="text-sm text-gray-500">{dept.employees} employees</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{dept.revenue}</p>
                  <p className="text-sm text-green-600">{dept.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Board Updates */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Board Updates</h2>
          <div className="space-y-4">
            {recentBoardUpdates.map((update) => (
              <div key={update.id} className="flex items-center space-x-3">
                {getStatusIcon(update.status)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{update.action}</p>
                  <p className="text-xs text-gray-500">{update.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Initiatives */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Strategic Initiatives</h2>
        <div className="space-y-4">
          {strategicInitiatives.map((initiative) => (
            <div key={initiative.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium text-gray-900">{initiative.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(initiative.priority)}`}>
                    {initiative.priority}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{initiative.deadline}</p>
                  <p className="text-xs text-gray-500">Deadline</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-gray-900">{initiative.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(initiative.progress)}`}
                    style={{ width: `${initiative.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Status: {initiative.status}</span>
                  <span className="text-xs text-gray-500">{initiative.progress}% Complete</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Executive Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ChartBarIcon className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Financial Report</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <UsersIcon className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Board Meeting</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BuildingOfficeIcon className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Strategy Review</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <GlobeAltIcon className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Market Analysis</span>
          </button>
        </div>
      </div>

      {/* Additional CEO Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Profit Margin</span>
              <span className="text-lg font-semibold text-green-600">24.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cash Flow</span>
              <span className="text-lg font-semibold text-blue-600">$180K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Debt Ratio</span>
              <span className="text-lg font-semibold text-orange-600">0.32</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Position</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Market Cap</span>
              <span className="text-lg font-semibold text-blue-600">$15.2M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Growth Rate</span>
              <span className="text-lg font-semibold text-green-600">18.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Competitors</span>
              <span className="text-lg font-semibold text-purple-600">12</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Operational Excellence</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Customer Satisfaction</span>
              <span className="text-lg font-semibold text-green-600">4.6/5.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Employee Retention</span>
              <span className="text-lg font-semibold text-blue-600">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Project Success</span>
              <span className="text-lg font-semibold text-green-600">87%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
