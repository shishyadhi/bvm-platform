import React from 'react'
import Link from 'next/link'
import { MapPin, Video, Volume2, Download, Calendar } from 'lucide-react'

interface ScheduleItem {
  category?: string
  title?: string
  day?: string
  time?: string
  location?: string
  locationIcon?: string
  id?: string
}

interface ClassScheduleBlockProps {
  label?: string
  heading?: string
  sideQuote?: string
  scheduleItems?: ScheduleItem[]
  calendarLinkText?: string
  calendarLinkUrl?: string
}

const LOCATION_ICONS: Record<string, React.ReactNode> = {
  location_on: <MapPin size={14} />,
  video_library: <Video size={14} />,
  spatial_audio_off: <Volume2 size={14} />,
}

export function ClassScheduleBlock({
  label,
  heading,
  sideQuote,
  scheduleItems = [],
  calendarLinkText,
  calendarLinkUrl,
}: ClassScheduleBlockProps) {
  return (
    <section className="bg-[#fefccf] py-20 px-6 border-t border-[#755b00]/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          {/* Left: header + quote */}
          <div className="flex flex-col justify-between">
            <div>
              {label && <p className="section-label mb-4">{label}</p>}
              <h2 className="font-heading text-3xl md:text-4xl text-[#1a0d05] leading-snug mb-8">
                {heading}
              </h2>
            </div>
            {sideQuote && (
              <div className="border-l-2 border-[#F4C430] pl-5">
                <p className="font-heading italic text-base text-[#755b00] leading-relaxed">
                  &ldquo;{sideQuote}&rdquo;
                </p>
              </div>
            )}
            {calendarLinkText && calendarLinkUrl && (
              <Link
                href={calendarLinkUrl}
                className="mt-8 inline-flex items-center gap-2 font-body text-sm font-semibold text-[#944925] hover:text-[#7a3a1d] transition-colors group"
              >
                <Download size={14} />
                {calendarLinkText}
              </Link>
            )}
          </div>

          {/* Right: schedule cards */}
          <div className="flex flex-col gap-4">
            {scheduleItems.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-[#755b00]/10 rounded-sm p-6 hover:border-[#755b00]/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    {item.category && (
                      <p className="section-label text-[#944925] mb-2">{item.category}</p>
                    )}
                    <h3 className="font-heading text-xl text-[#1a0d05] mb-3">{item.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-[#6b5a4e]">
                      {item.day && (
                        <span className="flex items-center gap-1.5 font-body">
                          <Calendar size={13} className="text-[#755b00]" />
                          {item.day}
                        </span>
                      )}
                      {item.time && (
                        <span className="font-body font-medium text-[#1a0d05]">{item.time}</span>
                      )}
                    </div>
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-2 text-xs font-body text-[#6b5a4e] bg-[#755b00]/5 px-3 py-2 rounded-sm shrink-0">
                      <span className="text-[#755b00]">
                        {LOCATION_ICONS[item.locationIcon || 'location_on']}
                      </span>
                      {item.location}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
