import type { Block } from 'payload'

export const MilestonesTimelineBlock: Block = {
  slug: 'milestonesTimeline',
  labels: { singular: 'Milestones Timeline', plural: 'Milestones Timelines' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
    },
    {
      name: 'milestones',
      type: 'array',
      label: 'Milestones',
      minRows: 1,
      fields: [
        {
          name: 'year',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "1959"' },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'images',
          type: 'array',
          label: 'Images',
          maxRows: 3,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'alt',
              type: 'text',
              label: 'Alt Text',
            },
          ],
        },
      ],
    },
  ],
}
