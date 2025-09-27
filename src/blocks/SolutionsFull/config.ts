import type { Block, Field } from 'payload'

export const SolutionsFullBlock: Block = {
  slug: 'solutions-full',
  interfaceName: 'SolutionsFullBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
  ],
}
