'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import FullPageLoader from '@/components/FullPageLoader';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses?: Address[];
  createdAt: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // For button/component loading states (login, signup, etc.)
  isInitializing: boolean; // For initial auth check on page load (full-page loader)
  orders: Order[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => Order;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Sample orders for demo
const sampleOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'BE-2024-001234',
    items: [
      { id: 1, name: 'Philips 12W LED Bulb Pack of 4', price: 599, quantity: 2, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=100' },
      { id: 2, name: 'Havells 1200mm Ceiling Fan', price: 2499, quantity: 1, image: 'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=100' },
    ],
    subtotal: 3697,
    shipping: 0,
    tax: 665,
    total: 4362,
    status: 'Delivered',
    paymentMethod: 'UPI',
    shippingAddress: {
      id: '1',
      name: 'Home',
      phone: '+91 98765 43210',
      street: '123 Electric Avenue',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
    createdAt: '2024-11-15T10:30:00Z',
    updatedAt: '2024-11-18T14:20:00Z',
  },
  {
    id: '2',
    orderNumber: 'BE-2024-001235',
    items: [
      { id: 5, name: 'Crompton Digital Multimeter', price: 1599, quantity: 1, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100' },
    ],
    subtotal: 1599,
    shipping: 0,
    tax: 288,
    total: 1887,
    status: 'Shipped',
    paymentMethod: 'Credit/Debit Card',
    shippingAddress: {
      id: '1',
      name: 'Home',
      phone: '+91 98765 43210',
      street: '123 Electric Avenue',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
    createdAt: '2024-12-01T15:45:00Z',
    updatedAt: '2024-12-03T09:15:00Z',
  },
  {
    id: '3',
    orderNumber: 'BE-2024-001236',
    items: [
      { id: 4, name: 'Finolex FR Cable 2.5 sqmm (90m)', price: 4299, quantity: 1, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100' },
      { id: 3, name: 'Anchor Roma 10A Switch Set', price: 849, quantity: 3, image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=100' },
    ],
    subtotal: 6846,
    shipping: 0,
    tax: 1232,
    total: 8078,
    status: 'Processing',
    paymentMethod: 'Cash on Delivery',
    shippingAddress: {
      id: '2',
      name: 'Office',
      phone: '+91 98765 43211',
      street: '456 Industrial Area',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      isDefault: false,
    },
    createdAt: '2024-12-05T11:20:00Z',
    updatedAt: '2024-12-05T11:20:00Z',
  },
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true); // For initial auth check only
  const [isLoading, setIsLoading] = useState(false); // For login/signup button states
  const [orders, setOrders] = useState<Order[]>([]);

  // Load user from localStorage on mount (initial auth check)
  useEffect(() => {
    const savedUser = localStorage.getItem('balaji-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setOrders(sampleOrders); // Load sample orders for logged-in user
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
    setIsInitializing(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('balaji-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('balaji-user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo: Accept any email/password combination
    if (email && password) {
      const newUser: User = {
        id: '1',
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email,
        phone: '+91 98765 43210',
        createdAt: new Date().toISOString(),
        addresses: [
          {
            id: '1',
            name: 'Home',
            phone: '+91 98765 43210',
            street: '123 Electric Avenue',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
            isDefault: true,
          },
        ],
      };
      setUser(newUser);
      setOrders(sampleOrders);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        createdAt: new Date().toISOString(),
        addresses: [],
      };
      setUser(newUser);
      setOrders([]);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(prev => prev ? { ...prev, ...data } : null);
    return true;
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (!user) return;
    
    const newAddress: Address = {
      ...address,
      id: Date.now().toString(),
    };
    
    setUser(prev => {
      if (!prev) return null;
      const addresses = prev.addresses || [];
      // If this is set as default, remove default from others
      const updatedAddresses = address.isDefault
        ? addresses.map(a => ({ ...a, isDefault: false }))
        : addresses;
      return {
        ...prev,
        addresses: [...updatedAddresses, newAddress],
      };
    });
  };

  const removeAddress = (addressId: string) => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: prev.addresses?.filter(a => a.id !== addressId) || [],
      };
    });
  };

  const setDefaultAddress = (addressId: string) => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: prev.addresses?.map(a => ({
          ...a,
          isDefault: a.id === addressId,
        })) || [],
      };
    });
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order => {
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderNumber: `BE-${Date.now().toString().slice(-8)}`,
      createdAt: now,
      updatedAt: now,
    };
    
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  // Show full-page loader only during initial auth check (page load/reload)
  // This prevents layout flash and will be useful for server-side auth
  if (isInitializing) {
    return <FullPageLoader />;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isInitializing,
        orders,
        login,
        signup,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
        createOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

