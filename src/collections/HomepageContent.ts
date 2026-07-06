import type { CollectionConfig } from 'payload'

export const HomepageContent: CollectionConfig = {
  slug: 'homepage-content',
  admin: {
    useAsTitle: 'organization',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      required: true,
      unique: true,
    },
    {
      name: 'banner',
      type: 'group',
      label: 'Banner Section',
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'subheading',
          type: 'text',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'ctaText',
          type: 'text',
        },
        {
          name: 'ctaLink',
          type: 'text',
        },
      ],
    },
    {
      name: 'whoWeAre',
      type: 'group',
      label: 'Who We Are Section',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Who We Are',
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'upcomingEvents',
      type: 'group',
      label: 'Upcoming Events Section',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Upcoming Events',
        },
        {
          name: 'events',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'date',
              type: 'date',
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Section',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Get In Touch',
        },
        {
          name: 'message',
          type: 'textarea',
        },
        {
          name: 'showMap',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'mapEmbedUrl',
          type: 'text',
        },
      ],
    },
  ],
}
