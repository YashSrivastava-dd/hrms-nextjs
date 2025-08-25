'use client';

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BellIcon,
  UserPlusIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ClockIcon as ClockIconSolid
} from '@heroicons/react/24/outline';

const LeaveCard = ({ title, value, textColor, borderColor }: {
  title: string;
  value: number;
  textColor: string;
  borderColor: string;
}) => (
  <div className={`p-4 sm:p-6 rounded-lg bg-gray-50 border-2 ${borderColor} hover:shadow-md transition-all duration-200`} role="region" aria-label={`${title} Leave`}>
    <p className={`text-2xl sm:text-3xl md:text-4xl font-bold ${textColor} mb-2`}>{value}</p>
    <h3 className="text-sm sm:text-base font-medium text-gray-700">{title}</h3>
  </div>
 );

// Announcements Component
const AnnouncementsSection = ({ announcements }: { announcements: Array<{
  title?: string;
  description: string;
  dateTime: string;
  location?: string;
  imageUrl?: string | null;
}> }) => {
  const [expandedAnnouncement, setExpandedAnnouncement] = useState<number | null>(null);
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);

  // Use real announcements data
  const displayAnnouncements = announcements || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleAnnouncement = (index: number) => {
    setExpandedAnnouncement(expandedAnnouncement === index ? null : index);
  };

  const toggleShowAll = () => {
    setShowAllAnnouncements(!showAllAnnouncements);
  };

  if (!displayAnnouncements || displayAnnouncements.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BellIcon className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Announcements</h3>
        </div>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BellIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Announcements</h4>
          <p className="text-gray-500">There are no announcements at the moment.</p>
        </div>
      </div>
    );
  }

  const displayedAnnouncements = showAllAnnouncements ? displayAnnouncements : displayAnnouncements.slice(0, 3);
  const hasMoreAnnouncements = displayAnnouncements.length > 3;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BellIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Announcements</h3>
            <p className="text-sm text-gray-600">{displayAnnouncements.length} announcement{displayAnnouncements.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        {hasMoreAnnouncements && (
          <button
            onClick={toggleShowAll}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            {showAllAnnouncements ? (
              <>
                <ChevronUpIcon className="w-4 h-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDownIcon className="w-4 h-4" />
                Show All ({displayAnnouncements.length})
              </>
            )}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {displayedAnnouncements.map((announcement, index) => (
          <div
            key={index}
            className={`border border-gray-200 rounded-lg transition-all duration-200 ${
              expandedAnnouncement === index ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
            }`}
          >
            <div
              className="p-4 cursor-pointer"
              onClick={() => toggleAnnouncement(index)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {announcement.description}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formatDate(announcement.dateTime)}
                  </p>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  {announcement.imageUrl && (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <img 
                        src={announcement.imageUrl} 
                        alt="Announcement" 
                        className="w-6 h-6 rounded object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    {expandedAnnouncement === index ? (
                      <ChevronUpIcon className="w-4 h-4" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedAnnouncement === index && (
              <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
                <div className="pt-4">
                  <div className="space-y-3">
                    {announcement.title && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Title</h5>
                        <p className="text-sm text-gray-900">{announcement.title}</p>
                      </div>
                    )}
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Description</h5>
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">{announcement.description}</p>
                    </div>
                    {announcement.location && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Location</h5>
                        <p className="text-sm text-gray-900">{announcement.location}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gray-500">
                        Published: {formatDate(announcement.dateTime)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAnnouncement(index);
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View All Modal */}
      {showAllAnnouncements && hasMoreAnnouncements && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={toggleShowAll}
            className="w-full py-3 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            Show Less Announcements
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Showing all {displayAnnouncements.length} announcements
          </p>
        </div>
      )}
    </div>
  );
};

// Attendance Card Component with Dropdown
const AttendanceCard = ({ attendanceData, date, isLoading }: {
  attendanceData: {
    AttendanceStatus?: string;
    InTime?: string;
    OutTime?: string;
    PunchRecords?: string;
  } | null;
  date: string;
  isLoading: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '--:--';
    // Extract time from format like "09:13 (IN 1)" or "18:31 (OUT 1)"
    const timeMatch = timeString.match(/(\d{2}:\d{2})/);
    return timeMatch ? timeMatch[1] : timeString;
  };

  const getPunchType = (punchString: string) => {
    if (punchString.includes("(IN")) return "IN";
    if (punchString.includes("(OUT")) return "OUT";
    return "UNKNOWN";
  };

  // Deduplicate and clean punch records
  const cleanPunchRecords = (punchRecords: string) => {
    if (!punchRecords) return [];
    
    // Split and clean punch records
    const punches = punchRecords
      .split(",")
      .map(p => p.trim())
      .filter(p => p.length > 0); // Remove empty entries
    
    // Remove duplicates while preserving order
    const uniquePunches: string[] = [];
    const seen = new Set();
    
    punches.forEach(punch => {
      // Normalize the punch record for comparison
      const normalized = punch.replace(/\s+/g, ' ').trim();
      if (!seen.has(normalized)) {
        seen.add(normalized);
        uniquePunches.push(punch);
      }
    });
    
    return uniquePunches;
  };

  const calculateTotalHours = (punchRecords: string) => {
    if (!punchRecords) return "00:00";
    
    const punches = cleanPunchRecords(punchRecords);
    const inTimes = punches.filter(p => p.includes("(IN")).map(p => formatTime(p));
    const outTimes = punches.filter(p => p.includes("(OUT")).map(p => formatTime(p));
    
    if (inTimes.length === 0 || outTimes.length === 0) return "00:00";
    
    // Calculate total hours from first in and last out
    const firstIn = inTimes[0];
    const lastOut = outTimes[outTimes.length - 1];
    
    if (!firstIn || !lastOut) return "00:00";
    
    const inMinutes = parseInt(firstIn.split(':')[0]) * 60 + parseInt(firstIn.split(':')[1]);
    const outMinutes = parseInt(lastOut.split(':')[0]) * 60 + parseInt(lastOut.split(':')[1]);
    
    const totalMinutes = outMinutes - inMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
        <div className="flex justify-between items-center mb-3">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    );
  }

  if (!attendanceData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="text-center py-6">
          <ClockIconSolid className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No attendance data available</p>
        </div>
      </div>
    );
  }

  const totalHours = calculateTotalHours(attendanceData.PunchRecords);
  const punchRecords = cleanPunchRecords(attendanceData.PunchRecords);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header - Always visible */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Attendance Summary</h3>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <ClockIconSolid className="w-4 h-4 text-blue-500" />
              <span>{totalHours}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Effective Hours</p>
          </div>
        </div>

        {/* Status and Times */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-600 font-medium mb-1">Status</p>
            <p className="text-sm font-semibold text-blue-800">
              {attendanceData.AttendanceStatus || 'Not Available'}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs text-green-600 font-medium mb-1">First In</p>
            <p className="text-sm font-semibold text-green-800">
              {attendanceData.InTime ? formatTime(attendanceData.InTime) : '--:--'}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <p className="text-xs text-red-600 font-medium mb-1">Last Out</p>
            <p className="text-sm font-semibold text-red-800">
              {attendanceData.OutTime ? formatTime(attendanceData.OutTime) : '--:--'}
            </p>
          </div>
        </div>

        {/* Expandable Punch Records */}
        {punchRecords.length > 0 && (
          <div className="border-t border-gray-100 pt-3">
            <button
              onClick={toggleExpanded}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl p-3 transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <ClockIconSolid className="w-4 h-4 text-blue-500" />
                Punch Records ({punchRecords.length})
              </span>
              {isExpanded ? (
                <ArrowsPointingInIcon className="w-4 h-4 text-blue-500" />
              ) : (
                <ArrowsPointingOutIcon className="w-4 h-4 text-blue-500" />
              )}
            </button>

            {/* Dropdown Content */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="mt-3 max-h-64 overflow-y-auto pr-2 space-y-3">
                {punchRecords.map((punch, index) => {
                  const punchType = getPunchType(punch);
                  const time = formatTime(punch);
                  const isIn = punchType === "IN";
                  
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 shadow-sm ${
                        isIn 
                          ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                          : 'bg-red-50 border-red-200 hover:bg-red-100'
                      } transition-colors duration-200`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          isIn ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <p className={`text-sm font-semibold ${
                            isIn ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {isIn ? 'Check In' : 'Check Out'}
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            Record #{index + 1}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{time}</p>
                        <p className={`text-xs font-semibold ${
                          isIn ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {punchType}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ComprehensiveDashboard() {
  // Mock employee data for demonstration
  const employeeData = {
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    designation: 'Software Developer',
    departmentId: 'Engineering',
    role: 'Employee',
    leaveBalance: {
      casualLeave: 15,
      medicalLeave: 10,
      earnedLeave: 20,
      compOffLeave: 5
    },
    employmentType: 'Permanent'
  };

  // Mock data for demonstration - replace with real API calls
  const attendanceData = {
    AttendanceStatus: 'Present',
    InTime: '09:13 (IN 1)',
    OutTime: '18:31 (OUT 1)',
    PunchRecords: '09:13 (IN 1), 12:30 (OUT 1), 13:30 (IN 2), 18:31 (OUT 2)'
  };
  const attendanceLoading = false;
  const announcementData = [
    {
      title: 'Company Holiday Schedule',
      description: 'Office will be closed from Dec 24-26 for Christmas holidays. All employees are requested to plan their work accordingly.',
      dateTime: '2024-12-20T10:00:00',
      location: 'Main Office',
      imageUrl: null
    },
    {
      title: 'New Health Insurance Benefits',
      description: 'Updated health insurance coverage effective from January 1st. Please review the new benefits package.',
      dateTime: '2024-12-18T14:30:00',
      location: 'HR Department',
      imageUrl: null
    }
  ];
  const selectedDayData = null;
  const selectedDayDate = null;

  const userRole = employeeData.role || 'Employee';
  const isAdmin = userRole === 'Super-Admin' || userRole === 'HR-Admin';

  return (
    <div className="w-full flex flex-col min-h-full overflow-x-hidden">
      <main className="space-y-6 flex-1">
        {/* Leave Balance Section - Only for non-admin users */}
        {!isAdmin && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BriefcaseIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Leave Balance</h3>
                  <p className="text-sm text-gray-600">Available leave days</p>
                </div>
              </div>
              {employeeData.employmentType !== "Contractual" && (
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <UserPlusIcon className="w-4 h-4" />
                  Apply Leave
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <LeaveCard 
                title="Casual" 
                value={employeeData.leaveBalance?.casualLeave || 0} 
                textColor="text-green-600" 
                borderColor="border-green-200" 
              />
              <LeaveCard 
                title="Medical" 
                value={employeeData.leaveBalance?.medicalLeave || 0} 
                textColor="text-blue-600" 
                borderColor="border-blue-200" 
              />
              <LeaveCard 
                title="Earned" 
                value={employeeData.leaveBalance?.earnedLeave || 0} 
                textColor="text-yellow-600" 
                borderColor="border-yellow-200" 
              />
              <LeaveCard 
                title="Comp-Off" 
                value={employeeData.leaveBalance?.compOffLeave || 0} 
                textColor="text-red-600" 
                borderColor="border-red-200" 
              />
            </div>
          </div>
        )}

        {/* Monthly Attendance Section - Only for non-admin users */}
        {!isAdmin && (
          <>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">Monthly Attendance</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md lg:col-span-2 w-full">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-800">Calendar</h3>
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <p className="text-gray-600">Calendar component will be implemented here</p>
                  <p className="text-sm text-gray-500 mt-2">This will show attendance patterns and allow day selection</p>
                </div>
              </div>
              <div className="lg:col-span-1 w-full">
                <div className="h-full w-full">
                  <AttendanceCard 
                    attendanceData={selectedDayData || attendanceData}
                    date={selectedDayDate || 'Today'}
                    isLoading={attendanceLoading}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Announcements Section - Only for non-admin users */}
        {!isAdmin && (
          <AnnouncementsSection announcements={announcementData} />
        )}
      </main>
    </div>
  );
}
