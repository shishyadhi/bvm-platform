import type { CollectionConfig } from 'payload'

export const Organizations: CollectionConfig = {
  slug: 'organizations',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'domain',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'e.g. brahmavidyamandir.in',
      },
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'themeColors',
      type: 'group',
      fields: [
        {
          name: 'primary',
          type: 'text',
          defaultValue: '#FF9933',
          admin: { description: 'Saffron — primary brand color' },
        },
        {
          name: 'secondary',
          type: 'text',
          defaultValue: '#800000',
          admin: { description: 'Maroon — secondary brand color' },
        },
        {
          name: 'accent',
          type: 'text',
          defaultValue: '#FFD700',
          admin: { description: 'Gold accent color' },
        },
      ],
    },
    {
      name: 'whatsappNumber',
      type: 'text',
    },
    {
      name: 'youtubeChannelId',
      type: 'text',
    },
    {
      name: 'studentsBenefitted',
      type: 'number',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'textarea',
    },
  ],
}
