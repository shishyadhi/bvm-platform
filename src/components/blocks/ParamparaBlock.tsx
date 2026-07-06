import React from 'react'
import { BookOpen, Heart, Brain, Users } from 'lucide-react'

interface Node {
  name: string
  role?: string
  icon?: string
  id?: string
}

interface ParamparaBlockProps {
  label?: string
  heading?: string
  nodes?: Node[]
}

const ICON_MAP: Record<string, React.ReactNode> = {
  temple_hindu: <span className="text-2xl">🛕</span>,
  self_improvement: <Heart size={24} />,
  psychology: <Brain size={24} />,
  groups: <Users size={24} />,
  book: <BookOpen size={24} />,
}

export function ParamparaBlock({ label, heading, nodes = [] }: ParamparaBlockProps) {
  return (
    <section className="bg-[#2c1810] py-20 px-6 relative overflow-hidden">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #F4C430 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          {label && <p className="section-label text-[#F4C430]/60 mb-3">{label}</p>}
          <h2 className="font-heading text-3xl md:text-4xl text-[#fefccf]">{heading}</h2>
        </div>

        {/* Nodes row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-0">
          {nodes.map((node, i) => (
            <React.Fragment key={i}>
              {/* Node */}
              <div className="flex flex-col items-center text-center max-w-[160px]">
                {/* Circle */}
                <div className="w-20 h-20 rounded-full bg-[#755b00]/20 border-2 border-[#F4C430]/30 flex items-center justify-center text-[#F4C430] mb-4">
                  {ICON_MAP[node.icon || ''] || <span className="text-2xl">✦</span>}
                </div>
                <h3 className="font-heading text-base text-[#fefccf] leading-snug mb-1">
                  {node.name}
                </h3>
                <p className="font-body text-xs text-[#fefccf]/50 leading-snug">{node.role}</p>
              </div>

              {/* Connector (not after last) */}
              {i < nodes.length - 1 && (
                <div className="flex-1 flex flex-col md:flex-row items-center justify-center my-4 md:my-0 md:mx-2">
                  {/* Vertical on mobile */}
                  <div className="flex flex-col items-center md:hidden gap-1 py-2">
                    <div className="w-px h-6 bg-[#F4C430]/20" />
                    <span className="text-[#F4C430]/40 text-xs">↓</span>
                  </div>
                  {/* Horizontal on desktop */}
                  <div className="hidden md:flex items-center gap-1 px-2">
                    <div className="w-8 h-px bg-[#F4C430]/30" />
                    <span className="text-[#F4C430]/40 text-xs">✦</span>
                    <div className="w-8 h-px bg-[#F4C430]/30" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
