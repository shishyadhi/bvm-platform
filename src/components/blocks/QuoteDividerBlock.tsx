import React from 'react'

interface QuoteDividerBlockProps {
  quote?: string
  attribution?: string
}

export function QuoteDividerBlock({ quote, attribution }: QuoteDividerBlockProps) {
  return (
    <section className="bg-[#2c1810] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Top ornament */}
        <div className="flex items-center justify-center gap-4 mb-10 text-[#F4C430]/40">
          <div className="w-20 h-px bg-current" />
          <span className="text-sm">✦</span>
          <div className="w-20 h-px bg-current" />
        </div>

        {/* Quote mark */}
        <div className="font-heading text-8xl text-[#F4C430]/15 leading-none mb-2 select-none">
          &ldquo;
        </div>

        <blockquote className="font-heading italic text-2xl md:text-3xl text-[#fefccf] leading-relaxed -mt-8">
          {quote?.startsWith('"') ? quote.slice(1, quote.endsWith('"') ? -1 : undefined) : quote}
        </blockquote>

        {attribution && (
          <p className="mt-8 font-body text-sm tracking-widest uppercase text-[#F4C430]/60">
            {attribution.startsWith('—') ? attribution : `— ${attribution}`}
          </p>
        )}

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-4 mt-10 text-[#F4C430]/40">
          <div className="w-20 h-px bg-current" />
          <span className="text-sm">✦</span>
          <div className="w-20 h-px bg-current" />
        </div>
      </div>
    </section>
  )
}
