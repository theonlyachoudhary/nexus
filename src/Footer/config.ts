import type { GlobalConfig } from 'payload'

// ...existing code...
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'footerNav',
      type: 'array',
      label: 'Footer Navigation',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: false,
        },
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'teamLinks',
      type: 'array',
      label: 'Team Links',
      fields: [
        {
          name: 'member',
          type: 'relationship',
          relationTo: 'teamMembers',
          required: true,
        },
        {
          name: 'labelOverride',
          type: 'text',
          label: 'Label Override (optional)',
          admin: {
            description: 'Override the team member name with custom text',
          },
        },
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'resourceLinks',
      type: 'array',
      label: 'Resource Links',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: 'All rights reserved.',
    },
    {
      name: 'companyInfo',
      type: 'group',
      label: 'Company Information',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Company Name',
          defaultValue: 'Nexus',
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Company Tagline',
          defaultValue: 'Preparing for a Smarter Tomorrow',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
