'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

interface NavLink {
  label: string
  href: string
  id?: string
}

interface NavProps {
  brandName?: string
  navLinks?: NavLink[]
  ctaText?: string
  ctaLink?: string
}

export function Navigation({ brandName = 'Brahma Vidya Mandir', navLinks = [], ctaText = 'Contact Us', ctaLink = '/contact' }: NavProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isHome = pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-[#fefccf]/95 backdrop-blur-sm shadow-sm border-b border-[#755b00]/15'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand */}
          <Link
            href="/"
            className={`font-heading text-lg lg:text-xl font-normal tracking-wide transition-colors ${
              scrolled || !isHome ? 'text-[#755b00]' : 'text-[#fefccf]'
            }`}
          >
            {brandName}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm font-medium tracking-wide transition-colors hover:text-[#755b00] ${
                  pathname === link.href
                    ? 'text-[#755b00]'
                    : scrolled || !isHome
                      ? 'text-[#2c1810]'
                      : 'text-[#fefccf]/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href={ctaLink}
              className="font-body text-sm font-semibold tracking-widest uppercase px-5 py-2.5 border transition-all duration-200 rounded-sm border-[#944925] text-[#944925] hover:bg-[#944925] hover:text-[#fefccf]"
            >
              {ctaText}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 rounded-sm transition-colors ${
              scrolled || !isHome ? 'text-[#755b00]' : 'text-[#fefccf]'
            }`}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#fefccf] border-t border-[#755b00]/15 shadow-lg">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-base font-medium tracking-wide py-2 border-b border-[#755b00]/10 last:border-0 transition-colors ${
                  pathname === link.href ? 'text-[#755b00]' : 'text-[#2c1810] hover:text-[#755b00]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={ctaLink}
              className="mt-2 font-body text-sm font-semibold tracking-widest uppercase px-5 py-3 text-center border border-[#944925] text-[#944925] hover:bg-[#944925] hover:text-[#fefccf] transition-all rounded-sm"
            >
              {ctaText}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
