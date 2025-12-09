'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  ChevronRight,
  ChevronLeft,
  MapPin,
  CreditCard,
  ClipboardCheck,
  Check,
  Plus,
  Truck,
  Shield,
  Lock,
  Loader2,
  ShoppingBag,
  ArrowRight,
  Smartphone,
  Landmark,
  Banknote,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useUser, Address } from '@/context/UserContext';

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

type CheckoutStep = 'address' | 'payment' | 'review';

const steps: { id: CheckoutStep; label: string; icon: React.ElementType }[] = [
  { id: 'address', label: 'Address', icon: MapPin },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'review', label: 'Review', icon: ClipboardCheck },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated, isLoading, addAddress } = useUser();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Redirect if not authenticated or cart is empty (but not if order was just completed)
  useEffect(() => {
    if (!isLoading && !orderCompleted) {
      if (!isAuthenticated) {
        router.push('/login?redirect=/checkout');
      } else if (items.length === 0) {
        router.push('/cart');
      }
    }
  }, [isAuthenticated, isLoading, items.length, router, orderCompleted]);

  // Set default address on load
  useEffect(() => {
    if (user?.addresses && user.addresses.length > 0 && !selectedAddress) {
      const defaultAddr = user.addresses.find(a => a.isDefault) || user.addresses[0];
      setSelectedAddress(defaultAddr);
    }
  }, [user?.addresses, selectedAddress]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const paymentMethods = [
    { id: 'upi', label: 'UPI', desc: 'Pay using any UPI app', icon: Smartphone },
    { id: 'card', label: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay', icon: CreditCard },
    { id: 'netbanking', label: 'Net Banking', desc: 'All major banks supported', icon: Landmark },
    { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive', icon: Banknote },
  ];

  const handleAddAddress = (values: Omit<Address, 'id'>) => {
    addAddress({ ...values, isDefault: user?.addresses?.length === 0 });
    setShowAddressForm(false);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !selectedPayment) return;

    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate order ID
    const orderId = `BE-${Date.now().toString().slice(-8)}`;
    
    // Mark order as completed (prevents redirect to cart when clearing)
    setOrderCompleted(true);
    
    // Clear cart before navigation
    clearCart();
    
    // Navigate to confirmation page
    router.push(`/checkout/confirmation?orderId=${orderId}`);
  };

  const nextStep = () => {
    if (currentStep === 'address' && selectedAddress) {
      setCurrentStep('payment');
    } else if (currentStep === 'payment' && selectedPayment) {
      setCurrentStep('review');
    }
  };

  const prevStep = () => {
    if (currentStep === 'payment') {
      setCurrentStep('address');
    } else if (currentStep === 'review') {
      setCurrentStep('payment');
    }
  };

  const getCurrentStepIndex = () => steps.findIndex(s => s.id === currentStep);

  // Show full-page loading overlay during order processing to prevent footer flash
  if (isProcessing) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-carbon-950 overflow-hidden">
        {/* Hide body scrollbar while loading */}
        <style jsx global>{`body { overflow: hidden !important; }`}</style>
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-electric-400 animate-spin mx-auto mb-4" />
          <p className="text-white font-semibold text-lg">Processing your order...</p>
          <p className="text-carbon-400 text-sm mt-2">Please wait while we confirm your payment</p>
        </div>
      </div>
    );
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="spinner-electric" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-carbon-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Your cart is empty</h2>
          <Link href="/products" className="btn-electric inline-flex items-center gap-2 mt-4">
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-6 lg:py-8 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <nav className="flex items-center gap-2 text-sm text-carbon-400 mb-4">
            <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/cart" className="hover:text-electric-400 transition-colors">Cart</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-carbon-300">Checkout</span>
          </nav>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-white">
            Secure <span className="text-electric-400">Checkout</span>
          </h1>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-6 border-b border-carbon-800">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-center gap-4 lg:gap-8">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = getCurrentStepIndex() > index;
              const StepIcon = step.icon;

              return (
                <React.Fragment key={step.id}>
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div
                      className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? 'bg-electric-500 text-white shadow-lg shadow-electric-500/50'
                          : 'bg-carbon-800 text-carbon-500'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 lg:w-6 lg:h-6" />
                      ) : (
                        <StepIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                      )}
                    </div>
                    <span
                      className={`hidden sm:block font-medium ${
                        isActive ? 'text-electric-400' : isCompleted ? 'text-green-400' : 'text-carbon-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 lg:w-24 h-1 rounded-full ${
                        isCompleted ? 'bg-green-500' : 'bg-carbon-800'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Steps Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Address Step */}
                {currentStep === 'address' && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="card-electric"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-electric-400" />
                        Delivery Address
                      </h2>
                      <button
                        onClick={() => setShowAddressForm(true)}
                        className="flex items-center gap-2 text-sm text-electric-400 hover:text-electric-300"
                      >
                        <Plus className="w-4 h-4" />
                        Add New
                      </button>
                    </div>

                    {/* Saved Addresses */}
                    {user.addresses && user.addresses.length > 0 ? (
                      <div className="space-y-4">
                        {user.addresses.map((address) => (
                          <label
                            key={address.id}
                            className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              selectedAddress?.id === address.id
                                ? 'border-electric-500 bg-electric-500/5'
                                : 'border-carbon-700 hover:border-carbon-600'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <input
                                type="radio"
                                name="address"
                                checked={selectedAddress?.id === address.id}
                                onChange={() => setSelectedAddress(address)}
                                className="mt-1 w-5 h-5 accent-electric-500"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
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
                            </div>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <MapPin className="w-12 h-12 text-carbon-600 mx-auto mb-4" />
                        <p className="text-carbon-400 mb-4">No saved addresses</p>
                        <button
                          onClick={() => setShowAddressForm(true)}
                          className="btn-electric"
                        >
                          Add Address
                        </button>
                      </div>
                    )}

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
                            <h3 className="font-display text-xl font-bold text-white mb-6">
                              Add Delivery Address
                            </h3>

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
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm text-carbon-300 mb-1">
                                        Label
                                      </label>
                                      <Field
                                        name="name"
                                        className={`input-electric px-4 ${errors.name && touched.name ? 'border-red-500' : ''}`}
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
                                        className={`input-electric px-4 ${errors.phone && touched.phone ? 'border-red-500' : ''}`}
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
                                      className={`input-electric px-4 ${errors.street && touched.street ? 'border-red-500' : ''}`}
                                      placeholder="123 Electric Avenue"
                                    />
                                    <ErrorMessage name="street" component="p" className="mt-1 text-xs text-red-400" />
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                      <label className="block text-sm text-carbon-300 mb-1">City</label>
                                      <Field
                                        name="city"
                                        className={`input-electric px-4 ${errors.city && touched.city ? 'border-red-500' : ''}`}
                                        placeholder="Mumbai"
                                      />
                                      <ErrorMessage name="city" component="p" className="mt-1 text-xs text-red-400" />
                                    </div>
                                    <div>
                                      <label className="block text-sm text-carbon-300 mb-1">State</label>
                                      <Field
                                        name="state"
                                        className={`input-electric px-4 ${errors.state && touched.state ? 'border-red-500' : ''}`}
                                        placeholder="Maharashtra"
                                      />
                                      <ErrorMessage name="state" component="p" className="mt-1 text-xs text-red-400" />
                                    </div>
                                    <div>
                                      <label className="block text-sm text-carbon-300 mb-1">Pincode</label>
                                      <Field
                                        name="pincode"
                                        className={`input-electric px-4 ${errors.pincode && touched.pincode ? 'border-red-500' : ''}`}
                                        placeholder="400001"
                                      />
                                      <ErrorMessage name="pincode" component="p" className="mt-1 text-xs text-red-400" />
                                    </div>
                                  </div>

                                  <div className="flex gap-3 pt-4">
                                    <button
                                      type="button"
                                      onClick={() => setShowAddressForm(false)}
                                      className="flex-1 py-3 rounded-lg border border-carbon-700 text-carbon-300 hover:bg-carbon-800 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                    <button type="submit" className="flex-1 btn-electric">
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

                    {/* Next Button */}
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={nextStep}
                        disabled={!selectedAddress}
                        className="btn-electric flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue to Payment
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Payment Step */}
                {currentStep === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="card-electric"
                  >
                    <h2 className="font-display text-xl font-bold text-white flex items-center gap-2 mb-6">
                      <CreditCard className="w-5 h-5 text-electric-400" />
                      Payment Method
                    </h2>

                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedPayment === method.id
                              ? 'border-electric-500 bg-electric-500/5'
                              : 'border-carbon-700 hover:border-carbon-600'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="radio"
                              name="payment"
                              value={method.id}
                              checked={selectedPayment === method.id}
                              onChange={(e) => setSelectedPayment(e.target.value)}
                              className="w-5 h-5 accent-electric-500"
                            />
                            <div className="w-10 h-10 rounded-lg bg-electric-500/10 flex items-center justify-center">
                              <method.icon className="w-5 h-5 text-electric-400" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-white">{method.label}</p>
                              <p className="text-sm text-carbon-400">{method.desc}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Card Details (show if card selected) */}
                    {selectedPayment === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 p-4 rounded-xl bg-carbon-800/50 space-y-4"
                      >
                        <div>
                          <label className="block text-sm text-carbon-300 mb-1">Card Number</label>
                          <input
                            type="text"
                            className="input-electric px-4"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-carbon-300 mb-1">Expiry</label>
                            <input
                              type="text"
                              className="input-electric px-4"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-carbon-300 mb-1">CVV</label>
                            <input
                              type="text"
                              className="input-electric px-4"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* UPI Details */}
                    {selectedPayment === 'upi' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 p-4 rounded-xl bg-carbon-800/50"
                      >
                        <label className="block text-sm text-carbon-300 mb-1">UPI ID</label>
                        <input
                          type="text"
                          className="input-electric px-4"
                          placeholder="yourname@upi"
                        />
                      </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-between">
                      <button
                        onClick={prevStep}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-carbon-700 text-carbon-300 hover:bg-carbon-800 transition-colors order-2 sm:order-1"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Back
                      </button>
                      <button
                        onClick={nextStep}
                        disabled={!selectedPayment}
                        className="btn-electric flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                      >
                        Review Order
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Review Step */}
                {currentStep === 'review' && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Delivery Address */}
                    <div className="card-electric">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-electric-400" />
                          Delivery Address
                        </h3>
                        <button
                          onClick={() => setCurrentStep('address')}
                          className="text-sm text-electric-400 hover:text-electric-300"
                        >
                          Change
                        </button>
                      </div>
                      {selectedAddress && (
                        <div className="text-carbon-300">
                          <p className="font-medium text-white">{selectedAddress.name}</p>
                          <p>{selectedAddress.street}</p>
                          <p>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
                          <p className="text-carbon-500 mt-1">{selectedAddress.phone}</p>
                        </div>
                      )}
                    </div>

                    {/* Payment Method */}
                    <div className="card-electric">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-electric-400" />
                          Payment Method
                        </h3>
                        <button
                          onClick={() => setCurrentStep('payment')}
                          className="text-sm text-electric-400 hover:text-electric-300"
                        >
                          Change
                        </button>
                      </div>
                      <div className="flex items-center gap-3 text-carbon-300">
                        {(() => {
                          const method = paymentMethods.find(m => m.id === selectedPayment);
                          if (method) {
                            const IconComponent = method.icon;
                            return (
                              <>
                                <div className="w-8 h-8 rounded-lg bg-electric-500/10 flex items-center justify-center">
                                  <IconComponent className="w-4 h-4 text-electric-400" />
                                </div>
                                <span>{method.label}</span>
                              </>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="card-electric">
                      <h3 className="font-semibold text-white mb-4">
                        Order Items ({items.length})
                      </h3>
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-0 rounded-lg bg-carbon-800/30 sm:bg-transparent">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-carbon-800 flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-white text-sm sm:text-base line-clamp-2 sm:truncate">{item.name}</h4>
                              <p className="text-xs sm:text-sm text-carbon-400 mt-1">
                                Qty: {item.quantity} × {formatPrice(item.price)}
                              </p>
                              <p className="font-medium text-white text-sm sm:hidden mt-1">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                            <p className="hidden sm:block font-medium text-white flex-shrink-0">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
                      <button
                        onClick={prevStep}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-carbon-700 text-carbon-300 hover:bg-carbon-800 transition-colors order-2 sm:order-1"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Back
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="btn-electric flex items-center justify-center gap-2 px-6 sm:px-8 disabled:opacity-50 order-1 sm:order-2"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5" />
                            <span className="whitespace-nowrap">Place Order • {formatPrice(total)}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="card-electric">
                  <h3 className="font-display text-lg font-bold text-white mb-6">
                    Order Summary
                  </h3>

                  {/* Items Preview */}
                  <div className="space-y-3 pb-4 border-b border-carbon-800">
                    {items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-carbon-800 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{item.name}</p>
                          <p className="text-xs text-carbon-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-white">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                    {items.length > 3 && (
                      <p className="text-sm text-carbon-500 text-center">
                        +{items.length - 3} more items
                      </p>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 py-4 border-b border-carbon-800">
                    <div className="flex justify-between text-carbon-300">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-carbon-300">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? <span className="text-green-400">FREE</span> : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between text-carbon-300">
                      <span>Tax (18% GST)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center py-4">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-volt-400 to-spark-400">
                      {formatPrice(total)}
                    </span>
                  </div>

                  {/* Trust Badges */}
                  <div className="space-y-3 pt-4 border-t border-carbon-800">
                    <div className="flex items-center gap-3 text-sm text-carbon-400">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span>Secure SSL Encryption</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-carbon-400">
                      <Truck className="w-4 h-4 text-electric-400" />
                      <span>Free delivery on orders above ₹999</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-carbon-400">
                      <Check className="w-4 h-4 text-volt-400" />
                      <span>100% Genuine Products</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

