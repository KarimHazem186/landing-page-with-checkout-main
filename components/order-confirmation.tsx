"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Truck, CreditCard, Home, Phone, MapPin } from "lucide-react"

interface OrderConfirmationProps {
  orderId: string
  onContinueShopping: () => void
}

// Mock order data - in a real app this would come from an API
const mockOrderData = {
  id: "ORD-20241221ABC123",
  status: "confirmed",
  items: [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image: "/premium-wireless-headphones-black-modern.jpg",
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 1,
      image: "/smart-fitness-watch-black-sleek-modern.jpg",
    },
  ],
  customer: {
    name: "John Doe",
    phone: "+1234567890",
    address: "123 Main Street, Downtown Area, New York, NY 10001",
  },
  shipping: {
    method: "Express Shipping",
    cost: 12.99,
    estimatedDelivery: "2-3 business days",
  },
  payment: {
    method: "Cash on Delivery",
    subtotal: 499.98,
    shippingCost: 12.99,
    total: 512.97,
  },
  createdAt: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
}

export function OrderConfirmation({ orderId, onContinueShopping }: OrderConfirmationProps) {
  const order = { ...mockOrderData, id: orderId }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Order Number</p>
                    <p className="text-sm text-muted-foreground">{order.id}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>

                <div>
                  <p className="font-medium">Order Date</p>
                  <p className="text-sm text-muted-foreground">{order.createdAt}</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Items Ordered</h4>
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 border rounded-lg">
                      <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-sm text-balance">{item.name}</h5>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Home className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{order.customer.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm">{order.customer.phone}</p>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{order.shipping.method}</p>
                    <p className="text-sm text-muted-foreground">
                      Estimated delivery: {order.shipping.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${order.payment.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${order.payment.shippingCost.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${order.payment.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{order.payment.method}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Payment will be collected upon delivery</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Order Processing</p>
                    <p className="text-xs text-muted-foreground">We'll prepare your items for shipping</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Out for Delivery</p>
                    <p className="text-xs text-muted-foreground">Your order will be dispatched soon</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Delivered</p>
                    <p className="text-xs text-muted-foreground">Pay cash upon delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={onContinueShopping} className="w-full" size="lg">
              Continue Shopping
            </Button>
          </div>
        </div>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you have any questions about your order, feel free to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
                <Button variant="outline" size="sm">
                  <Package className="h-4 w-4 mr-2" />
                  Track Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
