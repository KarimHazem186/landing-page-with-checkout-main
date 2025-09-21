"use client"

import { X } from "lucide-react"
import { useState } from "react"

export function NotificationBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm relative">
      <p>
        🚚 <strong>Free shipping</strong> on orders above $200! Use code <strong>FREESHIP</strong>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:opacity-70"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
