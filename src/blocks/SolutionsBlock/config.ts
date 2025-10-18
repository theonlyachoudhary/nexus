import type { Block, Field } from 'payload'

const solutionsFields: Field[] = [
  {
    name: 'heading',
    type: 'text',
    required: true,
    defaultValue: 'Our Solutions',
  },
  {
    name: 'subheading',
    type: 'textarea',
    required: true,
    defaultValue:
      'Explore our range of solutions designed to streamline your operations and drive success.',
  },
  {
    name: 'summarized',
    type: 'checkbox',
    defaultValue: false
  }
]

export const SolutionsBlock: Block = {
  slug: 'solutions',
  interfaceName: 'SolutionsBlock',
  fields: solutionsFields,
}
