import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Product Name',
      required: true,
    },
    {
      name: 'productAcronym',
      type: 'text',
      label: 'Product Acronym',
      required: false,
    },
    {
      name: 'oneSentenceDescription',
      type: 'textarea',
      label: 'One Sentence Description',
    },
    {
      name: 'fullDescription',
      type: 'textarea',
      label: 'Full Description',
    },
    {
      name: 'keyFeatures',
      type: 'array',
      label: 'Key Features',
      fields: [
        {
          name: 'feature',
          type: 'text',
          label: 'Feature',
        },
      ],
    },
    {
      name: 'cardColor',
      type: 'text',
      label: 'Card Color',
      required: true,
    },
    {
      name: 'flagship',
      type: 'checkbox',
      label: 'Flagship Product?',
      defaultValue: false,
    },
    ...slugField('name'),
  ],
}
