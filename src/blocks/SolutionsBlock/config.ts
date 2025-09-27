import type { Block } from 'payload'

export const SolutionsBlock: Block = {
  slug: 'solutions',
  interfaceName: 'SolutionsBlock',
  fields: [
    {
      name: 'heading',
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
  ],
}
