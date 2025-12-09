'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Settings,
  ChevronRight,
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Bell,
  CreditCard,
  LogOut,
  Save,
  Plus,
  Trash2,
  Check,
  Loader2,
  Edit2,
  X,
} from 'lucide-react';
import { useUser, Address } from '@/context/UserContext';

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[+]?[\d\s-]{10,}$/, 'Invalid phone number')
    .nullable(),
});

const AddressSchema = Yup.object().shape({
  name: Yup.string().required('Address label is required'),
  phone: Yup.string()
    .matches(/^[+]?[\d\s-]{10,}$/, 'Invalid phone number')
    .required('Phone is required'),
  street: Yup.string().required('Street address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string()
    .matches(/^\d{6}$/, 'Invalid pincode')
    .required('Pincode is required'),
});

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});

type TabType = 'profile' | 'addresses' | 'security' | 'notifications';

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isInitializing, updateProfile, addAddress, removeAddress, setDefaultAddress, logout } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isInitializing, router]);

  if (isInitializing || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="spinner-electric" />
      </div>
    );
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleProfileSubmit = async (values: { name: string; email: string; phone: string }) => {
    const success = await updateProfile(values);
    if (success) {
      showSuccess('Profile updated successfully!');
    }
  };

  const handleAddAddress = (values: Omit<Address, 'id'>) => {
    addAddress(values);
    setShowAddressForm(false);
    showSuccess('Address added successfully!');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'addresses' as const, label: 'Addresses', icon: MapPin },
    { id: 'security' as const, label: 'Security', icon: Shield },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen">
      {/* Success Toast */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400"
          >
            <Check className="w-5 h-5" />
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <section className="py-8 lg:py-12 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <nav className="flex items-center gap-2 text-sm text-carbon-400 mb-4">
            <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-carbon-300">Settings</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-electric-500/20 flex items-center justify-center">
              <Settings className="w-6 h-6 text-electric-400" />
            </div>
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">
                Account <span className="text-electric-400">Settings</span>
              </h1>
              <p className="text-carbon-400">
                Manage your profile and preferences
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Settings Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card-electric sticky top-32">
                {/* User Info */}
                <div className="flex items-center gap-4 pb-6 mb-6 border-b border-carbon-800">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-electric-500 to-volt-500 flex items-center justify-center text-white text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{user.name}</h3>
                    <p className="text-sm text-carbon-400">{user.email}</p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-electric-500/20 text-electric-400'
                          : 'text-carbon-400 hover:bg-carbon-800 hover:text-white'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 mt-6 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="card-electric"
                  >
                    <h2 className="font-display text-xl font-bold text-white mb-6">
                      Profile Information
                    </h2>

                    <Formik
                      initialValues={{
                        name: user.name,
                        email: user.email,
                        phone: user.phone || '',
                      }}
                      validationSchema={ProfileSchema}
                      onSubmit={handleProfileSubmit}
                    >
                      {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-carbon-300 mb-2">
                                Full Name
                              </label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon-500 pointer-events-none" />
                                <Field
                                  name="name"
                                  className={`input-electric input-with-icon-left ${
                                    errors.name && touched.name ? 'border-red-500' : ''
                                  }`}
                                />
                              </div>
                              <ErrorMessage name="name" component="p" className="mt-1 text-sm text-red-400" />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-carbon-300 mb-2">
                                Email Address
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon-500 pointer-events-none" />
                                <Field
                                  name="email"
                                  type="email"
                                  className={`input-electric input-with-icon-left ${
                                    errors.email && touched.email ? 'border-red-500' : ''
                                  }`}
                                />
                              </div>
                              <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-400" />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-carbon-300 mb-2">
                                Phone Number
                              </label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon-500 pointer-events-none" />
                                <Field
                                  name="phone"
                                  className={`input-electric input-with-icon-left ${
                                    errors.phone && touched.phone ? 'border-red-500' : ''
                                  }`}
                                  placeholder="+91 98765 43210"
                                />
                              </div>
                              <ErrorMessage name="phone" component="p" className="mt-1 text-sm text-red-400" />
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn-electric flex items-center gap-2"
                            >
                              {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <Save className="w-5 h-5" />
                              )}
                              Save Changes
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </motion.div>
                )}

                {/* Addresses Tab */}
                {activeTab === 'addresses' && (
                  <motion.div
                    key="addresses"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="card-electric">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display text-xl font-bold text-white">
                          Saved Addresses
                        </h2>
                        <button
                          onClick={() => setShowAddressForm(true)}
                          className="btn-electric flex items-center gap-2 text-sm py-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Address
                        </button>
                      </div>

                      {/* Address List */}
                      {user.addresses && user.addresses.length > 0 ? (
                        <div className="space-y-4">
                          {user.addresses.map((address) => (
                            <div
                              key={address.id}
                              className={`p-4 rounded-xl border ${
                                address.isDefault
                                  ? 'border-electric-500/50 bg-electric-500/5'
                                  : 'border-carbon-700'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold text-white">{address.name}</span>
                                    {address.isDefault && (
                                      <span className="px-2 py-0.5 text-xs rounded-full bg-electric-500/20 text-electric-400">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-carbon-300">{address.street}</p>
                                  <p className="text-carbon-400">
                                    {address.city}, {address.state} - {address.pincode}
                                  </p>
                                  <p className="text-carbon-500 text-sm mt-1">{address.phone}</p>
                                </div>
                                <div className="flex gap-2">
                                  {!address.isDefault && (
                                    <button
                                      onClick={() => setDefaultAddress(address.id)}
                                      className="p-2 text-carbon-400 hover:text-electric-400 transition-colors"
                                      title="Set as default"
                                    >
                                      <Check className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => removeAddress(address.id)}
                                    className="p-2 text-carbon-400 hover:text-red-400 transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-carbon-500 py-8">
                          No addresses saved yet
                        </p>
                      )}
                    </div>

                    {/* Add Address Form Modal */}
                    <AnimatePresence>
                      {showAddressForm && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
                          onClick={() => setShowAddressForm(false)}
                        >
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="card-electric w-full max-w-lg max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="font-display text-xl font-bold text-white">
                                Add New Address
                              </h3>
                              <button
                                onClick={() => setShowAddressForm(false)}
                                className="p-2 text-carbon-400 hover:text-white"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>

                            <Formik
                              initialValues={{
                                name: '',
                                phone: '',
                                street: '',
                                city: '',
                                state: '',
                                pincode: '',
                                isDefault: false,
                              }}
                              validationSchema={AddressSchema}
                              onSubmit={handleAddAddress}
                            >
                              {({ errors, touched }) => (
                                <Form className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm text-carbon-300 mb-1">
                                        Label (Home, Office, etc.)
                                      </label>
                                      <Field
                                        name="name"
                                        className={`input-electric ${errors.name && touched.name ? 'border-red-500' : ''}`}
                                        placeholder="Home"
                                      />
                                      <ErrorMessage name="name" component="p" className="mt-1 text-xs text-red-400" />
                                    </div>
                                    <div>
                                      <label className="block text-sm text-carbon-300 mb-1">
                                        Phone
                                      </label>
                                      <Field
                                        name="phone"
                                        className={`input-electric ${errors.phone && touched.phone ? 'border-red-500' : ''}`}
                                        placeholder="+91 98765 43210"
                                      />
                                      <ErrorMessage name="phone" component="p" className="mt-1 text-xs text-red-400" />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-sm text-carbon-300 mb-1">
                                      Street Address
                                    </label>
                                    <Field
                                      name="street"
                                      className={`input-electric ${errors.street && touched.street ? 'border-red-500' : ''}`}
                                      placeholder="123 Electric Avenue"
                                    />
                                    <ErrorMessage name="street" component="p" className="mt-1 text-xs text-red-400" />
                                  </div>

                                  <div className="grid grid-cols-3 gap-4">
                                    <div>
                                      <label className="block text-sm text-carbon-300 mb-1">
                                        City
                                      </label>
                                      <Field
                                        name="city"
                                        className={`input-electric ${errors.city && touched.city ? 'border-red-500' : ''}`}
                                        placeholder="Mumbai"
                                      />
                                      <ErrorMessage name="city" component="p" className="mt-1 text-xs text-red-400" />
                                    </div>
                                    <div>
                                      <label className="block text-sm text-carbon-300 mb-1">
                                        State
                                      </label>
                                      <Field
                                        name="state"
                                        className={`input-electric ${errors.state && touched.state ? 'border-red-500' : ''}`}
                                        placeholder="Maharashtra"
                                      />
                                      <ErrorMessage name="state" component="p" className="mt-1 text-xs text-red-400" />
                                    </div>
                                    <div>
                                      <label className="block text-sm text-carbon-300 mb-1">
                                        Pincode
                                      </label>
                                      <Field
                                        name="pincode"
                                        className={`input-electric ${errors.pincode && touched.pincode ? 'border-red-500' : ''}`}
                                        placeholder="400001"
                                      />
                                      <ErrorMessage name="pincode" component="p" className="mt-1 text-xs text-red-400" />
                                    </div>
                                  </div>

                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <Field
                                      type="checkbox"
                                      name="isDefault"
                                      className="w-4 h-4 rounded accent-electric-500"
                                    />
                                    <span className="text-sm text-carbon-300">Set as default address</span>
                                  </label>

                                  <div className="flex gap-3 pt-4">
                                    <button
                                      type="button"
                                      onClick={() => setShowAddressForm(false)}
                                      className="flex-1 py-3 rounded-lg border border-carbon-700 text-carbon-300 hover:bg-carbon-800 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="submit"
                                      className="flex-1 btn-electric"
                                    >
                                      Save Address
                                    </button>
                                  </div>
                                </Form>
                              )}
                            </Formik>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="card-electric"
                  >
                    <h2 className="font-display text-xl font-bold text-white mb-6">
                      Change Password
                    </h2>

                    <Formik
                      initialValues={{
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                      }}
                      validationSchema={PasswordSchema}
                      onSubmit={async (values, { setSubmitting, resetForm }) => {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        showSuccess('Password changed successfully!');
                        resetForm();
                        setSubmitting(false);
                      }}
                    >
                      {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-6 max-w-md">
                          <div>
                            <label className="block text-sm font-medium text-carbon-300 mb-2">
                              Current Password
                            </label>
                            <Field
                              type="password"
                              name="currentPassword"
                              className={`input-electric ${
                                errors.currentPassword && touched.currentPassword ? 'border-red-500' : ''
                              }`}
                            />
                            <ErrorMessage name="currentPassword" component="p" className="mt-1 text-sm text-red-400" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-carbon-300 mb-2">
                              New Password
                            </label>
                            <Field
                              type="password"
                              name="newPassword"
                              className={`input-electric ${
                                errors.newPassword && touched.newPassword ? 'border-red-500' : ''
                              }`}
                            />
                            <ErrorMessage name="newPassword" component="p" className="mt-1 text-sm text-red-400" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-carbon-300 mb-2">
                              Confirm New Password
                            </label>
                            <Field
                              type="password"
                              name="confirmPassword"
                              className={`input-electric ${
                                errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''
                              }`}
                            />
                            <ErrorMessage name="confirmPassword" component="p" className="mt-1 text-sm text-red-400" />
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-electric flex items-center gap-2"
                          >
                            {isSubmitting ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <Shield className="w-5 h-5" />
                            )}
                            Update Password
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </motion.div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="card-electric"
                  >
                    <h2 className="font-display text-xl font-bold text-white mb-6">
                      Notification Preferences
                    </h2>

                    <div className="space-y-6">
                      {[
                        { id: 'orders', label: 'Order Updates', desc: 'Get notified about your order status' },
                        { id: 'offers', label: 'Offers & Promotions', desc: 'Receive exclusive deals and discounts' },
                        { id: 'newsletter', label: 'Newsletter', desc: 'Weekly tips and product updates' },
                        { id: 'sms', label: 'SMS Notifications', desc: 'Receive updates via SMS' },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-3 border-b border-carbon-800 last:border-0">
                          <div>
                            <h4 className="font-medium text-white">{item.label}</h4>
                            <p className="text-sm text-carbon-500">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={item.id === 'orders'} />
                            <div className="w-11 h-6 bg-carbon-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electric-500"></div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <button className="btn-electric flex items-center gap-2 mt-6">
                      <Save className="w-5 h-5" />
                      Save Preferences
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

