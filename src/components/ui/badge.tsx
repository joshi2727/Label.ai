import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-xl border px-3 py-1 text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow-soft hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive-muted text-destructive border-destructive/20",
        outline: "text-foreground border-border",
        success: "border-transparent bg-success-muted text-success border-success/20",
        warning: "border-transparent bg-warning-muted text-warning border-warning/20",
        soft: "border-transparent bg-muted text-muted-foreground"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }