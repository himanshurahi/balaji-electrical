'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Zap,
  Users,
  Award,
  Clock,
  Shield,
  Truck,
  Star,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { value: '25+', label: 'Years Experience', icon: Clock },
    { value: '50K+', label: 'Happy Customers', icon: Users },
    { value: '10K+', label: 'Products', icon: Zap },
    { value: '100+', label: 'Brands', icon: Award },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'We only stock genuine products from authorized distributors with proper warranty.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Same day dispatch on orders placed before 2 PM. Free shipping on orders above ₹999.',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Our experienced team is always ready to help you choose the right products.',
    },
    {
      icon: Star,
      title: 'Best Prices',
      description: 'Competitive pricing with regular deals and discounts for our customers.',
    },
  ];

  const team = [
    { name: 'Rajesh Balaji', role: 'Founder & CEO', initials: 'RB' },
    { name: 'Sunita Balaji', role: 'Operations Head', initials: 'SB' },
    { name: 'Vikram Sharma', role: 'Technical Expert', initials: 'VS' },
    { name: 'Priya Mehta', role: 'Customer Relations', initials: 'PM' },
  ];

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-8 lg:py-12 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <nav className="flex items-center gap-2 text-sm text-carbon-400 mb-4">
            <Link href="/" className="hover:text-electric-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-carbon-300">About Us</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-white mb-2">
              About <span className="text-electric-400">Balaji Electricals</span>
            </h1>
            <p className="text-carbon-400">
              Your trusted partner for quality electrical products since 1995
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 text-electric-400 text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                OUR STORY
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6">
                Powering Homes & Businesses for <span className="text-electric-400">25+ Years</span>
              </h2>
              <div className="space-y-4 text-carbon-300 leading-relaxed">
                <p>
                  Founded in 1995 by Mr. Rajesh Balaji, Balaji Electricals started as a small shop 
                  in Mumbai with a vision to provide quality electrical products at fair prices.
                </p>
                <p>
                  Over the years, we have grown into one of the most trusted names in the electrical 
                  industry, serving thousands of customers across India. Our commitment to quality, 
                  authenticity, and customer service has remained unchanged.
                </p>
                <p>
                  Today, we offer over 10,000 products from 100+ leading brands, making us your 
                  one-stop destination for all electrical needs - from LED bulbs to industrial equipment.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card-electric text-center"
                  >
                    <stat.icon className="w-8 h-8 text-electric-400 mx-auto mb-3" />
                    <div className="font-display text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-carbon-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 lg:py-20 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-electric-400">Us</span>
            </h2>
            <p className="text-carbon-400 max-w-2xl mx-auto">
              We&apos;re committed to providing the best experience for our customers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-electric text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-electric-500/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-electric-400" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{value.title}</h3>
                <p className="text-carbon-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              Meet Our <span className="text-electric-400">Team</span>
            </h2>
            <p className="text-carbon-400 max-w-2xl mx-auto">
              The dedicated professionals behind Balaji Electricals
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-electric text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-electric-500 to-volt-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="font-display text-2xl font-bold text-white">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-lg">{member.name}</h3>
                <p className="text-electric-400 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 lg:py-20 bg-carbon-950/50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-electric max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-6">
                  Get in <span className="text-electric-400">Touch</span>
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-electric-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-electric-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Address</h4>
                      <p className="text-carbon-400 text-sm">
                        123 Electric Avenue, Industrial Area,<br />
                        Mumbai, Maharashtra 400001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-electric-500/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-electric-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Phone</h4>
                      <p className="text-carbon-400 text-sm">
                        +91 98765 43210<br />
                        Mon-Sat: 9AM - 8PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-electric-500/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-electric-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Email</h4>
                      <p className="text-carbon-400 text-sm">
                        info@balajielectricals.com<br />
                        support@balajielectricals.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-4">Send us a message</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input-electric"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input-electric"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="input-electric resize-none"
                  />
                  <button type="submit" className="w-full btn-electric">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

