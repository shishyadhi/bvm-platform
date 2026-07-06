import React from 'react'
import Link from 'next/link'

interface CtaBannerBlockProps {
  heading?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export function CtaBannerBlock({ heading, description, buttonText, buttonLink }: CtaBannerBlockProps) {
  return (
    <section className="py-16 px-6">
      <div
        className="max-w-5xl mx-auto text-center rounded-xl p-12 md:p-16 border"
        style={{ background: '#F4C430', borderColor: 'rgba(140,90,40,0.15)' }}
      >
        {heading && (
          <h2 className="font-heading text-2xl md:text-3xl text-[#1a0d05] mb-3">{heading}</h2>
        )}
        {description && (
          <p className="font-body text-base text-[#1a0d05]/70 max-w-xl mx-auto mb-8">
            {description}
          </p>
        )}
        {buttonText && buttonLink && (
          <Link
            href={buttonLink}
            className="inline-flex items-center justify-center font-body text-sm font-semibold tracking-widest uppercase px-8 py-4 bg-[#1a0d05] text-[#F4C430] rounded-sm hover:bg-[#2c1810] transition-colors duration-200"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  )
}
