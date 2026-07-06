import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Brahma Vidya Mandir',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'A community dedicated to the pursuit of Self-knowledge and the service of humanity in the light of Advaita Vedanta.',
    },
    {
      name: 'footerColumns',
      type: 'array',
      label: 'Footer Columns',
      admin: { description: 'Categorized footer navigation groups, e.g. "Explore", "Initiatives", "Connect"' },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
      defaultValue: [
        {
          heading: 'Explore',
          links: [
            { label: 'Classes', href: '/classes' },
            { label: 'Parampara', href: '/parampara' },
            { label: 'Acharya-ji', href: '/acharya-ji' },
          ],
        },
        {
          heading: 'Initiatives',
          links: [
            { label: 'All Initiatives', href: '/initiatives' },
            { label: 'Pooja', href: '/initiatives#pooja' },
            { label: 'Camps', href: '/initiatives#camps' },
            { label: 'BVM Yuva Kendra', href: '/initiatives#yuva' },
          ],
        },
        {
          heading: 'Connect',
          links: [
            { label: 'About Us', href: '/about' },
            { label: 'Publications', href: '/publications' },
            { label: 'Contact Us', href: '/contact' },
          ],
        },
      ],
    },
    {
      name: 'footerEmail',
      type: 'email',
      label: 'Contact Email',
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '© Brahma Vidya Mandir. All rights reserved. Purifying the heart through the wisdom of Advaita.',
    },
  ],
}
