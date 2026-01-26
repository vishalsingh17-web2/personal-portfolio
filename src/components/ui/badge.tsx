import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "gradient"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
          {
            "bg-primary/10 text-primary": variant === "default",
            "bg-secondary text-secondary-foreground": variant === "secondary",
            "border border-border text-foreground": variant === "outline",
            "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400":
              variant === "gradient",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
