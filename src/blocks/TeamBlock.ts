import type { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'team',
  labels: { singular: 'Team Section', plural: 'Team Sections' },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'The People',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Team',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'A student-led initiative — sevaks and volunteers working together, hand in hand with our Acharyas, to carry the wisdom of the shastras into every home.',
    },
    {
      name: 'members',
      type: 'array',
      label: 'Team Members',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role',
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Bio (shown on hover)',
        },
      ],
    },
  ],
}
