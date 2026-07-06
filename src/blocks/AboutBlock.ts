import type { Block } from 'payload'

export const AboutBlock: Block = {
  slug: 'about',
  labels: { singular: 'About Section', plural: 'About Sections' },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Eyebrow Label',
      admin: { description: 'e.g. "Our Foundation"' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Body Paragraphs',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
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
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image Position',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
}
