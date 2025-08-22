import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongoose';
import User from '../../../../models/User';

export async function POST(request) {
  try {
    // Connect to database
    await dbConnect();

    // Get request body
    const { employeeCode, password } = await request.json();

    // Validate input
    if (!employeeCode || !password) {
      return NextResponse.json(
        { error: 'Employee code and password are required' },
        { status: 400 }
      );
    }

    // Find user by employee code or email
    const user = await User.findOne({
      $or: [
        { employeeCode: employeeCode },
        { email: employeeCode }
      ]
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 401 }
      );
    }

    // For now, we'll do a simple password comparison
    // In production, you should use bcrypt to hash and compare passwords
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Return user data (without password)
    const userData = {
      id: user._id,
      employeeCode: user.employeeCode,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      lastLogin: user.lastLogin
    };

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
