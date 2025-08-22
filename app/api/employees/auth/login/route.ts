import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/db';
import Employee from '../../../../models/Employee';

// POST /api/employees/auth/login - Employee login
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { email, password } = await request.json();
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email/Employee Code and password are required' },
        { status: 400 }
      );
    }
    
    // Find employee by email or employee code
    const employee = await Employee.findOne({
      $or: [
        { email: email },
        { employeeId: email }
      ]
    }).select('+loginPassword');
    
    if (!employee) {
      return NextResponse.json(
        { success: false, error: 'Invalid email/employee code or password' },
        { status: 401 }
      );
    }
    
    // Check if account is active
    if (employee.accountStatus !== 'Active') {
      return NextResponse.json(
        { success: false, error: 'Account is not active' },
        { status: 401 }
      );
    }
    
    // Check if employee is working
    if (!employee.isWorking) {
      return NextResponse.json(
        { success: false, error: 'Employee is not currently working' },
        { status: 401 }
      );
    }
    
    // Verify password
    const isPasswordValid = await employee.comparePassword(password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Generate OTP for additional security (optional)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    employee.otp = otp;
    employee.isOtpVerified = false;
    await employee.save();
    
    // Return employee data without sensitive information
    const employeeResponse = employee.toObject() as any;
    delete employeeResponse.loginPassword;
    delete employeeResponse.otp;
    
    return NextResponse.json({
      success: true,
      data: {
        employee: employeeResponse,
        message: 'Login successful',
        requiresOtp: true,
        otpSent: true
      }
    });
    
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}
