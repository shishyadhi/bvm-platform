import type { Block } from 'payload'

export const ClassListingBlock: Block = {
  slug: 'classListing',
  labels: { singular: 'Class Listing', plural: 'Class Listings' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Classes & Sacred Learning',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'showLocationFilter',
      type: 'checkbox',
      label: 'Show Location Filter',
      defaultValue: true,
    },
    {
      name: 'enrollButtonText',
      type: 'text',
      label: 'Enroll Button Text',
      defaultValue: 'Enroll Course',
    },
  ],
}
