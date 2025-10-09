import type { Block } from 'payload'

export const ServiceSummary: Block = {
  slug: 'serviceSummary',
  interfaceName: 'ServiceSummaryBlockProps',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Learn About Who We Are',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue:
        'Nexus is the gold standard in professional change management consulting — disciplined, adaptable, and relentlessly committed to excellence.',
    },
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
