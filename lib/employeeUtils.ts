import Employee, { IEmployee } from '../app/models/Employee';

// Utility functions for employee operations

export interface EmployeeFilters {
  departmentId?: string;
  employeeStatus?: string;
  employmentType?: string;
  isWorking?: boolean;
  isInhouse?: boolean;
  role?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Get employees with filters and pagination
 */
export async function getEmployeesWithFilters(
  filters: EmployeeFilters = {},
  pagination: PaginationOptions
) {
  const { page, limit, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
  const skip = (page - 1) * limit;
  
  // Build query
  const query: any = {};
  
  if (filters.departmentId) query.departmentId = filters.departmentId;
  if (filters.employeeStatus) query.employeeStatus = filters.employeeStatus;
  if (filters.employmentType) query.employmentType = filters.employmentType;
  if (filters.isWorking !== undefined) query.isWorking = filters.isWorking;
  if (filters.isInhouse !== undefined) query.isInhouse = filters.isInhouse;
  if (filters.role) query.role = filters.role;
  
  // Build sort object
  const sort: any = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
  const employees = await Employee.find(query)
    .select('-loginPassword -otp')
    .skip(skip)
    .limit(limit)
    .sort(sort);
  
  const total = await Employee.countDocuments(query);
  
  return {
    employees,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
}

/**
 * Get employee by ID with sensitive data excluded
 */
export async function getEmployeeById(id: string) {
  return await Employee.findById(id).select('-loginPassword -otp');
}

/**
 * Get employee by email with sensitive data excluded
 */
export async function getEmployeeByEmail(email: string) {
  return await Employee.findOne({ email }).select('-loginPassword -otp');
}

/**
 * Get employee by employee ID with sensitive data excluded
 */
export async function getEmployeeByEmployeeId(employeeId: string) {
  return await Employee.findOne({ employeeId }).select('-loginPassword -otp');
}

/**
 * Update employee leave balance
 */
export async function updateEmployeeLeaveBalance(
  employeeId: string,
  leaveType: keyof IEmployee['leaveBalance'],
  days: number,
  operation: 'add' | 'subtract' = 'subtract'
) {
  const employee = await Employee.findById(employeeId);
  
  if (!employee) {
    throw new Error('Employee not found');
  }
  
  const currentBalance = parseInt(employee.leaveBalance[leaveType] || '0');
  let newBalance: number;
  
  if (operation === 'add') {
    newBalance = currentBalance + days;
  } else {
    newBalance = Math.max(0, currentBalance - days); // Don't go below 0
  }
  
  employee.leaveBalance[leaveType] = newBalance.toString();
  await employee.save();
  
  return employee.leaveBalance;
}

/**
 * Get employees by department
 */
export async function getEmployeesByDepartment(departmentId: string) {
  return await Employee.find({ 
    departmentId, 
    isWorking: true,
    accountStatus: 'Active'
  }).select('-loginPassword -otp');
}

/**
 * Get employees by manager
 */
export async function getEmployeesByManager(managerId: string) {
  return await Employee.find({ 
    managerId, 
    isWorking: true,
    accountStatus: 'Active'
  }).select('-loginPassword -otp');
}

/**
 * Get employees by team lead
 */
export async function getEmployeesByTeamLead(teamLeadId: string) {
  return await Employee.find({ 
    teamLeadId, 
    isWorking: true,
    accountStatus: 'Active'
  }).select('-loginPassword -otp');
}

/**
 * Search employees by name or employee ID
 */
export async function searchEmployees(searchTerm: string, limit: number = 10) {
  const regex = new RegExp(searchTerm, 'i');
  
  return await Employee.find({
    $or: [
      { employeeName: regex },
      { employeeId: regex },
      { employeeCode: regex }
    ],
    isWorking: true,
    accountStatus: 'Active'
  })
  .select('-loginPassword -otp')
  .limit(limit)
  .sort({ employeeName: 1 });
}

/**
 * Get employee statistics
 */
export async function getEmployeeStatistics() {
  const totalEmployees = await Employee.countDocuments();
  const activeEmployees = await Employee.countDocuments({ 
    isWorking: true, 
    accountStatus: 'Active' 
  });
  const terminatedEmployees = await Employee.countDocuments({ 
    employeeStatus: 'Terminated' 
  });
  const probationEmployees = await Employee.countDocuments({ 
    isProbation: true,
    isWorking: true,
    accountStatus: 'Active'
  });
  
  return {
    total: totalEmployees,
    active: activeEmployees,
    terminated: terminatedEmployees,
    probation: probationEmployees
  };
}
