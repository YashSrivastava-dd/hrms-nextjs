import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import Employee, { IEmployee } from '../../models/Employee';

// GET /api/employees - Get all employees
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const department = searchParams.get('department');
    const status = searchParams.get('status');
    
    // Build query
    const query: any = {};
    if (department) query.departmentId = department;
    if (status) query.employeeStatus = status;
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Execute query with pagination
    const employees = await Employee.find(query)
      .select('-loginPassword -otp') // Exclude sensitive fields
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    // Get total count for pagination
    const total = await Employee.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: employees,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
}

// POST /api/employees - Create new employee
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.employeeId || !body.employeeName || !body.email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if employee already exists
    const existingEmployee = await Employee.findOne({
      $or: [
        { employeeId: body.employeeId },
        { email: body.email }
      ]
    });
    
    if (existingEmployee) {
      return NextResponse.json(
        { success: false, error: 'Employee ID or email already exists' },
        { status: 409 }
      );
    }
    
    // Create new employee
    const employee = new Employee(body);
    await employee.save();
    
    // Return employee without sensitive data
    const employeeResponse = employee.toObject() as any;
    delete employeeResponse.loginPassword;
    delete employeeResponse.otp;
    
    return NextResponse.json({
      success: true,
      data: employeeResponse,
      message: 'Employee created successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create employee' },
      { status: 500 }
    );
  }
}
