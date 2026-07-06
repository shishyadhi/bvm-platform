import type { CollectionConfig } from 'payload'

export const ParamparaMembers: CollectionConfig = {
  slug: 'parampara-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'order'],
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
      name: 'icon',
      type: 'text',
      label: 'Material Symbol Icon',
      admin: { description: 'For use in compact parampara node view (e.g. "temple_hindu")' },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
}
