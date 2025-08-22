import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/db';
import Employee from '../../../models/Employee';

// GET /api/employees/[id] - Get employee by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    const employee = await Employee.findById(id)
      .select('-loginPassword -otp'); // Exclude sensitive fields
    
    if (!employee) {
      return NextResponse.json(
        { success: false, error: 'Employee not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: employee
    });
    
  } catch (error) {
    console.error('Error fetching employee:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch employee' },
      { status: 500 }
    );
  }
}

// PUT /api/employees/[id] - Update employee
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    const body = await request.json();
    
    // Remove fields that shouldn't be updated
    delete body.employeeId; // employeeId should not be changeable
    delete body.email; // email should not be changeable via this route
    delete body.loginPassword; // password should be updated via separate route
    
    const employee = await Employee.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).select('-loginPassword -otp');
    
    if (!employee) {
      return NextResponse.json(
        { success: false, error: 'Employee not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: employee,
      message: 'Employee updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating employee:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update employee' },
      { status: 500 }
    );
  }
}

// DELETE /api/employees/[id] - Delete employee (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    const employee = await Employee.findByIdAndUpdate(
      id,
      { 
        $set: { 
          employeeStatus: 'Terminated',
          accountStatus: 'Inactive',
          isWorking: false,
          dor: new Date().toISOString().split('T')[0] // Set resignation date
        }
      },
      { new: true }
    ).select('-loginPassword -otp');
    
    if (!employee) {
      return NextResponse.json(
        { success: false, error: 'Employee not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: employee,
      message: 'Employee terminated successfully'
    });
    
  } catch (error) {
    console.error('Error terminating employee:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to terminate employee' },
      { status: 500 }
    );
  }
}
