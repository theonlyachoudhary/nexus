import type { Block, Field } from 'payload'

const listItemFields: Field[] = [
  {
    name: 'text',
    type: 'text',
    required: true,
  },
]

export const AboutTeaser: Block = {
  slug: 'aboutTeaser',
  interfaceName: 'AboutTeaserBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Learn About Who We Are',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue:
        'Nexus is the gold standard in professional change management consulting — disciplined, adaptable, and relentlessly committed to excellence.',
    },
    {
      name: 'mission',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Our Mission',
        },
        {
          name: 'text',
          type: 'textarea',
          defaultValue:
            'Help good businesses become great by equipping them with tools and thinking that deliver real value to customers, teams, and communities.',
        },
      ],
    },
    {
      name: 'vision',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Our Vision',
        },
        {
          name: 'text',
          type: 'textarea',
          defaultValue:
            'Elevate leaders to build a smarter tomorrow by redefining how work is done and how value is created.',
        },
      ],
    },
    {
      name: 'coreValues',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Core Values',
        },
        {
          name: 'values',
          type: 'array',
          defaultValue: [
            { text: 'Clarity over Complexity' },
            { text: 'Discipline in Execution' },
            { text: 'Purpose in Decision' },
            { text: 'Partnership with Integrity' },
            { text: 'Commitment to Improvement' },
          ],
          fields: listItemFields,
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Learn More About Our Team',
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '/about',
        },
      ],
    },
  ],
}
