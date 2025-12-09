'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Package,
  ChevronRight,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  MapPin,
  CreditCard,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import { useUser, Order } from '@/context/UserContext';

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  Processing: { label: 'Processing', color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: Clock },
  Shipped: { label: 'Shipped', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: Truck },
  Delivered: { label: 'Delivered', color: 'text-green-400', bg: 'bg-green-500/10', icon: CheckCircle },
  Cancelled: { label: 'Cancelled', color: 'text-red-400', bg: 'bg-red-500/10', icon: XCircle },
};

function OrderCard({ order }: { order: Order }) {
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-electric overflow-hidden"
    >
      {/* Order Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-carbon-800">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-semibold text-white">{order.orderNumber}</span>
            <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </span>
          </div>
          <p className="text-sm text-carbon-500">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-carbon-400">Total</p>
          <p className="font-display text-xl font-bold text-volt-400">
            {formatPrice(order.total)}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="py-4 space-y-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-carbon-800 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-white truncate">{item.name}</h4>
              <p className="text-sm text-carbon-400">
                Qty: {item.quantity} × {formatPrice(item.price)}
              </p>
            </div>
            <p className="font-medium text-white">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Order Footer */}
      <div className="pt-4 border-t border-carbon-800 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-carbon-400">
            <CreditCard className="w-4 h-4" />
            {order.paymentMethod}
          </div>
          <div className="flex items-center gap-2 text-carbon-400">
            <MapPin className="w-4 h-4" />
            {order.shippingAddress.city}
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/orders/${order.id}`}
            className="px-4 py-2 rounded-lg text-sm font-medium text-electric-400 border border-electric-500/30 hover:bg-electric-500/10 transition-colors"
          >
            View Details
          </Link>
          {order.status === 'Delivered' && (
            <button className="px-4 py-2 rounded-lg text-sm font-medium bg-electric-500/20 text-electric-400 hover:bg-electric-500/30 transition-colors">
              Buy Again
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, isInitializing, orders } = useUser();

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isInitializing, router]);

  if (isInitializing) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="spinner-electric" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-8 lg:py-12 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <nav className="flex items-center gap-2 text-sm text-carbon-400 mb-4">
            <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-carbon-300">My Orders</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-electric-500/20 flex items-center justify-center">
              <Package className="w-6 h-6 text-electric-400" />
            </div>
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">
                My <span className="text-electric-400">Orders</span>
              </h1>
              <p className="text-carbon-400">
                Track and manage your orders
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-6">
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-carbon-800/50 flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-carbon-600" />
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-2">
                No orders yet
              </h2>
              <p className="text-carbon-400 mb-8 max-w-md mx-auto">
                Looks like you haven&apos;t placed any orders yet. Start shopping to see your orders here!
              </p>
              <Link href="/products" className="btn-electric inline-flex items-center gap-2">
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

