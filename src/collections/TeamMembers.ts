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
      name: 'email',
      type: 'email',
    },
    {
      name: 'linkedIn',
      type: 'text',
      label: 'LinkedIn URL',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    ...slugField('name'),
  ],
}
