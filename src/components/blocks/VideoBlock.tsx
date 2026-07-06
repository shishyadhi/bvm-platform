import React from 'react'
import Link from 'next/link'
import { Play, ArrowRight } from 'lucide-react'

interface VideoBlockProps {
  heading?: string
  description?: string
  thumbnail?: unknown
  videoUrl?: string
  videoLabel?: string
  videoTitle?: string
  viewAllText?: string
  viewAllUrl?: string
}

export function VideoBlock({
  heading,
  description,
  videoLabel,
  videoTitle,
  viewAllText,
  viewAllUrl,
}: VideoBlockProps) {
  return (
    <section className="bg-[#fffef5] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-[#1a0d05] mb-3">{heading}</h2>
          {description && (
            <p className="font-body text-base text-[#6b5a4e] max-w-lg mx-auto">{description}</p>
          )}
        </div>

        {/* Video player placeholder */}
        <div className="relative aspect-video rounded-sm overflow-hidden bg-gradient-to-br from-[#1a0d05] to-[#2c1810] group cursor-pointer">
          {/* Placeholder content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#F4C430]/10 border-2 border-[#F4C430]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play size={32} className="text-[#F4C430] ml-1" fill="currentColor" />
            </div>
            {videoLabel && (
              <p className="section-label text-[#F4C430]/50">{videoLabel}</p>
            )}
            {videoTitle && (
              <p className="font-heading text-xl text-[#fefccf]/80">{videoTitle}</p>
            )}
          </div>

          {/* Decorative grid overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(244,196,48,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(244,196,48,0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {viewAllText && viewAllUrl && (
          <div className="mt-8 text-center">
            <Link
              href={viewAllUrl}
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#944925] hover:gap-3 transition-all group"
            >
              {viewAllText}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
