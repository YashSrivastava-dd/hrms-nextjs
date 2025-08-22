import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/db';
import Employee from '../../../../models/Employee';

// POST /api/employees/auth/verify-otp - Verify OTP
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { email, otp } = await request.json();
    
    // Validate input
    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: 'Email/Employee Code and OTP are required' },
        { status: 400 }
      );
    }
    
    // Find employee by email or employee code
    const employee = await Employee.findOne({
      $or: [
        { email: email },
        { employeeId: email }
      ]
    });
    
    if (!employee) {
      return NextResponse.json(
        { success: false, error: 'Employee not found' },
        { status: 404 }
      );
    }
    
    // Check if OTP matches
    if (employee.otp !== otp) {
      return NextResponse.json(
        { success: false, error: 'Invalid OTP' },
        { status: 400 }
      );
    }
    
    // Check if OTP is expired (optional: you can add expiration logic)
    // For now, we'll just verify the OTP
    
    // Mark OTP as verified
    employee.isOtpVerified = true;
    employee.otp = ''; // Clear OTP after successful verification
    await employee.save();
    
    // Return success response
    const employeeResponse = employee.toObject() as any;
    delete employeeResponse.loginPassword;
    delete employeeResponse.otp;
    
    return NextResponse.json({
      success: true,
      data: {
        employee: employeeResponse,
        message: 'OTP verified successfully',
        isAuthenticated: true
      }
    });
    
  } catch (error) {
    console.error('Error during OTP verification:', error);
    return NextResponse.json(
      { success: false, error: 'OTP verification failed' },
      { status: 500 }
    );
  }
}
