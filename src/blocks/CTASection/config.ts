import type { Block } from 'payload'

export const CTASectionBlock: Block = {
  slug: 'ctaSection',
  interfaceName: 'CTASectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Ready to Transform Your Business?',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue:
        'Join hundreds of businesses that have streamlined their operations and accelerated growth with our proven systems.',
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional additional description text',
      },
    },
    {
      name: 'primaryCta',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'Get Started Today',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          defaultValue: '/contact',
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
          defaultValue: 'Schedule a Call',
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '/schedule',
        },
      ],
    },
    {
      name: 'background',
      type: 'radio',
      defaultValue: 'primary',
      options: [
        {
          label: 'Primary (IBM Blue)',
          value: 'primary',
        },
        {
          label: 'Gradient',
          value: 'gradient',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
        {
          label: 'Light',
          value: 'light',
        },
      ],
      admin: {
        description: 'Background style for the CTA section',
      },
    },
    {
      name: 'size',
      type: 'radio',
      defaultValue: 'large',
      options: [
        {
          label: 'Large',
          value: 'large',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Small',
          value: 'small',
        },
      ],
      admin: {
        description: 'Vertical padding and overall size of the CTA section',
      },
    },
  ],
}
