export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  features: string[]
  stock: number
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface ShippingOption {
  id: string
  name: string
  price: number
  description: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "/premium-wireless-headphones-black-modern.jpg",
    description:
      "Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium leather comfort",
      "Hi-Res Audio certified",
      "Quick charge: 5 min = 2 hours playback",
    ],
    stock: 5,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "/smart-fitness-watch-black-sleek-modern.jpg",
    description: "Track your fitness goals with advanced health monitoring, GPS, and 7-day battery life.",
    features: [
      "Heart rate monitoring",
      "Built-in GPS",
      "7-day battery life",
      "Water resistant to 50m",
      "Sleep tracking",
    ],
    stock: 5,
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    image: "/portable-bluetooth-speaker-compact-modern.jpg",
    description: "Powerful sound in a compact design. Perfect for outdoor adventures with 12-hour battery life.",
    features: [
      "360-degree sound",
      "12-hour battery life",
      "IPX7 waterproof",
      "Voice assistant compatible",
      "Compact portable design",
    ],
    stock: 5,
  },
]

export const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 5.99,
    description: "5-7 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 12.99,
    description: "2-3 business days",
  },
]
