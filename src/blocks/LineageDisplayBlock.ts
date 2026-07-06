import type { Block } from 'payload'

export const LineageDisplayBlock: Block = {
  slug: 'lineageDisplay',
  labels: { singular: 'Lineage Display', plural: 'Lineage Displays' },
  fields: [
    {
      name: 'members',
      type: 'array',
      label: 'Lineage Members',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title / Role',
          admin: { description: 'e.g. "The Reviver of Advaita"' },
        },
        {
          name: 'portrait',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'portraitSide',
          type: 'select',
          label: 'Portrait Side',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
      ],
    },
  ],
}
