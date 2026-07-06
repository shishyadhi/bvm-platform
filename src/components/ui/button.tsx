'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'cream'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-body font-medium tracking-wide transition-all duration-200 rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
      primary:
        'bg-[#944925] text-[#fefccf] hover:bg-[#7a3a1d] focus-visible:ring-[#944925]',
      outline:
        'border border-[#755b00] text-[#755b00] hover:bg-[#755b00] hover:text-[#fefccf] focus-visible:ring-[#755b00]',
      ghost:
        'text-[#755b00] hover:bg-[#755b00]/10 focus-visible:ring-[#755b00]',
      cream:
        'bg-[#fefccf] text-[#1a0d05] hover:bg-[#f5f0b0] focus-visible:ring-[#fefccf]',
    }

    const sizes = {
      sm: 'text-xs px-4 py-2',
      md: 'text-sm px-6 py-3',
      lg: 'text-base px-8 py-4',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
