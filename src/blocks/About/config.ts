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
      },
      {
        heading: 'Our Vision',
        text: 'Elevate leaders to build a smarter tomorrow by redefining how work is done and how value is created.',
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
        name: 'id',
        type: 'text',
        admin: {
          readOnly: true,
        },
      },
    ],
    defaultValue: [
      { text: 'Clarity over Complexity' },
      { text: 'Discipline in Execution' },
      { text: 'Purpose in Decision' },
      { text: 'Partnership with Integrity' },
      { text: 'Commitment to Improvement' },
    ],
  },
]

export const About: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  fields: AboutBlockFields,
}
