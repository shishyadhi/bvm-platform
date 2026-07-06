import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { MapPin, Clock, Calendar, ChevronRight } from 'lucide-react'

interface ClassListingBlockProps {
  heading?: string
  description?: string
  showLocationFilter?: boolean
  enrollButtonText?: string
}

const CATEGORY_LABELS: Record<string, string> = {
  vedanta: 'Vedanta',
  chanting: 'Chanting',
  pooja: 'Pooja',
}

const LOCATION_LABELS: Record<string, string> = {
  chennai: 'Chennai',
  coimbatore: 'Coimbatore',
  online: 'Online',
  hybrid: 'Online & In-person',
}

const CATEGORY_COLORS: Record<string, string> = {
  vedanta: 'bg-[#755b00]/10 text-[#755b00] border-[#755b00]/20',
  chanting: 'bg-[#944925]/10 text-[#944925] border-[#944925]/20',
  pooja: 'bg-[#F4C430]/15 text-[#755b00] border-[#F4C430]/30',
}

export async function ClassListingBlock({
  enrollButtonText = 'Enroll',
}: ClassListingBlockProps) {
  const payload = await getPayload({ config })
  const result = await (payload.find as any)({ collection: 'classes', sort: 'title', limit: 50 })
  const classes: any[] = result.docs

  // Group by category
  const grouped: Record<string, typeof classes> = {
    vedanta: classes.filter((c) => c.category === 'vedanta'),
    chanting: classes.filter((c) => c.category === 'chanting'),
    pooja: classes.filter((c) => c.category === 'pooja'),
  }

  return (
    <section className="bg-[#fefccf] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {Object.entries(grouped).map(([cat, items]) => {
          if (!items.length) return null
          return (
            <div key={cat} className="mb-16 last:mb-0">
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8">
                <span
                  className={`inline-flex items-center px-3 py-1 text-[0.65rem] font-semibold tracking-widest uppercase rounded-sm border font-body ${CATEGORY_COLORS[cat] || 'bg-gray-100 text-gray-600 border-gray-200'}`}
                >
                  {CATEGORY_LABELS[cat] || cat}
                </span>
                <div className="flex-1 h-px bg-[#755b00]/15" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((cls: any) => (
                  <div
                    key={cls.id}
                    className="bg-white border border-[#755b00]/10 rounded-sm p-6 flex flex-col hover:border-[#755b00]/30 hover:shadow-sm transition-all duration-200 group"
                  >
                    <h3 className="font-heading text-xl text-[#1a0d05] mb-2 group-hover:text-[#755b00] transition-colors">
                      {cls.title}
                    </h3>

                    {cls.description && (
                      <p className="font-body text-sm text-[#6b5a4e] leading-relaxed mb-4 flex-1 line-clamp-3">
                        {cls.description}
                      </p>
                    )}

                    <div className="flex flex-col gap-1.5 mt-auto pt-4 border-t border-[#755b00]/8">
                      {(cls.day || cls.time) && (
                        <div className="flex items-center gap-2 font-body text-xs text-[#6b5a4e]">
                          <Calendar size={12} className="text-[#755b00]" />
                          <span>
                            {[cls.day && cls.day.charAt(0).toUpperCase() + cls.day.slice(1), cls.time]
                              .filter(Boolean)
                              .join(' · ')}
                          </span>
                        </div>
                      )}
                      {cls.duration && (
                        <div className="flex items-center gap-2 font-body text-xs text-[#6b5a4e]">
                          <Clock size={12} className="text-[#755b00]" />
                          <span>{cls.duration}</span>
                        </div>
                      )}
                      {cls.location && (
                        <div className="flex items-center gap-2 font-body text-xs text-[#6b5a4e]">
                          <MapPin size={12} className="text-[#755b00]" />
                          <span>{LOCATION_LABELS[cls.location] || cls.location}</span>
                        </div>
                      )}
                    </div>

                    {cls.enrollmentOpen && (
                      <button className="mt-5 w-full font-body text-xs font-semibold tracking-widest uppercase py-3 border border-[#944925] text-[#944925] hover:bg-[#944925] hover:text-[#fefccf] rounded-sm transition-all duration-200 flex items-center justify-center gap-1.5">
                        {enrollButtonText}
                        <ChevronRight size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
