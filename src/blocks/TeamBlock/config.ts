import type { Field } from 'payload'

export const TeamBlock: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    defaultValue: 'Meet the Team',
  },
  {
    name: 'description',
    type: 'textarea',
    defaultValue:
      'Our experienced professionals bring decades of combined expertise in change management, process optimization, and strategic consulting.',
  },
]
