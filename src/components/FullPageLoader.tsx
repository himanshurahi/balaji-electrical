'use client';

import React from 'react';
import { Zap } from 'lucide-react';

interface FullPageLoaderProps {
  message?: string;
  submessage?: string;
}

export default function FullPageLoader({ 
  message, 
  submessage 
}: FullPageLoaderProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-carbon-950 overflow-hidden">
      {/* Hide body scrollbar while loading */}
      <style jsx global>{`body { overflow: hidden !important; }`}</style>
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-electric-500 to-electric-600 flex items-center justify-center animate-pulse">
            <Zap className="w-10 h-10 text-white" />
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl bg-electric-500/30 blur-xl animate-pulse" />
        </div>
        
        {/* Brand Name */}
        <h1 className="font-display text-2xl font-bold text-white tracking-wider mb-2">
          BALAJI
        </h1>
        <p className="text-xs text-electric-400 tracking-widest mb-6">
          ELECTRICALS
        </p>
        
        {/* Custom message if provided */}
        {message && (
          <p className="text-white font-semibold text-lg mb-1">{message}</p>
        )}
        {submessage && (
          <p className="text-carbon-400 text-sm mb-4">{submessage}</p>
        )}
        
        {/* Loading indicator */}
        <div className="flex items-center justify-center gap-1">
          <div className="w-2 h-2 rounded-full bg-electric-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-electric-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-electric-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

