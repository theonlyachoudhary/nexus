import type { Block } from 'payload'

export const PartnersBanner: Block = {
  slug: 'partnersBanner',
  interfaceName: 'PartnersBannerBlockProps',
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
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'scale',
          type: 'number',
          label: 'Image Scale',
          min: 0.1,
          max: 5,
          defaultValue: 1,
          required: false,
        },
      ],
    },
  ],
}
