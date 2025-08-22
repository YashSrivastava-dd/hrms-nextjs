import nodemailer from 'nodemailer';

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  // Performance optimizations
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 5000,    // 5 seconds
  socketTimeout: 10000,     // 10 seconds
  pool: true,               // Use connection pooling
  maxConnections: 5,        // Limit concurrent connections
  maxMessages: 100,         // Messages per connection
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Email templates
const emailTemplates = {
  forgotPassword: (otp: string, employeeName: string) => ({
    subject: 'Password Reset OTP - DD Healthcare HRMS',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">DD Healthcare HRMS</h1>
          <p style="color: #6b7280; margin: 10px 0;">Password Reset Request</p>
        </div>
        
        <div style="background-color: #f8fafc; border-radius: 8px; padding: 30px; margin-bottom: 20px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0;">Hello ${employeeName},</h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            We received a request to reset your password for your DD Healthcare HRMS account. 
            Please use the following OTP to complete the password reset process:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: #2563eb; color: white; font-size: 32px; font-weight: bold; 
                        padding: 20px; border-radius: 8px; letter-spacing: 8px; display: inline-block;">
              ${otp}
            </div>
          </div>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            <strong>Important:</strong>
          </p>
          <ul style="color: #374151; line-height: 1.6; margin-bottom: 20px; padding-left: 20px;">
            <li>This OTP is valid for 10 minutes only</li>
            <li>Do not share this OTP with anyone</li>
            <li>If you didn't request this password reset, please ignore this email</li>
          </ul>
          
          <p style="color: #374151; line-height: 1.6;">
            If you have any questions or need assistance, please contact your HR department.
          </p>
        </div>
        
        <div style="text-align: center; color: #6b7280; font-size: 14px;">
          <p>This is an automated message, please do not reply to this email.</p>
          <p>&copy; 2024 DD Healthcare. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `
      DD Healthcare HRMS - Password Reset Request
      
      Hello ${employeeName},
      
      We received a request to reset your password for your DD Healthcare HRMS account. 
      Please use the following OTP to complete the password reset process:
      
      OTP: ${otp}
      
      Important:
      - This OTP is valid for 10 minutes only
      - Do not share this OTP with anyone
      - If you didn't request this password reset, please ignore this email
      
      If you have any questions or need assistance, please contact your HR department.
      
      This is an automated message, please do not reply to this email.
      
      © 2024 DD Healthcare. All rights reserved.
    `
  })
};

// Send email function
interface EmailData {
  otp: string;
  employeeName: string;
}

export const sendEmail = async (
  to: string,
  template: keyof typeof emailTemplates,
  data: EmailData
): Promise<boolean> => {
  try {
    const emailTemplate = emailTemplates[template](data.otp, data.employeeName);
    
    const mailOptions = {
      from: `"DD Healthcare HRMS" <${emailConfig.auth.user}>`,
      to: to,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Verify email configuration
export const verifyEmailConfig = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log('Email configuration verified successfully');
    return true;
  } catch (error) {
    console.error('Email configuration verification failed:', error);
    return false;
  }
};

export default transporter;
