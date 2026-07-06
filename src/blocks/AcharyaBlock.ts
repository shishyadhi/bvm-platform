import type { Block } from 'payload'

export const AcharyaBlock: Block = {
  slug: 'acharya',
  labels: { singular: 'Acharya Section', plural: 'Acharya Sections' },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Eyebrow Label',
      admin: { description: 'e.g. "Guided Wisdom" or "Spiritual Guide & Student"' },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Acharya Name',
      defaultValue: 'Acharya Shri Rangaji',
    },
    {
      name: 'roleTitle',
      type: 'text',
      label: 'Role Subtitle',
      admin: { description: 'e.g. "Vedanta Acharya · Brahma Vidya Mandir" — shown under the name' },
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Bio Paragraphs',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'linkText',
      type: 'text',
      label: 'Link Text',
      admin: { description: 'e.g. "Read Acharya-ji\'s Reflections"' },
    },
    {
      name: 'linkUrl',
      type: 'text',
      label: 'Link URL',
    },
    {
      name: 'portraitPosition',
      type: 'select',
      label: 'Portrait Position',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
}
