'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Package,
  Truck,
  Home,
  ArrowRight,
  Share2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
} from 'lucide-react';
import Confetti from '@/components/Confetti';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'BE-00000000';
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (daysFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const orderDetails = {
    orderId,
    date: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    estimatedDelivery: formatDate(5),
    paymentMethod: 'UPI',
    email: 'customer@example.com',
  };

  const timeline = [
    { status: 'Order Placed', time: 'Just now', completed: true, icon: CheckCircle },
    { status: 'Processing', time: 'Within 24 hours', completed: false, icon: Package },
    { status: 'Shipped', time: 'In 1-2 days', completed: false, icon: Truck },
    { status: 'Delivered', time: orderDetails.estimatedDelivery, completed: false, icon: Home },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Confetti Animation */}
      {showConfetti && <Confetti />}

      {/* Success Hero */}
      <section className="py-12 lg:py-20 text-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[128px]" />
        </div>

        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/20 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <CheckCircle className="w-14 h-14 text-green-500" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
              Order <span className="text-green-400">Confirmed!</span>
            </h1>
            <p className="text-lg text-carbon-300 mb-2">
              Thank you for your purchase
            </p>
            <p className="text-carbon-500">
              Your order <span className="text-electric-400 font-mono font-semibold">{orderId}</span> has been placed successfully
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-carbon-800/50 border border-carbon-700 text-carbon-300 hover:border-electric-500 hover:text-electric-400 transition-all">
              <Share2 className="w-4 h-4" />
              Share Order
            </button>
          </motion.div>
        </div>
      </section>

      {/* Order Details */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Order Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card-electric"
              >
                <h3 className="font-display text-lg font-bold text-white mb-6">
                  Order Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-electric-400" />
                    <div>
                      <p className="text-sm text-carbon-500">Order ID</p>
                      <p className="font-mono font-semibold text-white">{orderDetails.orderId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-electric-400" />
                    <div>
                      <p className="text-sm text-carbon-500">Order Date</p>
                      <p className="text-white">{orderDetails.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-electric-400" />
                    <div>
                      <p className="text-sm text-carbon-500">Payment Method</p>
                      <p className="text-white">{orderDetails.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-electric-400" />
                    <div>
                      <p className="text-sm text-carbon-500">Confirmation sent to</p>
                      <p className="text-white">{orderDetails.email}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Delivery Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="card-electric"
              >
                <h3 className="font-display text-lg font-bold text-white mb-6">
                  Delivery Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-electric-400 mt-1" />
                    <div>
                      <p className="text-sm text-carbon-500">Delivery Address</p>
                      <p className="text-white">123 Electric Avenue</p>
                      <p className="text-carbon-400">Mumbai, Maharashtra - 400001</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-electric-400" />
                    <div>
                      <p className="text-sm text-carbon-500">Estimated Delivery</p>
                      <p className="text-green-400 font-semibold">{orderDetails.estimatedDelivery}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-electric-400" />
                    <div>
                      <p className="text-sm text-carbon-500">Contact</p>
                      <p className="text-white">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Order Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="card-electric mt-6"
            >
              <h3 className="font-display text-lg font-bold text-white mb-6">
                Order Status
              </h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-carbon-700" />

                <div className="space-y-6">
                  {timeline.map((step, index) => {
                    const StepIcon = step.icon;
                    return (
                      <div key={step.status} className="relative flex items-center gap-4">
                        <div
                          className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                            step.completed
                              ? 'bg-green-500'
                              : 'bg-carbon-800 border-2 border-carbon-700'
                          }`}
                        >
                          <StepIcon
                            className={`w-5 h-5 ${
                              step.completed ? 'text-white' : 'text-carbon-500'
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold ${step.completed ? 'text-green-400' : 'text-white'}`}>
                            {step.status}
                          </p>
                          <p className="text-sm text-carbon-500">{step.time}</p>
                        </div>
                        {step.completed && (
                          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                            Done
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* What's Next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-electric-500/10 to-volt-500/10 border border-electric-500/20"
            >
              <h3 className="font-display text-lg font-bold text-white mb-4">
                What&apos;s Next?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-carbon-300">
                  <CheckCircle className="w-5 h-5 text-electric-400 mt-0.5 flex-shrink-0" />
                  <span>You will receive an order confirmation email with details of your order.</span>
                </li>
                <li className="flex items-start gap-3 text-carbon-300">
                  <CheckCircle className="w-5 h-5 text-electric-400 mt-0.5 flex-shrink-0" />
                  <span>Once your order ships, we&apos;ll send you a tracking link via SMS and email.</span>
                </li>
                <li className="flex items-start gap-3 text-carbon-300">
                  <CheckCircle className="w-5 h-5 text-electric-400 mt-0.5 flex-shrink-0" />
                  <span>You can track your order anytime from the &quot;My Orders&quot; section.</span>
                </li>
              </ul>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
            >
              <Link
                href="/orders"
                className="btn-electric flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5" />
                Track Order
              </Link>
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-electric-500/30 text-electric-400 hover:bg-electric-500/10 transition-colors"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Need Help */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 text-center"
            >
              <p className="text-carbon-500">
                Need help with your order?{' '}
                <Link href="/contact" className="text-electric-400 hover:text-electric-300">
                  Contact Support
                </Link>{' '}
                or call us at{' '}
                <span className="text-white font-medium">+91 98765 43210</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="spinner-electric" />
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}

