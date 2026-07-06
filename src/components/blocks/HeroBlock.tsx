import React from 'react'
import Link from 'next/link'
import { ArrowDown } from 'lucide-react'

interface HeroBlockProps {
  label?: string
  heading?: string
  sanskritQuote?: string
  quoteSource?: string
  quoteTranslation?: string
  image?: unknown
  ctaText?: string
  ctaLink?: string
}

export function HeroBlock({
  label,
  heading,
  sanskritQuote,
  quoteSource,
  quoteTranslation,
  ctaText,
  ctaLink,
}: HeroBlockProps) {
  const isHomePage = !!sanskritQuote

  if (isHomePage) {
    return (
      <section className="hero-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #F4C430 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Decorative top ornament */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[#F4C430]/30">
          <div className="w-24 h-px bg-[#F4C430]/30" />
          <span className="text-sm">✦</span>
          <div className="w-24 h-px bg-[#F4C430]/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {label && (
            <p className="section-label text-[#F4C430]/70 mb-6">{label}</p>
          )}

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-[#fefccf] leading-tight mb-10">
            {heading}
          </h1>

          {/* Sanskrit quote */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-[#F4C430]/40" />
              <span className="text-[#F4C430]/60 text-xs">✦</span>
              <div className="w-16 h-px bg-[#F4C430]/40" />
            </div>
            <p className="font-heading italic text-xl md:text-2xl text-[#F4C430] leading-relaxed mb-3">
              {sanskritQuote}
            </p>
            {quoteSource && (
              <p className="font-body text-xs tracking-widest uppercase text-[#fefccf]/40 mb-4">
                {quoteSource}
              </p>
            )}
            {quoteTranslation && (
              <p className="font-body text-sm md:text-base text-[#fefccf]/60 italic max-w-2xl mx-auto leading-relaxed">
                {quoteTranslation}
              </p>
            )}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-16 h-px bg-[#F4C430]/40" />
              <span className="text-[#F4C430]/60 text-xs">✦</span>
              <div className="w-16 h-px bg-[#F4C430]/40" />
            </div>
          </div>

          {ctaText && ctaLink && (
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-3 font-body text-sm font-semibold tracking-widest uppercase px-8 py-4 border border-[#F4C430]/60 text-[#F4C430] hover:bg-[#F4C430] hover:text-[#1a0d05] transition-all duration-300 rounded-sm"
            >
              {ctaText}
              <ArrowDown size={14} />
            </Link>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#fefccf]/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#fefccf]/20" />
        </div>
      </section>
    )
  }

  /* Inner page hero (no Sanskrit quote) — simpler, shorter */
  return (
    <section className="bg-[#2c1810] pt-32 pb-20 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #F4C430 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {label && (
          <p className="section-label text-[#F4C430]/60 mb-4">{label}</p>
        )}
        <h1 className="font-heading text-4xl md:text-6xl text-[#fefccf] leading-tight mb-6">
          {heading}
        </h1>
        {quoteTranslation && (
          <p className="font-body text-base md:text-lg text-[#fefccf]/60 max-w-2xl mx-auto leading-relaxed">
            {quoteTranslation}
          </p>
        )}
      </div>
    </section>
  )
}
