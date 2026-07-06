import React from 'react'

interface Member {
  name?: string
  title?: string
  portrait?: unknown
  description?: string
  portraitSide?: 'left' | 'right'
  id?: string
}

interface LineageDisplayBlockProps {
  members?: Member[]
}

export function LineageDisplayBlock({ members = [] }: LineageDisplayBlockProps) {
  return (
    <section className="bg-[#fefccf] py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-24">
        {members.map((member, i) => {
          const portraitOnLeft = member.portraitSide === 'left'

          const portrait = (
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-56 h-72 md:w-72 md:h-96 rounded-sm bg-gradient-to-b from-[#755b00]/10 to-[#944925]/10 border border-[#755b00]/15 flex flex-col items-center justify-end pb-8 overflow-hidden">
                  {/* Large initial */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-8xl text-[#755b00]/10">
                    {member.name?.[0] || '?'}
                  </div>
                  <div className="relative z-10 text-center px-4">
                    <p className="font-body text-xs tracking-widest uppercase text-[#755b00]/50">
                      Portrait
                    </p>
                  </div>
                </div>
                {/* Offset border */}
                <div
                  className={`absolute -bottom-3 ${portraitOnLeft ? '-right-3' : '-left-3'} w-full h-full border border-[#F4C430]/25 rounded-sm -z-10`}
                />
              </div>
            </div>
          )

          const text = (
            <div className="flex flex-col justify-center">
              {/* Number */}
              <span className="font-heading text-6xl text-[#755b00]/10 leading-none mb-2 select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-heading text-2xl md:text-3xl text-[#1a0d05] mb-1">
                {member.name}
              </h3>
              {member.title && (
                <p className="section-label text-[#944925] mb-4">{member.title}</p>
              )}
              <div className="w-10 h-px bg-[#755b00]/30 mb-5" />
              <p className="font-body text-base md:text-lg text-[#2c1810]/75 leading-relaxed">
                {member.description}
              </p>
            </div>
          )

          return (
            <div
              key={i}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              {portraitOnLeft ? (
                <>
                  {portrait}
                  {text}
                </>
              ) : (
                <>
                  {text}
                  {portrait}
                </>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
