# Forgot Password Setup Guide

This guide explains how to set up the forgot password functionality with OTP sent to email.

## Features

- ✅ Forgot password request with email validation
- ✅ 6-digit OTP generation and email delivery
- ✅ OTP verification with password reset
- ✅ Secure password validation
- ✅ OTP expiry (10 minutes)
- ✅ Resend OTP functionality
- ✅ Beautiful UI with step-by-step flow

## Email Configuration

### 1. Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update Environment Variables**:
   ```bash
   # Copy env.example to .env.local
   cp env.example .env.local
   ```

4. **Configure Email Settings** in `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   ```

### 2. Other Email Providers

You can use any SMTP provider. Update the environment variables accordingly:

```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
```

## API Endpoints

### 1. Request OTP
```
POST /api/employees/auth/forgot-password
Body: { "email": "user@example.com" }
```

### 2. Reset Password
```
POST /api/employees/auth/reset-password
Body: { 
  "email": "user@example.com", 
  "otp": "123456", 
  "newPassword": "newpassword123" 
}
```

## Database Schema Updates

The Employee model has been updated with:
- `otp`: String field for storing OTP
- `isOtpVerified`: Boolean for OTP verification status
- `otpExpiry`: Date field for OTP expiration

## Usage Flow

1. **User clicks "Forget password?"** on login page
2. **User enters email** and clicks "Send OTP"
3. **System validates email** and sends OTP via email
4. **User enters OTP** and new password
5. **System verifies OTP** and resets password
6. **User is redirected** to login page

## Security Features

- OTP expires after 10 minutes
- Password must be at least 6 characters
- Email validation before OTP generation
- Account status verification
- Secure password hashing with bcrypt

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `/forgot-password`
3. Test with a valid employee email
4. Check email for OTP
5. Complete password reset flow

## Troubleshooting

### Email Not Sending
- Verify SMTP credentials in environment variables
- Check if 2FA is enabled for Gmail
- Ensure app password is correct
- Check console for error messages

### OTP Not Working
- Verify OTP hasn't expired (10 minutes)
- Check if OTP matches exactly
- Ensure email is correct

### Database Issues
- Verify MongoDB connection
- Check if Employee model is properly updated
- Ensure all required fields are present

## Customization

### Email Template
Edit `lib/emailService.ts` to customize:
- Email subject and content
- HTML styling
- Company branding
- OTP format

### OTP Settings
Modify in the API endpoints:
- OTP length (currently 6 digits)
- OTP expiry time (currently 10 minutes)
- OTP generation logic

### UI Styling
Update `app/components/ForgotPassword/ForgotPasswordPage.tsx` for:
- Colors and themes
- Layout adjustments
- Responsive design
- Branding elements
