import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/db';
import Employee from '../../../../models/Employee';
import { sendEmail } from '../../../../../lib/emailService';

// POST /api/employees/auth/forgot-password - Request password reset
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { email } = await request.json();
    
    // Validate input
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
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
    
    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set OTP and expiry (10 minutes from now)
    employee.otp = otp;
    employee.isOtpVerified = false;
    employee.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    await employee.save();
    
    // Send OTP email
    const emailSent = await sendEmail(email, 'forgotPassword', {
      otp: otp,
      employeeName: employee.employeeName
    });
    
    if (!emailSent) {
      // If email fails, remove OTP
      employee.otp = '';
      employee.otpExpiry = undefined;
      await employee.save();
      
      return NextResponse.json(
        { success: false, error: 'Failed to send OTP email. Please try again.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully to your email',
      data: {
        email: email,
        message: 'Please check your email for the OTP'
      }
    });
    
  } catch (error) {
    console.error('Error during forgot password request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
