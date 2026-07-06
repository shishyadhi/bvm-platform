import type { Block } from 'payload'

export const PublicationsListingBlock: Block = {
  slug: 'publicationsListing',
  labels: { singular: 'Publications Listing', plural: 'Publications Listings' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Publications',
    },
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Sacred Texts',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Books and study materials released by Brahma Vidya Mandir — distilled from decades of teaching. These works are offered as a seva; no price can be placed on the wisdom they carry.',
    },
    {
      name: 'infoNote',
      type: 'text',
      defaultValue: 'All publications are freely gifted — request a copy below',
    },
    {
      name: 'showCategoryFilter',
      type: 'checkbox',
      label: 'Show Category Filter',
      defaultValue: true,
    },
    {
      name: 'requestButtonText',
      type: 'text',
      label: 'Request Button Text',
      defaultValue: 'Request Now',
    },
    {
      name: 'requestButtonLink',
      type: 'text',
      label: 'Request Button Link',
      defaultValue: '/contact',
    },
  ],
}
