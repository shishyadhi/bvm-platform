import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Paragraph {
  text: string
  id?: string
}

interface AboutBlockProps {
  label?: string
  heading?: string
  paragraphs?: Paragraph[]
  image?: unknown
  ctaText?: string
  ctaLink?: string
  imagePosition?: 'left' | 'right'
}

export function AboutBlock({
  label,
  heading,
  paragraphs = [],
  ctaText,
  ctaLink,
  imagePosition = 'right',
}: AboutBlockProps) {
  const textContent = (
    <div className="flex flex-col justify-center">
      {label && <p className="section-label mb-4">{label}</p>}
      <h2 className="font-heading text-3xl md:text-4xl text-[#1a0d05] leading-snug mb-6">
        {heading}
      </h2>
      <div className="flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="font-body text-base md:text-lg text-[#2c1810]/80 leading-relaxed">
            {p.text}
          </p>
        ))}
      </div>
      {ctaText && ctaLink && (
        <Link
          href={ctaLink}
          className="mt-8 inline-flex items-center gap-2 font-body text-sm font-semibold tracking-wide text-[#944925] hover:gap-3 transition-all duration-200 group"
        >
          {ctaText}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  )

  const imageContent = (
    <div className="relative">
      {/* Decorative placeholder for image */}
      <div className="aspect-[4/3] rounded-sm overflow-hidden bg-gradient-to-br from-[#755b00]/20 to-[#944925]/20 flex items-center justify-center border border-[#755b00]/10">
        <div className="text-center p-8">
          <div className="text-5xl text-[#755b00]/30 font-heading mb-2">॥</div>
          <p className="font-body text-xs tracking-widest uppercase text-[#755b00]/40">
            Brahma Vidya Mandir
          </p>
        </div>
      </div>
      {/* Offset border decoration */}
      <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#755b00]/20 rounded-sm -z-10" />
    </div>
  )

  return (
    <section className="bg-[#fefccf] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            imagePosition === 'left' ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {imagePosition === 'right' ? (
            <>
              {textContent}
              {imageContent}
            </>
          ) : (
            <>
              {imageContent}
              {textContent}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
