import { Truck, Shield, Headphones, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Express shipping available with 2-3 day delivery nationwide",
  },
  {
    icon: CreditCard,
    title: "Cash on Delivery",
    description: "Pay when you receive your order - no advance payment required",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "30-day return policy with full warranty on all products",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service for all your queries",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Why Choose TechStore?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We're committed to providing the best shopping experience with premium products and exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
