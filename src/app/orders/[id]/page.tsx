'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Package,
  Truck,
  Home,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  Phone,
  ArrowLeft,
  RefreshCw,
  HelpCircle,
  Copy,
  Check,
  AlertCircle,
  XCircle,
  Smartphone,
  Landmark,
  Banknote,
} from 'lucide-react';
import { useUser, Order } from '@/context/UserContext';

const paymentIcons: Record<string, React.ElementType> = {
  'UPI': Smartphone,
  'Credit/Debit Card': CreditCard,
  'Net Banking': Landmark,
  'Cash on Delivery': Banknote,
};

const statusColors: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  'Processing': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: Clock },
  'Shipped': { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: Truck },
  'Delivered': { bg: 'bg-green-500/20', text: 'text-green-400', icon: CheckCircle },
  'Cancelled': { bg: 'bg-red-500/20', text: 'text-red-400', icon: XCircle },
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { orders, isAuthenticated, isLoading } = useUser();
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  const orderId = params.id as string;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/orders');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (orders.length > 0) {
      const foundOrder = orders.find(o => o.id === orderId || o.orderNumber === orderId);
      setOrder(foundOrder || null);
    }
  }, [orders, orderId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const copyOrderId = () => {
    if (order) {
      navigator.clipboard.writeText(order.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getTimeline = (status: string, createdAt: string) => {
    const steps = [
      { id: 'placed', label: 'Order Placed', icon: Package, date: createdAt },
      { id: 'processing', label: 'Processing', icon: Clock, date: status !== 'Processing' ? createdAt : null },
      { id: 'shipped', label: 'Shipped', icon: Truck, date: status === 'Shipped' || status === 'Delivered' ? createdAt : null },
      { id: 'delivered', label: 'Delivered', icon: Home, date: status === 'Delivered' ? createdAt : null },
    ];

    const statusIndex = {
      'Processing': 1,
      'Shipped': 2,
      'Delivered': 3,
      'Cancelled': -1,
    };

    const currentIndex = statusIndex[status as keyof typeof statusIndex] || 0;

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex && status !== 'Cancelled',
      current: index === currentIndex && status !== 'Cancelled',
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="spinner-electric" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-carbon-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Order Not Found</h2>
          <p className="text-carbon-400 mb-6">
            We couldn&apos;t find the order you&apos;re looking for.
          </p>
          <Link href="/orders" className="btn-electric inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = statusColors[order.status] || statusColors['Processing'];
  const StatusIcon = statusConfig.icon;
  const PaymentIcon = paymentIcons[order.paymentMethod] || CreditCard;
  const timeline = getTimeline(order.status, order.createdAt);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-6 lg:py-8 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <nav className="flex items-center gap-2 text-sm text-carbon-400 mb-4">
            <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/orders" className="hover:text-electric-400 transition-colors">Orders</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-carbon-300">{order.orderNumber}</span>
          </nav>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                Order <span className="text-electric-400">Details</span>
              </h1>
              <div className="flex items-center gap-3">
                <span className="font-mono text-carbon-300">{order.orderNumber}</span>
                <button 
                  onClick={copyOrderId}
                  className="p-1.5 rounded-lg hover:bg-carbon-800 transition-colors"
                  title="Copy Order ID"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-carbon-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bg}`}>
              <StatusIcon className={`w-5 h-5 ${statusConfig.text}`} />
              <span className={`font-medium ${statusConfig.text}`}>{order.status}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Timeline */}
              {order.status !== 'Cancelled' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card-electric"
                >
                  <h2 className="font-display text-lg font-bold text-white mb-6">
                    Order Status
                  </h2>
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-carbon-700" />
                    
                    <div className="space-y-6">
                      {timeline.map((step, index) => (
                        <div key={step.id} className="flex items-start gap-4 relative">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                              step.completed
                                ? 'bg-green-500/20 text-green-400'
                                : step.current
                                ? 'bg-electric-500/20 text-electric-400 ring-2 ring-electric-500'
                                : 'bg-carbon-800 text-carbon-500'
                            }`}
                          >
                            <step.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 pt-2">
                            <p className={`font-medium ${step.completed || step.current ? 'text-white' : 'text-carbon-500'}`}>
                              {step.label}
                            </p>
                            {step.completed && step.date && (
                              <p className="text-sm text-carbon-500 mt-1">
                                {formatDateTime(step.date)}
                              </p>
                            )}
                            {step.current && (
                              <p className="text-sm text-electric-400 mt-1">In Progress</p>
                            )}
                          </div>
                          {step.completed && (
                            <CheckCircle className="w-5 h-5 text-green-400 mt-3" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Cancelled Order Notice */}
              {order.status === 'Cancelled' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <XCircle className="w-6 h-6 text-red-400" />
                    <h3 className="font-semibold text-red-400">Order Cancelled</h3>
                  </div>
                  <p className="text-carbon-300">
                    This order was cancelled. If you have any questions, please contact our support.
                  </p>
                </motion.div>
              )}

              {/* Order Items */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="card-electric"
              >
                <h2 className="font-display text-lg font-bold text-white mb-6">
                  Order Items ({order.items.length})
                </h2>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-carbon-800/30"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-carbon-800 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white text-sm sm:text-base line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-carbon-400 mt-1">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </p>
                        <p className="font-semibold text-white mt-2 sm:hidden">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                      <p className="hidden sm:block font-semibold text-white flex-shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Shipping & Payment Info */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Shipping Address */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="card-electric"
                >
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-electric-400" />
                    Shipping Address
                  </h3>
                  <div className="text-carbon-300 space-y-1">
                    <p className="font-medium text-white">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-carbon-400">
                      <Phone className="w-4 h-4" />
                      <span>{order.shippingAddress.phone}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Payment Method */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="card-electric"
                >
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <CreditCard className="w-4 h-4 text-electric-400" />
                    Payment Method
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-electric-500/10 flex items-center justify-center">
                      <PaymentIcon className="w-5 h-5 text-electric-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{order.paymentMethod}</p>
                      <p className="text-sm text-carbon-500">Paid on {formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column - Summary & Actions */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Order Summary */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="card-electric"
                >
                  <h3 className="font-display text-lg font-bold text-white mb-6">
                    Order Summary
                  </h3>
                  
                  <div className="space-y-3 pb-4 border-b border-carbon-800">
                    <div className="flex justify-between text-carbon-300">
                      <span>Subtotal</span>
                      <span>{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-carbon-300">
                      <span>Shipping</span>
                      <span>
                        {order.shipping === 0 ? (
                          <span className="text-green-400">FREE</span>
                        ) : (
                          formatPrice(order.shipping)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-carbon-300">
                      <span>Tax (GST)</span>
                      <span>{formatPrice(order.tax)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-volt-400 to-spark-400">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </motion.div>

                {/* Order Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="card-electric"
                >
                  <h3 className="font-semibold text-white mb-4">Order Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-carbon-500">Order Date</span>
                      <span className="text-carbon-300">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-carbon-500">Order ID</span>
                      <span className="text-carbon-300 font-mono">{order.orderNumber}</span>
                    </div>
                    {order.status === 'Delivered' && (
                      <div className="flex justify-between">
                        <span className="text-carbon-500">Delivered On</span>
                        <span className="text-carbon-300">{formatDate(order.updatedAt)}</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <button className="w-full btn-electric flex items-center justify-center gap-2">
                    <RefreshCw className="w-5 h-5" />
                    Reorder
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-carbon-700 text-carbon-300 hover:bg-carbon-800 transition-colors">
                    <HelpCircle className="w-5 h-5" />
                    Need Help?
                  </button>
                  <Link
                    href="/orders"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-carbon-400 hover:text-electric-400 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Orders
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

