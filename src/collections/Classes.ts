import type { CollectionConfig } from 'payload'

export const Classes: CollectionConfig = {
  slug: 'classes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'location', 'day'],
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Vedanta', value: 'vedanta' },
        { label: 'Chanting', value: 'chanting' },
        { label: 'Pooja & Ritual', value: 'pooja' },
      ],
    },
    {
      name: 'level',
      type: 'select',
      defaultValue: 'open',
      options: [
        { label: 'Open to All', value: 'open' },
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'location',
      type: 'select',
      required: true,
      options: [
        { label: 'Chennai', value: 'chennai' },
        { label: 'Coimbatore', value: 'coimbatore' },
        { label: 'Online', value: 'online' },
        { label: 'Online & In-person', value: 'hybrid' },
      ],
    },
    {
      name: 'day',
      type: 'select',
      options: [
        { label: 'Monday', value: 'monday' },
        { label: 'Tuesday', value: 'tuesday' },
        { label: 'Wednesday', value: 'wednesday' },
        { label: 'Thursday', value: 'thursday' },
        { label: 'Friday', value: 'friday' },
        { label: 'Saturday', value: 'saturday' },
        { label: 'Sunday', value: 'sunday' },
      ],
    },
    {
      name: 'time',
      type: 'text',
      admin: { description: 'e.g. "8:00 AM", "7:00 PM"' },
    },
    {
      name: 'duration',
      type: 'text',
      admin: { description: 'e.g. "90 Mins", "2 Hours"' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured / Hero Class',
      defaultValue: false,
    },
    {
      name: 'enrollmentOpen',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
