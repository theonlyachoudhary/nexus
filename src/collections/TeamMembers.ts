import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

export const TeamMembers: CollectionConfig = {
  slug: 'teamMembers',
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
      label: 'Full Name',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Job Title',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biography',
    },
    {
      name: 'linkedIn',
      type: 'text',
      label: 'LinkedIn URL',
    },
    {
      name: 'priority',
      type: 'number',
      label:
        'Priority (lower numbers appear first on the webpage, we love all our team members equally :) )',
    },
    ...slugField('name'),
  ],
}
