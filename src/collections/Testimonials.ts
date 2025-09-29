import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
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
      label: 'Name',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Job Title/Position',
      required: true,
    },
    {
      name: 'organization',
      type: 'text',
      label: 'Organization',
    },
    {
      name: 'testimonial',
      type: 'textarea',
      label: 'Testimonial',
    },
    ...slugField('name'),
  ],
}
