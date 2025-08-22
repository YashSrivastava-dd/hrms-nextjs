import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongoose';

export async function GET() {
  try {
    // Test database connection
    await dbConnect();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Database connection failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
