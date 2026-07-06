import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Eyebrow Label',
      admin: { description: 'e.g. "Welcome to the Sanctuary of Wisdom"' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'sanskritQuote',
      type: 'text',
      label: 'Sanskrit / Primary Quote',
    },
    {
      name: 'quoteSource',
      type: 'text',
      label: 'Quote Source',
      admin: { description: 'e.g. "— Vivekachudamani"' },
    },
    {
      name: 'quoteTranslation',
      type: 'textarea',
      label: 'Quote Translation / Subtitle',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Button Link',
    },
  ],
}
