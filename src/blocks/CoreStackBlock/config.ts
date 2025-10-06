import type { Block } from 'payload'

export const CoreStack: Block = {
  slug: 'coreStack',
  interfaceName: 'CoreStackBlockProps',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Learn About Who We Are',
    },
    {
      name: 'subtitle', // changed from 'description'
      type: 'textarea',
      defaultValue:
        'Nexus is the gold standard in professional change management consulting — disciplined, adaptable, and relentlessly committed to excellence.',
    },
    {
      name: 'cards', // changed from 'content'
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'summary',
          type: 'textarea',
        },
        {
          name: 'scale',
          type: 'number',
          label: 'Image Scale',
          min: 0.1,
          max: 3,
          defaultValue: 1,
          required: false,
        },
      ],
    },
  ],
}
