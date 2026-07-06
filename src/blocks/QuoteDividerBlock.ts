import type { Block } from 'payload'

export const QuoteDividerBlock: Block = {
  slug: 'quoteDivider',
  labels: { singular: 'Quote Divider', plural: 'Quote Dividers' },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'attribution',
      type: 'text',
      admin: { description: 'e.g. "— Acharya Shri Rangaji"' },
    },
  ],
}
