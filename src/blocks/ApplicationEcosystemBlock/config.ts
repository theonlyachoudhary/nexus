import type { Block } from 'payload'

export const ApplicationEcosystem: Block = {
  slug: 'applicationEcosystemBlock',
  interfaceName: 'ApplicationEcosystemBlockProps',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Application Ecosystem',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue: 'Explore our ecosystem of integrated applications.',
    },
    {
      name: 'categories',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          defaultValue: 'Category Name',
        },
        {
          name: 'images',
          type: 'array',
          fields: [
            {
              name: 'image',
              type: 'text',
              required: true,
              defaultValue: 'https://via.placeholder.com/96',
            },
          ],
        },
      ],
    },
  ],
}
