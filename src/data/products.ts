export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  badge?: 'new' | 'sale' | 'hot';
  specs?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  productCount: number;
  image: string;
}

export const categories: Category[] = [
  {
    id: 'lighting',
    name: 'Lighting',
    icon: 'Lightbulb',
    description: 'LED bulbs, tube lights, decorative lights',
    productCount: 156,
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400',
  },
  {
    id: 'wiring',
    name: 'Wiring & Cables',
    icon: 'Cable',
    description: 'Electrical wires, cables, conduits',
    productCount: 89,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  },
  {
    id: 'switches',
    name: 'Switches & Sockets',
    icon: 'ToggleRight',
    description: 'Modular switches, plugs, sockets',
    productCount: 234,
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400',
  },
  {
    id: 'fans',
    name: 'Fans & Cooling',
    icon: 'Fan',
    description: 'Ceiling fans, exhaust fans, coolers',
    productCount: 67,
    image: 'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=400',
  },
  {
    id: 'appliances',
    name: 'Home Appliances',
    icon: 'Home',
    description: 'Geysers, heaters, kitchen appliances',
    productCount: 145,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
  },
  {
    id: 'tools',
    name: 'Tools & Equipment',
    icon: 'Wrench',
    description: 'Testers, multimeters, hand tools',
    productCount: 78,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Philips 12W LED Bulb Pack of 4',
    description: 'Energy-efficient LED bulbs with 15000 hours lifespan. Cool daylight 6500K color temperature for bright illumination.',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500',
    category: 'lighting',
    rating: 4.5,
    reviews: 2341,
    inStock: true,
    featured: true,
    badge: 'sale',
    specs: {
      'Wattage': '12W',
      'Lumens': '1200',
      'Color Temperature': '6500K',
      'Lifespan': '15000 hours',
      'Voltage': '220-240V',
    },
  },
  {
    id: 2,
    name: 'Havells 1200mm Ceiling Fan',
    description: 'Premium ceiling fan with powerful motor and aerodynamic blades for maximum air delivery.',
    price: 2499,
    originalPrice: 3199,
    image: 'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=500',
    category: 'fans',
    rating: 4.7,
    reviews: 1876,
    inStock: true,
    featured: true,
    badge: 'hot',
    specs: {
      'Sweep Size': '1200mm',
      'Speed': '380 RPM',
      'Air Delivery': '230 CMM',
      'Power': '72W',
      'Warranty': '2 Years',
    },
  },
  {
    id: 3,
    name: 'Anchor Roma 10A Switch Set',
    description: '6-in-1 modular switch set with elegant design and superior build quality. ISI marked for safety.',
    price: 849,
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500',
    category: 'switches',
    rating: 4.3,
    reviews: 945,
    inStock: true,
    featured: true,
    specs: {
      'Rating': '10A, 250V',
      'Material': 'Polycarbonate',
      'Modules': '6',
      'Warranty': '1 Year',
    },
  },
  {
    id: 4,
    name: 'Finolex FR Cable 2.5 sqmm (90m)',
    description: 'Flame retardant copper wire with PVC insulation. Ideal for house wiring applications.',
    price: 4299,
    originalPrice: 4999,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    category: 'wiring',
    rating: 4.8,
    reviews: 3210,
    inStock: true,
    badge: 'sale',
    specs: {
      'Cross Section': '2.5 sqmm',
      'Length': '90 meters',
      'Conductor': 'Electrolytic Copper',
      'Insulation': 'FR PVC',
      'Voltage Grade': '1100V',
    },
  },
  {
    id: 5,
    name: 'Crompton Digital Multimeter',
    description: 'Professional grade digital multimeter with auto-ranging and backlit LCD display.',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500',
    category: 'tools',
    rating: 4.6,
    reviews: 567,
    inStock: true,
    featured: true,
    badge: 'new',
    specs: {
      'DC Voltage': '0.1mV - 1000V',
      'AC Voltage': '0.1mV - 750V',
      'Resistance': '0.1Ω - 40MΩ',
      'Display': 'LCD with Backlight',
      'Battery': '9V',
    },
  },
  {
    id: 6,
    name: 'Bajaj Instant Water Heater 3L',
    description: 'Compact instant water heater with titanium armored heating element and multi-layer safety.',
    price: 3999,
    originalPrice: 4599,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
    category: 'appliances',
    rating: 4.4,
    reviews: 1234,
    inStock: true,
    badge: 'sale',
    specs: {
      'Capacity': '3 Liters',
      'Power': '3000W',
      'Heating Element': 'Titanium Armored',
      'Thermostat': 'Capillary Type',
      'Warranty': '2 Years',
    },
  },
  {
    id: 7,
    name: 'Syska LED Strip Light 5m',
    description: 'Flexible RGB LED strip with remote control. Perfect for decoration and ambient lighting.',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=500',
    category: 'lighting',
    rating: 4.2,
    reviews: 789,
    inStock: true,
    badge: 'sale',
    specs: {
      'Length': '5 meters',
      'LED Type': 'SMD 5050',
      'Colors': 'RGB + White',
      'Control': 'IR Remote',
      'Voltage': '12V DC',
    },
  },
  {
    id: 8,
    name: 'Legrand 16A Power Strip',
    description: '4+1 universal sockets with surge protection and master switch. 2m cord length.',
    price: 1249,
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=500',
    category: 'switches',
    rating: 4.5,
    reviews: 456,
    inStock: true,
    specs: {
      'Sockets': '4 Universal + 1 USB',
      'Rating': '16A, 250V',
      'Cord Length': '2 meters',
      'Protection': 'Surge + Spike',
      'Material': 'Fire Retardant ABS',
    },
  },
  {
    id: 9,
    name: 'Orient Electric Wall Fan',
    description: 'High-speed wall mounted fan with pivoting head and thermal overload protection.',
    price: 1899,
    originalPrice: 2299,
    image: 'https://images.unsplash.com/photo-1617375407361-9815e4ee8c30?w=500',
    category: 'fans',
    rating: 4.3,
    reviews: 678,
    inStock: true,
    badge: 'hot',
    specs: {
      'Sweep Size': '400mm',
      'Speed': '1350 RPM',
      'Power': '55W',
      'Oscillation': '90°',
      'Warranty': '2 Years',
    },
  },
  {
    id: 10,
    name: 'Polycab Industrial MCB 32A',
    description: 'Triple pole miniature circuit breaker with 10kA breaking capacity.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500',
    category: 'wiring',
    rating: 4.7,
    reviews: 234,
    inStock: true,
    badge: 'new',
    specs: {
      'Poles': 'Triple Pole',
      'Rating': '32A',
      'Breaking Capacity': '10kA',
      'Curve': 'C',
      'Standard': 'IS/IEC 60898',
    },
  },
  {
    id: 11,
    name: 'Wipro Smart LED Bulb',
    description: 'WiFi enabled smart bulb with 16 million colors. Works with Alexa and Google Home.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500',
    category: 'lighting',
    rating: 4.4,
    reviews: 1567,
    inStock: true,
    featured: true,
    badge: 'new',
    specs: {
      'Wattage': '9W',
      'Connectivity': 'WiFi 2.4GHz',
      'Colors': '16 Million',
      'Voice Control': 'Alexa, Google',
      'App': 'Wipro Smart',
    },
  },
  {
    id: 12,
    name: 'V-Guard Stabilizer 5KVA',
    description: 'Mainline voltage stabilizer for complete home protection. Digital display with time delay.',
    price: 8999,
    originalPrice: 10499,
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500',
    category: 'appliances',
    rating: 4.6,
    reviews: 892,
    inStock: true,
    badge: 'sale',
    specs: {
      'Capacity': '5 KVA',
      'Input Range': '140V - 280V',
      'Output': '220V ± 5%',
      'Display': 'Digital LED',
      'Warranty': '3 Years',
    },
  },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.category.toLowerCase().includes(lowercaseQuery)
  );
};

