'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Zap, ShoppingBag, Phone } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-spark-500/10 rounded-full blur-[128px]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] text-6xl opacity-20"
      >
        💡
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-40 right-[15%] text-5xl opacity-20"
      >
        🔌
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-32 left-[20%] text-4xl opacity-20"
      >
        ⚡
      </motion.div>

      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <h1 className="font-display text-[150px] lg:text-[200px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-electric-400 to-electric-600/20">
            404
          </h1>
          {/* Glowing Zap Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <Zap className="w-16 h-16 lg:w-20 lg:h-20 text-volt-400" />
              <div className="absolute inset-0 blur-xl bg-volt-400/50 rounded-full" />
            </div>
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
            Oops! Page Not <span className="text-electric-400">Found</span>
          </h2>
          <p className="text-carbon-400 text-lg mb-8 max-w-md mx-auto">
            Looks like this circuit is broken! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link
            href="/"
            className="btn-electric flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-electric-500/30 text-electric-400 hover:bg-electric-500/10 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Browse Products
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-8 border-t border-carbon-800"
        >
          <p className="text-carbon-500 mb-4">Or try these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: '/categories', label: 'Categories' },
              { href: '/deals', label: 'Deals' },
              { href: '/about', label: 'About Us' },
              { href: '/orders', label: 'My Orders' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg bg-carbon-800/50 text-carbon-400 hover:text-electric-400 hover:bg-carbon-800 transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 rounded-2xl bg-carbon-800/30 border border-carbon-700/50"
        >
          <p className="text-carbon-400 mb-3">
            Need help finding something?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="flex items-center gap-2 text-electric-400 hover:text-electric-300 transition-colors"
            >
              <Search className="w-4 h-4" />
              Search Products
            </Link>
            <span className="hidden sm:block text-carbon-700">|</span>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-carbon-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

