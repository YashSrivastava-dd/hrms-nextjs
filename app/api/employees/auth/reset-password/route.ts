import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/db';
import Employee from '../../../../models/Employee';

// POST /api/employees/auth/reset-password - Reset password with OTP
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { email, otp, newPassword } = await request.json();
    
    // Validate input
    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Email, OTP, and new password are required' },
        { status: 400 }
      );
    }
    
    // Validate password strength
    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }
    
    // Find employee by email
    const employee = await Employee.findOne({ email: email });
    
    if (!employee) {
      return NextResponse.json(
        { success: false, error: 'No account found with this email address' },
        { status: 404 }
      );
    }
    
    // Check if account is active
    if (employee.accountStatus !== 'Active') {
      return NextResponse.json(
        { success: false, error: 'Account is not active' },
        { status: 401 }
      );
    }
    
    // Check if OTP is verified
    if (!employee.isOtpVerified) {
      return NextResponse.json(
        { success: false, error: 'OTP must be verified first. Please verify your OTP before resetting password.' },
        { status: 400 }
      );
    }
    
    // Verify OTP matches
    if (employee.otp !== otp) {
      return NextResponse.json(
        { success: false, error: 'Invalid OTP' },
        { status: 400 }
      );
    }
    
    // Update password
    employee.loginPassword = newPassword;
    employee.otp = '';
    employee.otpExpiry = undefined;
    employee.isOtpVerified = false;
    
    await employee.save();
    
    return NextResponse.json({
      success: true,
      message: 'Password reset successfully',
      data: {
        message: 'Your password has been reset successfully. You can now login with your new password.'
      }
    });
    
  } catch (error) {
    console.error('Error during password reset:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset password. Please try again.' },
      { status: 500 }
    );
  }
}
