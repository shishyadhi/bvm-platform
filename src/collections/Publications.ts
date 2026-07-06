import type { CollectionConfig } from 'payload'

export const Publications: CollectionConfig = {
  slug: 'publications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author / Series',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Upanishad', value: 'upanishad' },
        { label: 'Bhagavath Prakaranam', value: 'prakaranam' },
        { label: 'Bhagavath Geetha', value: 'geetha' },
        { label: 'Others', value: 'others' },
      ],
    },
    {
      name: 'tagLabel',
      type: 'text',
      label: 'Eyebrow Tag',
      admin: { description: 'e.g. "Foundational Text", "Advanced Study", "Teaching Series"' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
