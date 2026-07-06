import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: { singular: 'Contact Form', plural: 'Contact Forms' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Send an Inquiry',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'We welcome your questions regarding classes, retreats, or general information.',
    },
    {
      name: 'submitButtonText',
      type: 'text',
      defaultValue: 'Send Message',
    },
    {
      name: 'recipientEmail',
      type: 'email',
      label: 'Recipient Email',
      admin: { description: 'Email address to receive form submissions' },
    },
    {
      name: 'namePlaceholder',
      type: 'text',
      label: 'Name Field Placeholder',
      defaultValue: 'Your Name',
    },
    {
      name: 'phonePlaceholder',
      type: 'text',
      label: 'Phone Field Placeholder',
      defaultValue: 'e.g. +91 98765 43210',
    },
    {
      name: 'emailPlaceholder',
      type: 'text',
      label: 'Email Field Placeholder',
      defaultValue: 'your.email@example.com',
    },
    {
      name: 'messagePlaceholder',
      type: 'text',
      label: 'Message Field Placeholder',
      defaultValue: 'How can we assist you on your journey?',
    },
  ],
}
