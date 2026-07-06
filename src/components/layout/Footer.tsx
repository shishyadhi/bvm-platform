import React from 'react'
import Link from 'next/link'
import { Mail } from 'lucide-react'

interface FooterLink {
  label: string
  href: string
  id?: string
}

interface FooterColumn {
  heading: string
  links?: FooterLink[]
  id?: string
}

interface FooterProps {
  siteName?: string
  tagline?: string
  footerColumns?: FooterColumn[]
  footerEmail?: string
  copyrightText?: string
}

export function Footer({
  siteName = 'Brahma Vidya Mandir',
  tagline = 'A community dedicated to the pursuit of Self-knowledge.',
  footerColumns = [],
  footerEmail,
  copyrightText,
}: FooterProps) {
  return (
    <footer className="bg-[#1a0d05] text-[#fefccf]/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-2xl text-[#fefccf] mb-4">{siteName}</h3>
            <p className="font-body text-sm leading-relaxed max-w-sm text-[#fefccf]/60">
              {tagline}
            </p>
            {footerEmail && (
              <a
                href={`mailto:${footerEmail}`}
                className="mt-6 inline-flex items-center gap-2 font-body text-sm text-[#F4C430] hover:text-[#fefccf] transition-colors"
              >
                <Mail size={14} />
                {footerEmail}
              </a>
            )}
          </div>

          {/* Columns */}
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-[#F4C430] mb-4">
                {column.heading}
              </h4>
              <ul className="flex flex-col gap-2">
                {(column.links || []).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-[#fefccf]/60 hover:text-[#fefccf] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#fefccf]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Ornament */}
          <div className="flex items-center gap-3 text-[#F4C430]/60">
            <span className="text-lg">✦</span>
            <span className="font-body text-xs tracking-widest uppercase">
              {copyrightText || `© ${new Date().getFullYear()} ${siteName}`}
            </span>
            <span className="text-lg">✦</span>
          </div>
          <p className="font-body text-xs text-[#fefccf]/30">
            सर्वे भवन्तु सुखिनः
          </p>
        </div>
      </div>
    </footer>
  )
}
