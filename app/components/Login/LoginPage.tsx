'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginIdentifier, setLoginIdentifier] = useState('EMP001');
  const [password, setPassword] = useState('12345');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      window.location.href = '/dashboard';
    }
  }, [isAuthenticated, authLoading]);

  // Array of login avatar images
  const loginImages = [
    '/assets/Image/loginavatar.jpg',
    '/assets/Image/loginavatar2.jpg',
    '/assets/Image/loginavatar3.jpg'
  ];

    // Auto-change images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % loginImages.length);
  }, 2000);

    return () => clearInterval(interval);
  }, [loginImages.length]);

  // Show loading if auth is checking
  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    console.log('Attempting login with:', { loginIdentifier, password });

    try {
      const response = await fetch('/api/employees/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginIdentifier,
          password,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log('Login successful:', data);
        
        // Use AuthContext to login
        login(data.data.employee);
        
        // Show success message briefly
        alert('Login successful! Welcome ' + data.data.employee.employeeName);
        
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        // Login failed
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section - Onboarding Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-12">
        <div className="max-w-md text-center">
          {/* Main Illustration Image with Auto-Changer */}
          <div className="mb-8">
            <Image
              src={loginImages[currentImageIndex]}
              alt="Onboarding illustration showing person working with technology"
              width={400}
              height={400}
              className="mx-auto rounded-lg shadow-lg transition-opacity duration-500"
              priority
            />
            {/* Image indicator dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {loginImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Onboarding New Talent with Digital HRMS
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need in an easily customizable dashboard.
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Image
              src="/assets/Icon/ddHealthcare.png"
              alt="DD Healthcare Logo"
              width={128}
              height={128}
              className="mx-auto mb-6"
              priority
            />
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
            <p className="text-gray-600">Please enter your details</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email/Employee Code Field */}
            <div>
              <label htmlFor="loginIdentifier" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address or Employee Code
              </label>
              <input
                type="text"
                id="loginIdentifier"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black placeholder-gray-500"
                placeholder="Enter your email or employee code"
                disabled={isLoading}
              />
              <p className="mt-1 text-xs text-gray-500">
                You can login using either your email address or employee code
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black placeholder-gray-500"
                  placeholder="Enter password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember Me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>



            {/* Forgot Password Link */}
            <div className="text-center">
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Forget password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
