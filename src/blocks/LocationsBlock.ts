import type { Block } from 'payload'

export const LocationsBlock: Block = {
  slug: 'locations',
  labels: { singular: 'Locations Section', plural: 'Locations Sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'locations',
      type: 'array',
      label: 'Location Cards',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Center Name',
          admin: { description: 'e.g. "Chennai Center"' },
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'mapLocation',
          type: 'text',
          label: 'Map Location Query',
          admin: { description: 'e.g. "T. Nagar, Chennai, India"' },
        },
      ],
    },
  ],
}
