'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-carbon-950 border-t border-electric-500/10">
      {/* Newsletter Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-600/10 via-transparent to-volt-500/10" />
        <div className="container mx-auto px-4 lg:px-6 py-12 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
              Stay <span className="text-electric-400">Connected</span>
            </h3>
            <p className="text-carbon-400 mb-6">
              Subscribe to get exclusive deals, new arrivals, and expert electrical tips!
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-lg bg-carbon-800/50 border border-electric-500/20 text-white placeholder-carbon-500 focus:outline-none focus:border-electric-500"
              />
              <button
                type="submit"
                className="btn-electric flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-5">
              <Zap className="w-8 h-8 text-electric-400" />
              <div>
                <h2 className="font-display text-xl font-bold text-white tracking-wider">
                  BALAJI
                </h2>
                <p className="text-xs text-electric-400 tracking-widest -mt-1">
                  ELECTRICALS
                </p>
              </div>
            </Link>
            <p className="text-carbon-400 text-sm leading-relaxed mb-6">
              Your trusted partner for quality electrical products since 1995. 
              We provide genuine products with warranty and exceptional customer service.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-carbon-800/50 border border-electric-500/20 text-carbon-400 hover:text-electric-400 hover:border-electric-500 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Products', href: '/products' },
                { label: 'Categories', href: '/categories' },
                { label: 'Deals & Offers', href: '/deals' },
                { label: 'Track Order', href: '/track-order' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-carbon-400 hover:text-electric-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-5">
              Categories
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Lighting Solutions', href: '/products?category=lighting' },
                { label: 'Wiring & Cables', href: '/products?category=wiring' },
                { label: 'Switches & Sockets', href: '/products?category=switches' },
                { label: 'Fans & Cooling', href: '/products?category=fans' },
                { label: 'Home Appliances', href: '/products?category=appliances' },
                { label: 'Tools & Equipment', href: '/products?category=tools' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-carbon-400 hover:text-electric-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-electric-400 mt-0.5 flex-shrink-0" />
                <span className="text-carbon-400 text-sm">
                  123 Electric Avenue, Industrial Area,<br />
                  Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-electric-400 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-carbon-400">+91 98765 43210</p>
                  <p className="text-carbon-500 text-xs">Mon-Sat: 9AM - 8PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-electric-400 flex-shrink-0" />
                <span className="text-carbon-400 text-sm">
                  info@balajielectricals.com
                </span>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-xs text-carbon-500 mb-3">Secure Payment Methods</p>
              <div className="flex gap-2 flex-wrap">
                {['Visa', 'Mastercard', 'UPI', 'PayTM', 'COD'].map((method) => (
                  <span
                    key={method}
                    className="px-3 py-1.5 text-xs rounded bg-carbon-800/50 border border-electric-500/10 text-carbon-400"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-carbon-800">
        <div className="container mx-auto px-4 lg:px-6 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-carbon-500 text-sm text-center md:text-left">
              © {currentYear} Balaji Electricals. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="text-carbon-500 hover:text-electric-400 text-sm transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Electric Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-500/50 to-transparent" />
    </footer>
  );
}

