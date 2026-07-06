import React from 'react'

interface Member {
  name?: string
  role?: string
  photo?: unknown
  bio?: string
  id?: string
}

interface TeamBlockProps {
  label?: string
  heading?: string
  description?: string
  members?: Member[]
}

export function TeamBlock({ label, heading, description, members = [] }: TeamBlockProps) {
  return (
    <section className="bg-[#fffef5] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          {label && <p className="section-label text-[#944925] mb-3">{label}</p>}
          <h2 className="font-heading text-3xl md:text-4xl text-[#1a0d05] mb-4">{heading}</h2>
          {description && (
            <p className="font-body text-base text-[#6b5a4e] leading-relaxed">{description}</p>
          )}
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {members.map((member, i) => (
            <div
              key={i}
              className="group relative flex-shrink-0 w-56 h-72 rounded-sm overflow-hidden bg-gradient-to-b from-[#755b00]/15 to-[#944925]/10 border border-[#755b00]/20 snap-start"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="w-16 h-16 rounded-full bg-[#755b00]/20 flex items-center justify-center">
                  <span className="font-heading text-2xl text-[#755b00]/60">
                    {member.name ? member.name[0] : '✦'}
                  </span>
                </div>
              </div>

              {/* Hover-reveal bio overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-[#1a0d05]/90 via-[#1a0d05]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {member.bio && (
                  <p className="font-body text-xs text-[#fefccf]/80 leading-relaxed mb-2">
                    {member.bio}
                  </p>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="font-heading text-lg text-[#1a0d05] leading-snug">{member.name}</h3>
                {member.role && (
                  <p className="font-body text-xs text-[#944925] tracking-wide mt-1">{member.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
