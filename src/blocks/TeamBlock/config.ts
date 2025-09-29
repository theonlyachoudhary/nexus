import type { Block, Field } from 'payload'

const teamFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    defaultValue: 'Our Team',
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
    defaultValue: 'Explore our range of team members who are dedicated to driving success.',
  },
]

export const TeamBlock: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  fields: teamFields,
}
