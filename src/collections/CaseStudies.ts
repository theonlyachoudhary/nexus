import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
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
      label: 'Organization Name (or type eg. "Non-Profit")',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Case Study Title',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Summary',
      required: false,
    },
    {
      name: 'metrics',
      type: 'array',
      label: 'Key Metrics Achieved',
      fields: [
        {
          name: 'metric',
          type: 'text',
          label: 'Metric',
        },
        {
          name: 'value',
          type: 'text',
          label: 'Value',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Case Study Content (Format with headings, lists, links, etc.)',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          LinkFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    ...slugField('name'),
  ],
}
