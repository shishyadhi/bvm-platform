import type { Block } from 'payload'

export const ClassScheduleBlock: Block = {
  slug: 'classSchedule',
  labels: { singular: 'Class Schedule Section', plural: 'Class Schedule Sections' },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Eyebrow Label',
      admin: { description: 'e.g. "Dinacharya"' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Class Schedule',
    },
    {
      name: 'sideQuote',
      type: 'text',
      label: 'Side Quote',
    },
    {
      name: 'scheduleItems',
      type: 'array',
      label: 'Schedule Items',
      fields: [
        {
          name: 'category',
          type: 'text',
          label: 'Category Label',
          admin: { description: 'e.g. "Weekend Discourse", "Foundational Study", "Satsang"' },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'day',
          type: 'text',
          admin: { description: 'e.g. "Sunday", "Friday"' },
        },
        {
          name: 'time',
          type: 'text',
          admin: { description: 'e.g. "7:00 - 9:00 AM"' },
        },
        {
          name: 'location',
          type: 'text',
          admin: { description: 'e.g. "Main Meditation Hall", "Online & In-person"' },
        },
        {
          name: 'locationIcon',
          type: 'text',
          label: 'Location Icon',
          admin: { description: 'Material symbol name: "location_on", "video_library", "spatial_audio_off"' },
        },
      ],
    },
    {
      name: 'calendarLinkText',
      type: 'text',
      label: 'Calendar Link Text',
    },
    {
      name: 'calendarLinkUrl',
      type: 'text',
      label: 'Calendar Link URL',
    },
  ],
}
