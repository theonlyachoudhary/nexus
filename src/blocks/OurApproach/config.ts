import type { Block } from 'payload'

export const OurApproach: Block = {
  slug: 'ourApproach',
  interfaceName: 'OurApproachBlockProps',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Ready to Transform Your Business?',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Join hundreds of businesses that have streamlined their operations and accelerated growth with our proven systems.',
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Value',
          required: true,
        },
      ],
    },
  ],
}
