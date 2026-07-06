import React from 'react'

interface Milestone {
  year?: string
  title?: string
  description?: string
  images?: unknown[]
  id?: string
}

interface MilestonesTimelineBlockProps {
  heading?: string
  milestones?: Milestone[]
}

export function MilestonesTimelineBlock({ heading, milestones = [] }: MilestonesTimelineBlockProps) {
  return (
    <section className="bg-[#fefccf] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {heading && (
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-[#1a0d05]">{heading}</h2>
            <div className="mt-4 flex justify-center">
              <div className="w-16 h-px bg-[#755b00]/30" />
            </div>
          </div>
        )}

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[3.5rem] md:left-1/2 top-0 bottom-0 w-px bg-[#755b00]/20 -translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {milestones.map((m, i) => (
              <div
                key={i}
                className={`relative flex gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start`}
              >
                {/* Year (mobile: left side, desktop: center) */}
                <div
                  className={`flex-shrink-0 w-28 ${
                    i % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  } md:w-[calc(50%-2rem)]`}
                >
                  <span className="font-heading text-4xl md:text-5xl text-[#755b00]/25 font-bold leading-none">
                    {m.year}
                  </span>
                </div>

                {/* Center dot */}
                <div className="absolute left-[3.5rem] md:left-1/2 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#fefccf] border-2 border-[#755b00] z-10" />

                {/* Content */}
                <div
                  className={`flex-1 md:w-[calc(50%-2rem)] pb-2 ${
                    i % 2 === 0 ? 'md:pl-8' : 'md:pr-8'
                  }`}
                >
                  <h3 className="font-heading text-xl text-[#1a0d05] mb-2">{m.title}</h3>
                  <p className="font-body text-base text-[#2c1810]/70 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
