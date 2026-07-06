import React from 'react'

interface TestimonialItem {
  quote?: string
  authorName?: string
  authorRole?: string
  authorInitial?: string
  id?: string
}

interface TestimonialsBlockProps {
  heading?: string
  items?: TestimonialItem[]
}

export function TestimonialsBlock({ heading, items = [] }: TestimonialsBlockProps) {
  return (
    <section className="bg-[#fffef5] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {heading && (
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl text-[#1a0d05]">{heading}</h2>
            <div className="mt-4 flex justify-center">
              <div className="w-12 h-px bg-[#755b00]/30" />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-[#fefccf] border border-[#755b00]/10 rounded-sm p-8 relative group hover:border-[#755b00]/25 hover:shadow-sm transition-all duration-200"
            >
              {/* Quote mark */}
              <span className="absolute top-4 right-6 font-heading text-6xl text-[#755b00]/10 leading-none select-none">
                &rdquo;
              </span>

              <p className="font-body text-base text-[#2c1810]/80 leading-relaxed mb-6 italic">
                {item.quote?.startsWith('"') ? item.quote : `"${item.quote}"`}
              </p>

              <div className="flex items-center gap-3">
                {/* Avatar circle */}
                <div className="w-10 h-10 rounded-full bg-[#755b00]/15 border border-[#755b00]/20 flex items-center justify-center shrink-0">
                  <span className="font-heading text-base text-[#755b00]">
                    {item.authorInitial || item.authorName?.[0] || '?'}
                  </span>
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-[#1a0d05]">{item.authorName}</p>
                  {item.authorRole && (
                    <p className="font-body text-xs text-[#6b5a4e]">{item.authorRole}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
