import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Paragraph {
  text: string
  id?: string
}

interface AcharyaBlockProps {
  label?: string
  name?: string
  roleTitle?: string
  portrait?: unknown
  paragraphs?: Paragraph[]
  linkText?: string
  linkUrl?: string
  portraitPosition?: 'left' | 'right'
}

export function AcharyaBlock({
  label,
  name,
  roleTitle,
  paragraphs = [],
  linkText,
  linkUrl,
  portraitPosition = 'left',
}: AcharyaBlockProps) {
  const portrait = (
    <div className="flex justify-center">
      <div className="relative">
        {/* Portrait placeholder */}
        <div className="w-64 h-80 md:w-80 md:h-96 rounded-sm bg-gradient-to-b from-[#755b00]/15 to-[#944925]/10 border border-[#755b00]/20 flex items-end justify-center overflow-hidden">
          {/* Stylized silhouette */}
          <div className="flex flex-col items-center pb-6 gap-2">
            <div className="w-16 h-16 rounded-full bg-[#755b00]/20 flex items-center justify-center">
              <span className="font-heading text-2xl text-[#755b00]/60">
                {name ? name[0] : 'A'}
              </span>
            </div>
            <p className="font-body text-xs text-[#755b00]/50 tracking-widest uppercase">
              Portrait
            </p>
          </div>
        </div>
        {/* Gold offset border */}
        <div className="absolute -bottom-3 -left-3 w-full h-full border border-[#F4C430]/30 rounded-sm -z-10" />
        {/* Label badge */}
        {label && (
          <div className="absolute -top-4 left-4 bg-[#fefccf] border border-[#755b00]/20 px-3 py-1">
            <p className="section-label text-[#755b00]">{label}</p>
          </div>
        )}
      </div>
    </div>
  )

  const bio = (
    <div className="flex flex-col justify-center">
      <h2 className="font-heading text-3xl md:text-4xl text-[#1a0d05] leading-snug mb-1">
        {name}
      </h2>
      {roleTitle && (
        <p className="font-body text-sm tracking-wide text-[#944925] mb-6">{roleTitle}</p>
      )}
      <div className="flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="font-body text-base md:text-lg text-[#2c1810]/80 leading-relaxed">
            {p.text}
          </p>
        ))}
      </div>
      {linkText && linkUrl && (
        <Link
          href={linkUrl}
          className="mt-8 inline-flex items-center gap-2 font-body text-sm font-semibold tracking-wide text-[#944925] hover:gap-3 transition-all duration-200 group"
        >
          {linkText}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  )

  return (
    <section className="bg-[#fffef5] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {portraitPosition === 'left' ? (
            <>
              {portrait}
              {bio}
            </>
          ) : (
            <>
              {bio}
              {portrait}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
