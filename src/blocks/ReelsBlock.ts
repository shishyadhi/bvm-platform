import type { Block } from 'payload'

export const ReelsBlock: Block = {
  slug: 'reels',
  labels: { singular: 'Reels Section', plural: 'Reels Sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Moments of Clarity',
    },
    {
      name: 'reels',
      type: 'array',
      label: 'Reels',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'topic',
          type: 'text',
          label: 'Topic',
          admin: { description: 'e.g. "Bhagavad Gita", "Viveka", "Vairagya", "Ishwara", "Atma Vichara", "Maya" — used for filter pills' },
        },
        {
          name: 'duration',
          type: 'text',
          label: 'Duration',
          admin: { description: 'e.g. "3:12"' },
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'videoUrl',
          type: 'text',
          label: 'Video URL',
        },
      ],
    },
    {
      name: 'topics',
      type: 'array',
      label: 'Filter Topics',
      admin: { description: 'Filter pills shown above the reels grid, e.g. All, Bhagavad Gita, Viveka…' },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
