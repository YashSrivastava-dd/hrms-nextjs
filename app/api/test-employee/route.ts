import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import Employee from '../../models/Employee';

// GET /api/test-employee - Test employee model and database connection
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Test creating a sample employee
    const sampleEmployee = new Employee({
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      email: 'john.doe@example.com',
      employmentType: 'Permanent',
      departmentId: 'DEPT001',
      designation: 'Software Engineer',
      doj: '2024-01-15',
      contactNo: '+1234567890',
      loginPassword: '12345', // Explicitly set password to trigger hashing
      shiftTime: {
        startAt: '09:00',
        endAt: '18:00'
      },
      leaveBalance: {
        casualLeave: '12',
        medicalLeave: '15',
        earnedLeave: '30',
        paternityLeave: '15',
        maternityLeave: '180',
        compOffLeave: '0',
        optionalLeave: '0',
        bereavementLeave: '5'
      }
    });
    
    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ employeeId: 'EMP001' });
    
    if (existingEmployee) {
      // If exists, return the existing employee
      const employeeResponse = existingEmployee.toObject() as any;
      delete employeeResponse.loginPassword;
      delete employeeResponse.otp;
      
      return NextResponse.json({
        success: true,
        message: 'Employee model is working correctly',
        data: {
          existingEmployee: employeeResponse,
          message: 'Sample employee already exists in database'
        }
      });
    }
    
    // Save the sample employee
    await sampleEmployee.save();
    
    // Return the created employee
    const employeeResponse = sampleEmployee.toObject() as any;
    delete employeeResponse.loginPassword;
    delete employeeResponse.otp;
    
    return NextResponse.json({
      success: true,
      message: 'Employee model is working correctly',
      data: {
        createdEmployee: employeeResponse,
        message: 'Sample employee created successfully'
      }
    });
    
  } catch (error) {
    console.error('Error testing employee model:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Employee model test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/test-employee - Clean up test data
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Remove test employee
    const result = await Employee.deleteOne({ employeeId: 'EMP001' });
    
    return NextResponse.json({
      success: true,
      message: 'Test data cleaned up',
      data: {
        deletedCount: result.deletedCount
      }
    });
    
  } catch (error) {
    console.error('Error cleaning up test data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to clean up test data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
