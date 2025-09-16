import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional logo image',
      },
    },
    {
      name: 'siteName',
      type: 'text',
      admin: {
        description: 'Site name (used when no logo is provided)',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'ctaButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
        {
          name: 'newTab',
          type: 'checkbox',
        },
      ],
      admin: {
        description: 'Site-wide CTA button displayed in the header',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
