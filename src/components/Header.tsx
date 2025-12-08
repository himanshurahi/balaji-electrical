'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Search, Menu, X, Zap, User, Heart, Package, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { getCartCount, cartAnimationTrigger } = useCart();
  const { user, isAuthenticated, logout } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate cart icon when a new product is added
  useEffect(() => {
    if (cartAnimationTrigger > 0) {
      setIsCartAnimating(true);
      const timer = setTimeout(() => {
        setIsCartAnimating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cartAnimationTrigger]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/deals', label: 'Deals' },
    { href: '/about', label: 'About' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-carbon-950/95 backdrop-blur-xl shadow-lg shadow-electric-500/10'
          : 'bg-transparent'
      }`}
    >
      {/* Top Bar */}
      <div className="hidden lg:block bg-electric-600/20 border-b border-electric-500/20">
        <div className="container mx-auto px-6 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4 text-carbon-300">
              <span>📞 +91 98765 43210</span>
              <span>✉️ info@balajielectricals.com</span>
            </div>
            <div className="flex items-center gap-4 text-carbon-300">
              <span>🚚 Free shipping on orders above ₹999</span>
              <span className="text-volt-400">⚡ Diwali Sale: Up to 40% Off!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Zap className="w-8 h-8 lg:w-10 lg:h-10 text-electric-400 transition-all duration-300 group-hover:text-volt-400" />
              <div className="absolute inset-0 blur-lg bg-electric-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <h1 className="font-display text-lg lg:text-xl font-bold text-white tracking-wider">
                BALAJI
              </h1>
              <p className="text-[10px] lg:text-xs text-electric-400 tracking-widest -mt-1">
                ELECTRICALS
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active text-electric-400' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 xl:w-80 px-4 py-2.5 pl-10 rounded-full bg-carbon-800/50 border border-electric-500/20 text-white placeholder-carbon-400 focus:outline-none focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-carbon-400" />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 text-carbon-300 hover:text-electric-400 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button className="hidden sm:flex p-2 text-carbon-300 hover:text-electric-400 transition-colors relative">
              <Heart className="w-5 h-5" />
            </button>

            {/* Account */}
            <div className="relative hidden sm:block" ref={userMenuRef}>
              {isAuthenticated && user ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-2 text-carbon-300 hover:text-electric-400 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric-500 to-volt-500 flex items-center justify-center text-white text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown Menu */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl bg-carbon-900 border border-electric-500/20 shadow-xl shadow-black/50 overflow-hidden z-50"
                      >
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-carbon-800">
                          <p className="font-medium text-white truncate">{user.name}</p>
                          <p className="text-sm text-carbon-500 truncate">{user.email}</p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <Link
                            href="/orders"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-carbon-300 hover:bg-electric-500/10 hover:text-electric-400 transition-colors"
                          >
                            <Package className="w-4 h-4" />
                            My Orders
                          </Link>
                          <Link
                            href="/settings"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-carbon-300 hover:bg-electric-500/10 hover:text-electric-400 transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </Link>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-carbon-800 py-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-carbon-300 hover:text-electric-400 border border-electric-500/30 hover:border-electric-500 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-carbon-300 hover:text-electric-400 transition-colors group"
            >
              <motion.div
                animate={isCartAnimating ? {
                  scale: [1, 1.4, 1],
                  rotate: [0, -15, 15, -10, 5, 0],
                } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`relative ${isCartAnimating ? 'text-electric-400' : ''}`}
              >
                <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
                {/* Glow effect when animating */}
                {isCartAnimating && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 2] }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 rounded-full bg-electric-400/60 blur-lg -z-10"
                  />
                )}
              </motion.div>
              
              {/* Floating +1 animation */}
              <AnimatePresence>
                {isCartAnimating && (
                  <motion.span
                    initial={{ opacity: 1, y: 0, x: '-50%' }}
                    animate={{ opacity: 0, y: -30 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute -top-2 left-1/2 text-electric-400 font-bold text-sm pointer-events-none"
                  >
                    +1
                  </motion.span>
                )}
              </AnimatePresence>
              
              {getCartCount() > 0 && (
                <motion.span
                  key={getCartCount()}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.3, 1] }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-spark-500 text-white text-xs font-bold rounded-full shadow-lg shadow-spark-500/50"
                >
                  {getCartCount()}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-carbon-300 hover:text-electric-400 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-carbon-900/95"
          >
            <form onSubmit={handleSearch} className="container mx-auto px-4 py-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-carbon-800 border border-electric-500/20 text-white placeholder-carbon-400 focus:outline-none focus:border-electric-500"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon-400" />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 top-16 bg-carbon-950 z-40 overflow-y-auto"
          >
            <nav className="container mx-auto px-4 py-8 pb-24">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-4 text-lg font-medium rounded-lg transition-all ${
                        pathname === link.href
                          ? 'bg-electric-500/20 text-electric-400'
                          : 'text-carbon-200 hover:bg-carbon-800'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-carbon-800">
                {isAuthenticated && user ? (
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-carbon-800/50">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-500 to-volt-500 flex items-center justify-center text-white text-lg font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-carbon-500">{user.email}</p>
                      </div>
                    </div>

                    {/* User Menu Links */}
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/orders"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 py-3 rounded-lg bg-carbon-800 text-carbon-200 hover:bg-electric-500/20 hover:text-electric-400 transition-colors"
                      >
                        <Package className="w-5 h-5" />
                        Orders
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 py-3 rounded-lg bg-carbon-800 text-carbon-200 hover:bg-electric-500/20 hover:text-electric-400 transition-colors"
                      >
                        <Settings className="w-5 h-5" />
                        Settings
                      </Link>
                    </div>

                    {/* Logout */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-electric-500 text-white font-medium"
                    >
                      <User className="w-5 h-5" />
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-electric-500/50 text-electric-400"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-electric-600/20 to-volt-500/20 border border-electric-500/20">
                <p className="text-sm text-carbon-300">Need help?</p>
                <p className="text-lg font-semibold text-white mt-1">+91 98765 43210</p>
                <p className="text-sm text-electric-400 mt-2">Mon-Sat: 9AM - 8PM</p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

