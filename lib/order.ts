export interface OrderData {
  fullName: string
  phoneNumber: string
  city: string
  address: string
  notes?: string
  shippingOption: string
}

export interface Order extends OrderData {
  id: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  subtotal: number
  shippingCost: number
  total: number
  createdAt: string
}

export function generateOrderId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "")
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `ORD-${date}${random}`
}

export function validateOrderData(data: OrderData): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.push("Full name must be at least 3 characters long")
  }

  if (!data.phoneNumber || !/^\d{10,15}$/.test(data.phoneNumber.replace(/\s/g, ""))) {
    errors.push("Phone number must be 10-15 digits only")
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.push("City is required")
  }

  if (!data.address || data.address.trim().length < 10) {
    errors.push("Address must be at least 10 characters long")
  }

  if (!data.shippingOption) {
    errors.push("Please select a shipping option")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
