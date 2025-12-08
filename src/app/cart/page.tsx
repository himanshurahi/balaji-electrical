'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  ArrowRight,
  Truck,
  Shield,
  Tag,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 999 ? 0 : 99;
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'diwali20') {
      setAppliedCoupon({ code: 'DIWALI20', discount: 20 });
    } else if (couponCode.toLowerCase() === 'save10') {
      setAppliedCoupon({ code: 'SAVE10', discount: 10 });
    }
    setCouponCode('');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4"
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-carbon-800/50 flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-carbon-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-carbon-400 mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added any products yet. Start shopping to fill your cart with amazing electrical products!
          </p>
          <Link href="/products" className="btn-electric inline-flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-8 lg:py-12 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <nav className="flex items-center gap-2 text-sm text-carbon-400 mb-4">
            <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-carbon-300">Shopping Cart</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-white mb-2">
              Shopping <span className="text-electric-400">Cart</span>
            </h1>
            <p className="text-carbon-400">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="card-electric"
                >
                  <div className="flex gap-4 lg:gap-6">
                    {/* Product Image */}
                    <Link href={`/products/${item.id}`} className="flex-shrink-0">
                      <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg overflow-hidden bg-carbon-800">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1">
                          <span className="text-xs text-electric-400 uppercase tracking-wider">
                            {item.category}
                          </span>
                          <Link href={`/products/${item.id}`}>
                            <h3 className="font-semibold text-white hover:text-electric-400 transition-colors line-clamp-2">
                              {item.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-lg font-bold text-volt-400">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-carbon-500 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex items-center gap-4 lg:gap-6">
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="quantity-btn"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center font-semibold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="quantity-btn"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Item Total */}
                          <div className="hidden sm:block text-right">
                            <p className="text-xs text-carbon-500">Total</p>
                            <p className="font-bold text-white">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-carbon-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Mobile Item Total */}
                      <div className="sm:hidden mt-4 pt-4 border-t border-carbon-800 flex justify-between">
                        <span className="text-carbon-400">Item Total:</span>
                        <span className="font-bold text-white">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Cart Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-electric-500/30 text-electric-400 hover:bg-electric-500/10 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-electric"
              >
                <h2 className="font-display text-xl font-bold text-white mb-6">
                  Order Summary
                </h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="text-sm text-carbon-400 mb-2 block">
                    Have a coupon code?
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-carbon-500" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code"
                        className="input-electric pl-10"
                      />
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 rounded-lg bg-electric-500/20 text-electric-400 font-medium hover:bg-electric-500/30 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-green-400">
                        ✓ {appliedCoupon.code} applied ({appliedCoupon.discount}% off)
                      </span>
                      <button
                        onClick={() => setAppliedCoupon(null)}
                        className="text-carbon-500 hover:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-carbon-500 mt-2">
                    Try: DIWALI20 for 20% off | SAVE10 for 10% off
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 py-4 border-y border-carbon-800">
                  <div className="flex justify-between text-carbon-300">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-carbon-300">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-400">FREE</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-4">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-volt-400 to-spark-400">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-electric-500 to-electric-600 text-white font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-electric-500/30 transition-all">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Free Shipping Notice */}
                {subtotal < 999 && (
                  <div className="mt-4 p-3 rounded-lg bg-volt-500/10 border border-volt-500/20">
                    <p className="text-sm text-volt-400 text-center">
                      Add {formatPrice(999 - subtotal)} more for FREE shipping!
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Truck, text: 'Free Delivery' },
                  { icon: Shield, text: 'Secure Payment' },
                ].map((badge) => (
                  <div
                    key={badge.text}
                    className="flex items-center gap-2 p-3 rounded-lg bg-carbon-800/50 border border-electric-500/10"
                  >
                    <badge.icon className="w-5 h-5 text-electric-400" />
                    <span className="text-sm text-carbon-300">{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="text-center">
                <p className="text-xs text-carbon-500 mb-3">Accepted Payment Methods</p>
                <div className="flex justify-center gap-3">
                  {['Visa', 'Mastercard', 'UPI', 'PayTM'].map((method) => (
                    <span
                      key={method}
                      className="px-3 py-1.5 text-xs rounded bg-carbon-800/50 text-carbon-400"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

