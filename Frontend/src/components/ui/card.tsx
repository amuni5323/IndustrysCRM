import { cn } from "@/lib/utils"
import * as React from "react"

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-2xl border bg-white p-6 shadow-sm", className)}
    {...props}
  />
))

Card.displayName = "Card"
