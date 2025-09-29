import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
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
    {
      name: 'ranking',
      type: 'number',
      label: 'Ranking (lower = higher priority)',
      required: false,
    },
    ...slugField('name'),
  ],
}
