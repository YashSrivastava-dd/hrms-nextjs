import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';

// Interface for Leave Balance
export interface ILeaveBalance {
  casualLeave: string;
  medicalLeave: string;
  earnedLeave: string;
  paternityLeave: string;
  maternityLeave: string;
  compOffLeave: string;
  optionalLeave: string;
  bereavementLeave: string;
}

// Interface for Shift Time
export interface IShiftTime {
  startAt: string;
  endAt: string;
}

// Interface for Employee Document
export interface IEmployee extends Document {
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  gender: string;
  departmentId: string;
  designation: string;
  doj: string; // Date of Joining
  dor: string; // Date of Resignation
  doc: string; // Date of Confirmation
  employeeCodeInDevice: string;
  employmentType: string;
  employeeStatus: string;
  accountStatus: string;
  employeeDevicePassword?: string;
  employeeDeviceGroup?: string;
  fatherName: string;
  motherName: string;
  residentialAddress: string;
  permanentAddress: string;
  contactNo: string;
  email: string;
  dob: string; // Date of Birth
  placeOfBirth: string;
  recordStatus: number;
  bloodGroup: string;
  workPlace: string;
  extensionNo: string;
  loginPassword: string;
  team: string;
  shiftTime: IShiftTime;
  aadhaarNumber: string;
  employeePhoto: string;
  masterDeviceId: number;
  maritalStatus: string;
  nationality: string;
  overallExperience: string;
  qualifications: string;
  emergencyContact: string;
  managerId: string;
  teamLeadId: string;
  workingDays: string;
  pancardNo: string;
  maxRegularization: string;
  maxShortLeave: string;
  otp: string;
  isOtpVerified: boolean;
  leaveBalance: ILeaveBalance;
  role: string;
  isProbation: boolean;
  isNotice: boolean;
  isWorking: boolean;
  isInhouse: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Leave Balance Schema
const leaveBalanceSchema = new Schema<ILeaveBalance>({
  casualLeave: { type: String, default: "0" },
  medicalLeave: { type: String, default: "0" },
  earnedLeave: { type: String, default: "0" },
  paternityLeave: { type: String, default: "0" },
  maternityLeave: { type: String, default: "0" },
  compOffLeave: { type: String, default: "0" },
  optionalLeave: { type: String, default: "0" },
  bereavementLeave: { type: String, default: "5" },
});

// Employee Schema
const employeeSchema = new Schema<IEmployee>({
  employeeId: { type: String, required: true, unique: true },
  employeeName: { type: String, required: true },
  employeeCode: { type: String, default: "" },
  gender: { type: String, default: "" },
  departmentId: { type: String, default: "0" },
  designation: { type: String, default: "" },
  doj: { type: String, default: "" },
  dor: { type: String, default: "" },
  doc: { type: String, default: "" },
  employeeCodeInDevice: { type: String, default: "NA" },
  employmentType: { type: String, default: "Permanent", required: true },
  employeeStatus: { type: String, default: "Working" },
  accountStatus: { type: String, default: "Active" },
  employeeDevicePassword: { type: String },
  employeeDeviceGroup: { type: String },
  fatherName: { type: String, default: "" },
  motherName: { type: String, default: "" },
  residentialAddress: { type: String, default: "" },
  permanentAddress: { type: String, default: "" },
  contactNo: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  dob: { type: String, default: "" },
  placeOfBirth: { type: String, default: "" },
  recordStatus: { type: Number, default: 1 },
  bloodGroup: { type: String, default: "" },
  workPlace: { type: String, default: "" },
  extensionNo: { type: String, default: "" },
  loginPassword: { type: String, default: "12345" },
  team: { type: String, default: "" },
  shiftTime: {
    startAt: { type: String, default: "" },
    endAt: { type: String, default: "" }
  },
  aadhaarNumber: { type: String, default: "" },
  employeePhoto: { type: String, default: "" },
  masterDeviceId: { type: Number, default: 0 },
  maritalStatus: { type: String, default: "" },
  nationality: { type: String, default: "" },
  overallExperience: { type: String, default: "" },
  qualifications: { type: String, default: "" },
  emergencyContact: { type: String, default: "" },
  managerId: { type: String, default: "" },
  teamLeadId: { type: String, default: "" },
  workingDays: { type: String, default: "5" },
  pancardNo: { type: String, default: "" },
  maxRegularization: { type: String, default: "2" },
  maxShortLeave: { type: String, default: "1" },
  otp: { type: String, default: "" },
  isOtpVerified: { type: Boolean, default: false },
  leaveBalance: { type: leaveBalanceSchema, default: () => ({}) },
  role: {
    type: String,
    default: "Employee",
  },
  isProbation: { type: Boolean, default: false },
  isNotice: { type: Boolean, default: false },
  isWorking: { type: Boolean, default: true },
  isInhouse: { type: Boolean, default: true },
}, {
  timestamps: true
});

// Pre-save hook to hash password
employeeSchema.pre('save', async function (next) {
  if (!this.isModified('loginPassword')) return next();
  
  try {
    const saltRounds = 10;
    this.loginPassword = await bcrypt.hash(this.loginPassword, saltRounds);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password
employeeSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.loginPassword);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Create indexes for better query performance
employeeSchema.index({ employeeId: 1 });
employeeSchema.index({ email: 1 });
employeeSchema.index({ departmentId: 1 });
employeeSchema.index({ managerId: 1 });
employeeSchema.index({ teamLeadId: 1 });

// Check if model already exists to prevent overwriting
const Employee: Model<IEmployee> = mongoose.models.Employee || mongoose.model<IEmployee>('Employee', employeeSchema);

export default Employee;
