import type { Block, Field } from 'payload'

const AboutBlockFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    defaultValue: 'About Nexus',
  },
  {
    name: 'description',
    type: 'textarea',
    defaultValue:
      'The gold standard in professional change management consulting — disciplined, adaptable, and relentlessly committed to excellence.',
  },
  {
    name: 'coreValuesHeading',
    type: 'text',
    defaultValue: 'Our Core Values',
    admin: {
      description: 'Heading for the core values section.',
    },
  },
  {
    name: 'missionCards',
    type: 'array',
    minRows: 1,
    maxRows: 6,
    fields: [
      {
        name: 'heading',
        type: 'text',
        required: true,
      },
      {
        name: 'text',
        type: 'textarea',
        required: true,
      },
      {
        name: 'color',
        type: 'text',
        defaultValue: 'var(--brand-primary)',
        admin: {
          description: 'CSS color value for card accent (e.g., #4078a9 or var(--brand-primary))',
        },
      },
      {
        name: 'id',
        type: 'text',
        admin: {
          readOnly: true,
        },
      },
    ],
    defaultValue: [
      {
        heading: 'Our Mission',
        text: 'Help good businesses become great by equipping them with tools and thinking that deliver real value to customers, teams, and communities.',
        color: 'var(--brand-primary)',
      },
      {
        heading: 'Our Vision',
        text: 'Elevate leaders to build a smarter tomorrow by redefining how work is done and how value is created.',
        color: 'var(--brand-primary)',
      },
    ],
  },
  {
    name: 'coreValues',
    type: 'array',
    minRows: 1,
    maxRows: 10,
    fields: [
      {
        name: 'text',
        type: 'text',
        required: true,
      },
      {
        name: 'color',
        type: 'text',
        defaultValue: 'var(--brand-primary)',
        admin: {
          description: 'CSS color value for value accent (e.g., #4078a9 or var(--brand-primary))',
        },
      },
      {
        name: 'id',
        type: 'text',
        admin: {
          readOnly: true,
        },
      },
    ],
    defaultValue: [
      { text: 'Clarity over Complexity', color: 'var(--brand-primary)' },
      { text: 'Discipline in Execution', color: 'var(--brand-primary)' },
      { text: 'Purpose in Decision', color: 'var(--brand-primary)' },
      { text: 'Partnership with Integrity', color: 'var(--brand-primary)' },
      { text: 'Commitment to Improvement', color: 'var(--brand-primary)' },
    ],
  },
]

export const About: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  fields: AboutBlockFields,
}
