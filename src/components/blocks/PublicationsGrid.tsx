'use client'
import React, { useState } from 'react'
import Link from 'next/link'

interface Publication {
  id: string
  title?: string
  author?: string
  category?: string
  tagLabel?: string
  description?: string
}

interface PublicationsGridProps {
  publications: Publication[]
  requestButtonText?: string
  requestButtonLink?: string
  showCategoryFilter?: boolean
}

const CATEGORY_LABELS: Record<string, string> = {
  upanishad: 'Upanishad',
  prakaranam: 'Bhagavath Prakaranam',
  geetha: 'Bhagavath Geetha',
  others: 'Others',
}

const CATEGORY_COLORS: Record<string, string> = {
  upanishad: 'from-[#755b00]/25 to-[#755b00]/5',
  prakaranam: 'from-[#944925]/25 to-[#944925]/5',
  geetha: 'from-[#F4C430]/30 to-[#F4C430]/5',
  others: 'from-[#2c1810]/25 to-[#2c1810]/5',
}

export function PublicationsGrid({
  publications,
  requestButtonText = 'Request Now',
  requestButtonLink = '/contact',
  showCategoryFilter = true,
}: PublicationsGridProps) {
  const [active, setActive] = useState('All')

  const categories = ['All', ...Array.from(new Set(publications.map((p) => p.category || '')))]
  const visible = active === 'All' ? publications : publications.filter((p) => p.category === active)

  return (
    <div>
      {showCategoryFilter && categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-body text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-full border transition-colors ${
                active === cat
                  ? 'bg-[#755b00] text-[#fefccf] border-[#755b00]'
                  : 'bg-transparent text-[#755b00] border-[#755b00]/30 hover:border-[#755b00]'
              }`}
            >
              {cat === 'All' ? 'All' : CATEGORY_LABELS[cat] || cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((pub) => (
          <div
            key={pub.id}
            className={`relative overflow-hidden rounded-sm border border-[#755b00]/10 p-6 flex flex-col bg-gradient-to-br ${CATEGORY_COLORS[pub.category || ''] || 'from-[#755b00]/15 to-[#755b00]/5'}`}
          >
            <span className="absolute top-2 right-4 text-6xl text-[#1a0d05]/5 font-heading select-none">
              ॐ
            </span>
            {pub.tagLabel && (
              <p className="section-label text-[#944925] mb-3 relative z-10">{pub.tagLabel}</p>
            )}
            <h3 className="font-heading text-xl text-[#1a0d05] mb-1 relative z-10">{pub.title}</h3>
            {pub.author && (
              <p className="font-body text-xs text-[#6b5a4e] mb-4 relative z-10">{pub.author}</p>
            )}
            {pub.description && (
              <p className="font-body text-sm text-[#2c1810]/80 leading-relaxed mb-6 flex-1 relative z-10">
                {pub.description}
              </p>
            )}
            <Link
              href={requestButtonLink}
              className="relative z-10 inline-flex items-center justify-center font-body text-xs font-semibold tracking-widest uppercase px-5 py-3 border border-[#944925] text-[#944925] hover:bg-[#944925] hover:text-[#fefccf] rounded-sm transition-colors duration-200 self-start"
            >
              {requestButtonText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
