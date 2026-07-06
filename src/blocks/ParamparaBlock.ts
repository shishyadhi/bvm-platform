import type { Block } from 'payload'

export const ParamparaBlock: Block = {
  slug: 'parampara',
  labels: { singular: 'Parampara Section', plural: 'Parampara Sections' },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Eyebrow Label',
      admin: { description: 'e.g. "The Holy Lineage"' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Guru Parampara',
    },
    {
      name: 'nodes',
      type: 'array',
      label: 'Lineage Nodes',
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
          label: 'Role / Title',
          admin: { description: 'e.g. "The Reviver of Advaita"' },
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Material Symbol Icon Name',
          admin: { description: 'e.g. "temple_hindu", "self_improvement", "psychology", "groups"' },
        },
      ],
    },
  ],
}
