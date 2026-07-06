import * as React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'terracotta' | 'muted'
}

export function Badge({ className, variant = 'gold', children, ...props }: BadgeProps) {
  const variants = {
    gold: 'bg-[#755b00]/10 text-[#755b00] border border-[#755b00]/20',
    terracotta: 'bg-[#944925]/10 text-[#944925] border border-[#944925]/20',
    muted: 'bg-[#1a0d05]/5 text-[#6b5a4e] border border-[#1a0d05]/10',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-widest uppercase rounded-sm font-body',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
