'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  HomeIcon, 
  UsersIcon, 
  ChartBarIcon, 
  CalendarIcon, 
  CogIcon, 
  DocumentTextIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface Employee {
  employeeId: string;
  employeeName: string;
  designation: string;
  departmentId: string;
  role: string;
}

interface SidebarProps {
  employeeData: Employee;
}

export default function Sidebar({ employeeData }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const getRoleBasedMenuItems = () => {
    const baseItems = [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: HomeIcon,
        roles: ['Employee', 'Manager', 'HR-Admin', 'CEO']
      },
      {
        name: 'Profile',
        href: '/dashboard/profile',
        icon: UsersIcon,
        roles: ['Employee', 'Manager', 'HR-Admin', 'CEO']
      },
      {
        name: 'Leave Management',
        href: '/dashboard/leave',
        icon: CalendarIcon,
        roles: ['Employee', 'Manager', 'HR-Admin', 'CEO']
      },
      {
        name: 'Attendance',
        href: '/dashboard/attendance',
        icon: ClockIcon,
        roles: ['Employee', 'Manager', 'HR-Admin', 'CEO']
      }
    ];

    const managerItems = [
      {
        name: 'Team Management',
        href: '/dashboard/team',
        icon: UserGroupIcon,
        roles: ['Manager', 'HR-Admin', 'CEO']
      },
      {
        name: 'Performance Reviews',
        href: '/dashboard/performance',
        icon: ChartBarIcon,
        roles: ['Manager', 'HR-Admin', 'CEO']
      }
    ];

    const hrItems = [
      {
        name: 'Employee Directory',
        href: '/dashboard/employees',
        icon: UsersIcon,
        roles: ['HR-Admin', 'CEO']
      },
      {
        name: 'Recruitment',
        href: '/dashboard/recruitment',
        icon: UserGroupIcon,
        roles: ['HR-Admin', 'CEO']
      },
      {
        name: 'Payroll',
        href: '/dashboard/payroll',
        icon: DocumentTextIcon,
        roles: ['HR-Admin', 'CEO']
      },
      {
        name: 'Reports & Analytics',
        href: '/dashboard/reports',
        icon: ChartBarIcon,
        roles: ['HR-Admin', 'CEO']
      }
    ];

    const ceoItems = [
      {
        name: 'Company Overview',
        href: '/dashboard/company',
        icon: BuildingOfficeIcon,
        roles: ['CEO']
      },
      {
        name: 'Strategic Reports',
        href: '/dashboard/strategic',
        icon: ChartBarIcon,
        roles: ['CEO']
      }
    ];

    return [...baseItems, ...managerItems, ...hrItems, ...ceoItems];
  };

  const menuItems = getRoleBasedMenuItems();
  const userRole = employeeData.role || 'Employee';

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center">
            <Image
              src="/assets/Icon/ddHealthcare.png"
              alt="DD Healthcare Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <span className="text-lg font-semibold text-gray-800">HRMS</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-900 truncate">
              {employeeData.employeeName}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {employeeData.designation}
            </p>
            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-1">
              {userRole}
            </span>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems
          .filter(item => item.roles.includes(userRole))
          .map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
      </nav>

      {/* Settings Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <Link
          href="/dashboard/settings"
          className={`flex items-center px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900 ${
            isActive('/dashboard/settings') ? 'bg-blue-50 text-blue-700' : ''
          }`}
        >
          <CogIcon className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 text-sm font-medium">Settings</span>
          )}
        </Link>
      </div>
    </div>
  );
}
