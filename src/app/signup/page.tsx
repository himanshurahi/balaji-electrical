'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, Mail, Lock, User, Zap, ArrowRight, Loader2, Check } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  terms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { signup, isAuthenticated } = useUser();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (
    values: { name: string; email: string; password: string; confirmPassword: string; terms: boolean },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setError('');
    const success = await signup(values.name, values.email, values.password);
    
    if (success) {
      router.push('/');
    } else {
      setError('Failed to create account. Please try again.');
    }
    setSubmitting(false);
  };

  const passwordRequirements = [
    { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
    { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
    { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-spark-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-electric"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <Zap className="w-10 h-10 text-electric-400" />
              <div>
                <h1 className="font-display text-xl font-bold text-white tracking-wider">
                  BALAJI
                </h1>
                <p className="text-xs text-electric-400 tracking-widest -mt-1">
                  ELECTRICALS
                </p>
              </div>
            </Link>
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-carbon-400">
              Join us for exclusive deals and offers
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Signup Form */}
          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '', terms: false }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched, values }) => (
              <Form className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-carbon-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon-500 pointer-events-none" />
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      placeholder="John Doe"
                      className={`input-electric input-with-icon-left ${
                        errors.name && touched.name ? 'border-red-500 focus:border-red-500' : ''
                      }`}
                    />
                  </div>
                  <ErrorMessage name="name" component="p" className="mt-1 text-sm text-red-400" />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-carbon-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon-500 pointer-events-none" />
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="you@example.com"
                      className={`input-electric input-with-icon-left ${
                        errors.email && touched.email ? 'border-red-500 focus:border-red-500' : ''
                      }`}
                    />
                  </div>
                  <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-400" />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-carbon-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon-500 pointer-events-none" />
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className={`input-electric input-with-icon-both ${
                        errors.password && touched.password ? 'border-red-500 focus:border-red-500' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-carbon-500 hover:text-electric-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Requirements */}
                  {values.password && (
                    <div className="mt-3 space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <Check className={`w-3 h-3 ${req.test(values.password) ? 'text-green-400' : 'text-carbon-600'}`} />
                          <span className={req.test(values.password) ? 'text-green-400' : 'text-carbon-500'}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-400" />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-carbon-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon-500 pointer-events-none" />
                    <Field
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="••••••••"
                      className={`input-electric input-with-icon-both ${
                        errors.confirmPassword && touched.confirmPassword ? 'border-red-500 focus:border-red-500' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-carbon-500 hover:text-electric-400 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="p" className="mt-1 text-sm text-red-400" />
                </div>

                {/* Terms Checkbox */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Field
                      type="checkbox"
                      name="terms"
                      className="w-5 h-5 mt-0.5 rounded border-electric-500/30 bg-carbon-800 accent-electric-500"
                    />
                    <span className="text-sm text-carbon-400">
                      I agree to the{' '}
                      <Link href="/terms" className="text-electric-400 hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-electric-400 hover:underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  <ErrorMessage name="terms" component="p" className="mt-1 text-sm text-red-400" />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-electric flex items-center justify-center gap-2 py-4"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-carbon-400">
            Already have an account?{' '}
            <Link href="/login" className="text-electric-400 hover:text-electric-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

