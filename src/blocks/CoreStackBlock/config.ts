import type { Block } from 'payload'
export const CoreStack: Block = {
  slug: 'coreStack',
  interfaceName: 'CoreStackBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Learn About Who We Are',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Nexus is the gold standard in professional change management consulting — disciplined, adaptable, and relentlessly committed to excellence.',
    },
    {
      name: 'content',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'text',
          required: true,
          defaultValue: 'https://via.placeholder.com/150',
        },
        {
          name: 'summary',
          type: 'textarea',
          defaultValue: 'A brief summary of the application.',
        },
      ],
    },
  ],
}
