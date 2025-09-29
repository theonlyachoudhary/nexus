import type { Block, Field } from 'payload'

const teamFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    defaultValue: 'Our Solutions',
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
    defaultValue:
      'Explore our range of solutions designed to streamline your operations and drive success.',
  },
]

export const TeamBlock: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  fields: teamFields,
}
