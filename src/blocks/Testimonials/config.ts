import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'See Proven Results',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue:
        'Our clients achieve measurable improvements in efficiency, clarity, and growth.',
    },
    {
      name: 'background',
      type: 'radio',
      defaultValue: 'muted',
      options: [
        {
          label: 'Light',
          value: 'light',
        },
        {
          label: 'Neutral',
          value: 'neutral',
        },
        {
          label: 'Brand Primary Light',
          value: 'primary-light',
        },
        {
          label: 'Muted',
          value: 'muted',
        },
      ],
      admin: {
        description: 'Background color for the testimonials section',
      },
    },
    {
      name: 'primaryCta',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'View Case Studies',
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '/case-studies',
        },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Read All Testimonials',
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '/testimonials',
        },
      ],
    },
  ],
}
