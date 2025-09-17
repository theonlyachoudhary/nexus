import type { Block } from 'payload'

export const UnderConstruction: Block = {
  slug: 'underConstruction',
  labels: {
    singular: 'Under Construction',
    plural: 'Under Construction Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'text',
      required: false,
      label: 'Subheading',
    },
    {
      name: 'message',
      type: 'group',
      label: 'Message',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: false,
          label: 'Message Heading',
        },
        {
          name: 'text',
          type: 'textarea',
          required: false,
          label: 'Message Text',
        },
      ],
    },
    {
      name: 'checklist',
      type: 'group',
      label: 'Checklist',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: false,
          label: 'Checklist Heading',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Checklist Items',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Item Text',
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: false,
          label: 'CTA Text',
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          label: 'CTA Link',
        },
      ],
    },
  ],
}
