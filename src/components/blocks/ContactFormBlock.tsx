'use client'
import React, { useState } from 'react'

interface ContactFormBlockProps {
  heading?: string
  description?: string
  submitButtonText?: string
  recipientEmail?: string
  namePlaceholder?: string
  phonePlaceholder?: string
  emailPlaceholder?: string
  messagePlaceholder?: string
}

export function ContactFormBlock({
  heading,
  description,
  submitButtonText = 'Send Message',
  namePlaceholder = 'Your Name',
  phonePlaceholder = 'e.g. +91 98765 43210',
  emailPlaceholder = 'your.email@example.com',
  messagePlaceholder = 'How can we assist you on your journey?',
}: ContactFormBlockProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Placeholder — wire up real submission later
    await new Promise((r) => setTimeout(r, 1000))
    setStatus('sent')
  }

  const inputClass =
    'w-full font-body text-sm bg-white border border-[#755b00]/20 rounded-sm px-4 py-3 text-[#1a0d05] placeholder:text-[#6b5a4e]/50 focus:outline-none focus:border-[#755b00] transition-colors'

  return (
    <section className="bg-[#fffef5] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {(heading || description) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="font-heading text-3xl md:text-4xl text-[#1a0d05] mb-3">{heading}</h2>
            )}
            {description && (
              <p className="font-body text-base text-[#6b5a4e]">{description}</p>
            )}
          </div>
        )}

        {status === 'sent' ? (
          <div className="text-center py-12 border border-[#755b00]/20 rounded-sm bg-[#fefccf]">
            <div className="text-3xl mb-4">✦</div>
            <p className="font-heading text-xl text-[#755b00] mb-2">Message Received</p>
            <p className="font-body text-sm text-[#6b5a4e]">
              We will respond within 2–3 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-body text-xs font-semibold tracking-wide text-[#755b00] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={namePlaceholder}
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block font-body text-xs font-semibold tracking-wide text-[#755b00] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder={phonePlaceholder}
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block font-body text-xs font-semibold tracking-wide text-[#755b00] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder={emailPlaceholder}
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block font-body text-xs font-semibold tracking-wide text-[#755b00] mb-1.5">
                Your Message
              </label>
              <textarea
                name="message"
                required
                rows={6}
                placeholder={messagePlaceholder}
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full font-body text-sm font-semibold tracking-widest uppercase py-4 bg-[#944925] text-[#fefccf] rounded-sm hover:bg-[#7a3a1d] disabled:opacity-60 transition-colors duration-200"
            >
              {status === 'sending' ? 'Sending…' : submitButtonText}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
