import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const TeamMembers: CollectionConfig = {
  slug: 'teamMembers',
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
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: false,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Profile Image',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biography',
    },
    {
      name: 'linked_in',
      type: 'text',
      label: 'LinkedIn URL',
    },
    {
      name: 'priority',
      type: 'number',
      label:
        'Priority (lower numbers appear first on the webpage, we love all our team members equally :) )',
    },
    {
      name: 'non_core',
      type: 'checkbox',
      label: 'Non-core Team Member',
      required: false,
    },
    ...slugField('name'),
  ],
}
