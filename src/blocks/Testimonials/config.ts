import type { Block, Field } from 'payload'

const testimonialFields: Field[] = [
  {
    name: 'quote',
    type: 'textarea',
    required: true,
  },
  {
    name: 'author',
    type: 'text',
    required: true,
  },
  {
    name: 'role',
    type: 'text',
  },
  {
    name: 'company',
    type: 'text',
  },
]

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
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      admin: {
        description: 'Add testimonials from clients',
      },
      defaultValue: [
        {
          quote:
            'Nexus made our lives so much easier at YMS! What used to take us 2–5 hours now happens with one click. I no longer have to worry about reminding coaches — the automations just handle it. Super grateful and excited to keep working together.',
          author: 'Mikaeel Shiferaw',
          role: 'COO',
          company: 'YMS',
        },
        {
          quote:
            "Nexus helped me save 30–45 minutes every single day by creating a system to track student attendance and instantly notify them. I didn't think it was possible at this level of customization — but they delivered.",
          author: 'Waseem Kaleem',
          role: 'Director of Operations',
          company: 'DarusSalam Seminary',
        },
        {
          quote:
            'Working with Nexus transformed how we approach project management and client communication. Their systematic approach to process improvement delivered measurable results within weeks.',
          author: 'Rameez Chaudhury',
          role: 'Founder & CEO',
          company: 'Impact Builders',
        },
      ],
      fields: testimonialFields,
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
