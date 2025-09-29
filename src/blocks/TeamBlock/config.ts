import type { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  fields: [
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
  ],
}
