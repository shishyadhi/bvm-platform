import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PublicationsGrid } from './PublicationsGrid'

interface PublicationsListingBlockProps {
  heading?: string
  eyebrow?: string
  description?: string
  infoNote?: string
  showCategoryFilter?: boolean
  requestButtonText?: string
  requestButtonLink?: string
}

export async function PublicationsListingBlock({
  heading,
  eyebrow,
  description,
  infoNote,
  showCategoryFilter = true,
  requestButtonText,
  requestButtonLink,
}: PublicationsListingBlockProps) {
  const payload = await getPayload({ config })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (payload.find as any)({ collection: 'publications', sort: 'order', limit: 50 })

  return (
    <section className="bg-[#fefccf] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {eyebrow && <p className="section-label text-[#944925] mb-3">{eyebrow}</p>}
          {heading && <h1 className="font-heading text-4xl md:text-5xl text-[#1a0d05] mb-4">{heading}</h1>}
          {description && (
            <p className="font-body text-base text-[#6b5a4e] leading-relaxed mb-4">{description}</p>
          )}
          {infoNote && (
            <p className="inline-block font-body text-xs tracking-wide text-[#755b00] bg-[#755b00]/10 border border-[#755b00]/20 rounded-full px-4 py-2">
              {infoNote}
            </p>
          )}
        </div>

        <PublicationsGrid
          publications={result.docs}
          requestButtonText={requestButtonText}
          requestButtonLink={requestButtonLink}
          showCategoryFilter={showCategoryFilter}
        />
      </div>
    </section>
  )
}
