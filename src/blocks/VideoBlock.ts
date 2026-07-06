import type { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'video',
  labels: { singular: 'Video Section', plural: 'Video Sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
      admin: { description: 'YouTube/Vimeo embed URL or direct video URL' },
    },
    {
      name: 'videoLabel',
      type: 'text',
      label: 'Video Label',
      admin: { description: 'e.g. "Biographical Documentary"' },
    },
    {
      name: 'videoTitle',
      type: 'text',
      label: 'Video Title',
    },
    {
      name: 'viewAllText',
      type: 'text',
      label: 'View All Link Text',
    },
    {
      name: 'viewAllUrl',
      type: 'text',
      label: 'View All Link URL',
    },
  ],
}
