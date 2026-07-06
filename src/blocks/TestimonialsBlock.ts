import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials Section', plural: 'Testimonials Sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Voices of the Sangha',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Testimonials',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'authorName',
          type: 'text',
          required: true,
        },
        {
          name: 'authorRole',
          type: 'text',
          label: 'Author Role / Batch',
          admin: { description: 'e.g. "Student, 2018 Batch", "Online Participant"' },
        },
        {
          name: 'authorInitial',
          type: 'text',
          label: 'Author Initial (for avatar)',
          maxLength: 1,
        },
      ],
    },
  ],
}
