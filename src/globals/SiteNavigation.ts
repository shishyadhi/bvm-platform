import type { GlobalConfig } from 'payload'

export const SiteNavigation: GlobalConfig = {
  slug: 'site-navigation',
  label: 'Site Navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'Brahma Vidya Mandir',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navLinks',
      type: 'array',
      label: 'Navigation Links',
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
      defaultValue: [
        { label: 'Classes', href: '/classes' },
        { label: 'Parampara', href: '/parampara' },
        { label: 'Acharya-ji', href: '/acharya-ji' },
        { label: 'About Us', href: '/about' },
        { label: 'Initiatives', href: '/initiatives' },
        { label: 'Publications', href: '/publications' },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'Contact Us',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Button Link',
      defaultValue: '/contact',
    },
  ],
}
