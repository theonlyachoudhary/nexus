import { Block } from 'payload'

const CaseStudies: Block = {
  slug: 'case-studies',
  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
      label: 'Section Heading',
    },
    {
      name: 'subheading',
      type: 'text',
      required: false,
      label: 'Section Subheading',
    },
    {
      name: 'caseStudies',
      type: 'array',
      label: 'Case Studies',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'client',
          type: 'text',
          required: true,
        },
        {
          name: 'industry',
          type: 'text',
        },
        {
          name: 'challenge',
          type: 'textarea',
        },
        {
          name: 'approach',
          type: 'array',
          label: 'Our Approach',
          minRows: 1,
          fields: [
            {
              name: 'step',
              label: 'Step',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'solution',
          type: 'textarea',
        },
        {
          name: 'results',
          type: 'array',
          label: 'Results',
          fields: [
            {
              name: 'result',
              type: 'text',
            },
          ],
        },
        {
          name: 'testimonial',
          type: 'group',
          label: 'Testimonial',
          fields: [
            {
              name: 'quote',
              type: 'textarea',
            },
            {
              name: 'author',
              type: 'text',
            },
            {
              name: 'title',
              type: 'text',
            },
          ],
        },
        {
          name: 'metrics',
          type: 'group',
          label: 'Metrics',
          fields: [
            {
              name: 'delays',
              type: 'text',
            },
            {
              name: 'costs',
              type: 'text',
            },
            {
              name: 'quality',
              type: 'text',
            },
            {
              name: 'revenue',
              type: 'text',
            },
            {
              name: 'capacity',
              type: 'text',
            },
            {
              name: 'delivery',
              type: 'text',
            },
            {
              name: 'timeSaved',
              type: 'text',
            },
            {
              name: 'efficiency',
              type: 'text',
            },
            {
              name: 'satisfaction',
              type: 'text',
            },
            {
              name: 'automation',
              type: 'text',
            },
            {
              name: 'accuracy',
              type: 'text',
            },
            {
              name: 'timeReduction',
              type: 'text',
            },
            {
              name: 'communication',
              type: 'text',
            },
            {
              name: 'visibility',
              type: 'text',
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'tags',
          type: 'array',
          fields: [
            {
              name: 'tag',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'CTA Button',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
  ],
}

export default CaseStudies
