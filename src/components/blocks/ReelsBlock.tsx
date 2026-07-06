'use client'
import React, { useState } from 'react'
import { Play } from 'lucide-react'

interface Reel {
  title?: string
  topic?: string
  duration?: string
  thumbnail?: unknown
  videoUrl?: string
  id?: string
}

interface Topic {
  label?: string
  id?: string
}

interface ReelsBlockProps {
  heading?: string
  reels?: Reel[]
  topics?: Topic[]
}

export function ReelsBlock({ heading, reels = [], topics = [] }: ReelsBlockProps) {
  const [active, setActive] = useState('All')

  const pills = topics.length > 0 ? ['All', ...topics.map((t) => t.label || '')] : []
  const visible = active === 'All' ? reels : reels.filter((r) => r.topic === active)

  return (
    <section className="bg-[#fefccf] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {heading && (
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl text-[#1a0d05]">{heading}</h2>
          </div>
        )}

        {pills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {pills.map((label) => (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={`font-body text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-full border transition-colors ${
                  active === label
                    ? 'bg-[#755b00] text-[#fefccf] border-[#755b00]'
                    : 'bg-transparent text-[#755b00] border-[#755b00]/30 hover:border-[#755b00]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {visible.map((reel, i) => (
            <div
              key={i}
              className="group relative aspect-[9/16] rounded-sm overflow-hidden bg-gradient-to-b from-[#2c1810] to-[#1a0d05] cursor-pointer"
            >
              {/* Play button */}
              <div className="absolute inset-0 flex flex-col items-end justify-end p-4">
                <div className="w-10 h-10 rounded-full bg-[#F4C430]/20 border border-[#F4C430]/40 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
                  <Play size={16} className="text-[#F4C430] ml-0.5" fill="currentColor" />
                </div>
                {reel.title && (
                  <p className="font-body text-xs font-semibold text-[#fefccf] leading-snug">
                    {reel.title}
                  </p>
                )}
                {reel.duration && (
                  <p className="font-body text-[0.65rem] text-[#fefccf]/60 mt-1">{reel.duration}</p>
                )}
              </div>

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0d05]/80 via-transparent to-transparent" />

              {/* Decorative element */}
              <div className="absolute top-3 left-3">
                <span className="text-[#F4C430]/20 text-xs font-body tracking-widest">
                  ✦
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
