
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-100 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-500))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--brand-500))] text-white hover:bg-[hsl(var(--brand-500))]/90 shadow-soft",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft",
        outline: "border-2 border-[hsl(var(--brand-500))] bg-transparent text-[hsl(var(--brand-500))] hover:bg-[hsl(var(--brand-500))]/5",
        secondary: "bg-[hsl(var(--surface-1))] text-[hsl(var(--text-primary))] border border-border hover:bg-muted shadow-soft",
        ghost: "hover:bg-muted/50 transition-all duration-200",
        link: "text-[hsl(var(--brand-500))] underline-offset-4 hover:underline",
        primary: "bg-[hsl(var(--brand-500))] text-white hover:bg-[hsl(var(--brand-500))]/90 shadow-soft",
        hero: "bg-[hsl(var(--brand-500))] text-white border-2 border-[hsl(var(--brand-500))] hover:bg-[hsl(var(--brand-500))]/90 shadow-soft font-semibold",
        soft: "bg-muted text-foreground hover:bg-muted/80 hover:shadow-soft transition-all duration-200"
      },
      size: {
        default: "h-11 px-6 py-2.5 text-sm",
        sm: "h-9 px-4 py-2 text-sm rounded-md",
        lg: "h-12 px-8 py-3 text-base rounded-lg",
        xl: "h-14 px-10 py-4 text-lg rounded-lg",
        icon: "h-11 w-11 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
