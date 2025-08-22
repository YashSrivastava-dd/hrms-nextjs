# Employee Model Documentation

## Overview
The Employee model is a comprehensive MongoDB schema for managing employee information in the HRMS system. It includes personal details, work information, leave balances, and authentication features.

## Model Structure

### Core Employee Fields
- **employeeId**: Unique identifier for the employee (required)
- **employeeName**: Full name of the employee (required)
- **email**: Email address (required, unique)
- **employmentType**: Type of employment (default: "Permanent")
- **employeeStatus**: Current status (default: "Working")
- **accountStatus**: Account status (default: "Active")

### Personal Information
- **gender**: Employee gender
- **dob**: Date of birth
- **placeOfBirth**: Place of birth
- **bloodGroup**: Blood group
- **maritalStatus**: Marital status
- **nationality**: Nationality
- **contactNo**: Contact number
- **residentialAddress**: Current address
- **permanentAddress**: Permanent address

### Work Information
- **departmentId**: Department identifier
- **designation**: Job title
- **doj**: Date of joining
- **dor**: Date of resignation
- **doc**: Date of confirmation
- **team**: Team assignment
- **shiftTime**: Work schedule (startAt, endAt)
- **workingDays**: Number of working days per week
- **managerId**: Manager's employee ID
- **teamLeadId**: Team lead's employee ID

### Leave Balance
The model includes a comprehensive leave balance system:
- **casualLeave**: Casual leave balance
- **medicalLeave**: Medical leave balance
- **earnedLeave**: Earned leave balance
- **paternityLeave**: Paternity leave balance
- **maternityLeave**: Maternity leave balance
- **compOffLeave**: Compensatory off leave
- **optionalLeave**: Optional leave
- **bereavementLeave**: Bereavement leave (default: 5)

### Authentication & Security
- **loginPassword**: Hashed password (default: "12345")
- **otp**: One-time password for verification
- **isOtpVerified**: OTP verification status
- **role**: User role (default: "Employee")

### Status Flags
- **isProbation**: Probation status
- **isNotice**: Notice period status
- **isWorking**: Currently working
- **isInhouse**: In-house employee status

## API Endpoints

### Employee Management
- `GET /api/employees` - Get all employees with pagination and filters
- `POST /api/employees` - Create new employee
- `GET /api/employees/[id]` - Get employee by ID
- `PUT /api/employees/[id]` - Update employee
- `DELETE /api/employees/[id]` - Terminate employee (soft delete)

### Authentication
- `POST /api/employees/auth/login` - Employee login
- `POST /api/employees/auth/verify-otp` - Verify OTP

### Testing
- `GET /api/test-employee` - Test employee model
- `DELETE /api/test-employee` - Clean up test data

## Usage Examples

### Creating an Employee
```typescript
import Employee from '@/app/models/Employee';

const newEmployee = new Employee({
  employeeId: 'EMP001',
  employeeName: 'John Doe',
  email: 'john.doe@example.com',
  employmentType: 'Permanent',
  departmentId: 'DEPT001',
  designation: 'Software Engineer',
  doj: '2024-01-15',
  contactNo: '+1234567890'
});

await newEmployee.save();
```

### Finding Employees
```typescript
// Get all active employees
const activeEmployees = await Employee.find({ 
  isWorking: true, 
  accountStatus: 'Active' 
}).select('-loginPassword -otp');

// Get employee by email
const employee = await Employee.findOne({ email: 'john.doe@example.com' });
```

### Updating Leave Balance
```typescript
import { updateEmployeeLeaveBalance } from '@/lib/employeeUtils';

// Subtract 2 days from casual leave
await updateEmployeeLeaveBalance('EMP001', 'casualLeave', 2, 'subtract');

// Add 5 days to medical leave
await updateEmployeeLeaveBalance('EMP001', 'medicalLeave', 5, 'add');
```

### Authentication
```typescript
// Login
const employee = await Employee.findOne({ email }).select('+loginPassword');
const isValid = await employee.comparePassword(password);

// Generate OTP
const otp = Math.floor(100000 + Math.random() * 900000).toString();
employee.otp = otp;
employee.isOtpVerified = false;
await employee.save();
```

## Database Indexes
The model includes indexes for better query performance:
- `employeeId` (unique)
- `email` (unique)
- `departmentId`
- `managerId`
- `teamLeadId`

## Security Features
- Password hashing using bcrypt (salt rounds: 10)
- OTP-based two-factor authentication
- Sensitive data exclusion in API responses
- Input validation and sanitization

## Validation Rules
- `employeeId` and `email` are required and unique
- `employmentType` is required
- Password is automatically hashed before saving
- Timestamps are automatically managed

## Error Handling
All API endpoints include comprehensive error handling:
- Database connection errors
- Validation errors
- Duplicate key errors
- Not found errors
- Authentication failures

## Best Practices
1. Always use the utility functions for common operations
2. Exclude sensitive fields when returning employee data
3. Use proper error handling and logging
4. Implement proper authentication and authorization
5. Use pagination for large datasets
6. Validate input data before processing
